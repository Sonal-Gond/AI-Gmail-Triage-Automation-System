/**
 * Email Triage Script
 * Filters incoming Gmail support emails through 3 validation layers
 * (headers, sender domain, AI intent) before creating a support ticket.
 *
 * Setup: see /docs/01-appscript-trigger-setup.md
 */

function processInbox() {
  const rawLabel = GmailApp.getUserLabelByName("raw-inbox");
  const ticketLabel = GmailApp.getUserLabelByName("new-ticket");
  const doneLabel = GmailApp.getUserLabelByName("triage-done");

  if (!rawLabel || !ticketLabel || !doneLabel) {
    Logger.log("ERROR: One or more labels missing. Create raw-inbox, new-ticket, and triage-done in Gmail first.");
    return;
  }

  // Process up to 20 threads per run (stays within execution time limit)
  const threads = rawLabel.getThreads(0, 20);
  Logger.log("Processing " + threads.length + " threads from raw-inbox");

  threads.forEach(function(thread) {
    const messages = thread.getMessages();
    const message = messages[messages.length - 1];

    try {
      // --- LAYER 1: Header check ---
      if (!checkHeaders(message)) {
        Logger.log("L1 BLOCKED | " + message.getFrom());
        thread.removeLabel(rawLabel);
        thread.addLabel(doneLabel);
        return;
      }

      // --- LAYER 2: Sender domain check ---
      if (!checkSender(message)) {
        Logger.log("L2 BLOCKED | " + message.getFrom());
        thread.removeLabel(rawLabel);
        thread.addLabel(doneLabel);
        return;
      }

      // --- LAYER 3: LLM intent classification ---
      if (!checkIntent(message)) {
        Logger.log("L3 BLOCKED | " + message.getSubject());
        thread.removeLabel(rawLabel);
        thread.addLabel(doneLabel);
        return;
      }

      // All layers passed — this is a genuine customer ticket
      thread.addLabel(ticketLabel);
      thread.removeLabel(rawLabel);
      Logger.log("TICKET CREATED | " + message.getSubject());

    } catch (e) {
      // Log error but do not crash — continue processing other threads
      Logger.log("ERROR on thread: " + e.message + " | " + message.getFrom());
    }
  });
}

function checkHeaders(message) {
  if (!message) {
    Logger.log("Message object is missing");
    return false;
  }

  const listUnsub = message.getHeader("List-Unsubscribe");
  const precedence = message.getHeader("Precedence");
  const autoSubmit = message.getHeader("Auto-Submitted");
  const xMailer = message.getHeader("X-Mailer") || "";
  const xCampaign = message.getHeader("X-Campaign") || "";

  // List-Unsubscribe is present ONLY in bulk/marketing mail
  if (listUnsub) return false;

  // Precedence: bulk or list = automated mailing system
  if (precedence === "bulk" || precedence === "list") return false;

  // Auto-Submitted: auto-generated = OTP, alert, system notification
  if (autoSubmit && autoSubmit !== "no") return false;

  // Known bulk-sending platform identifiers in X-Mailer header
  const bulkPlatforms = [
    "sendgrid", "mailchimp", "klaviyo", "hubspot", "marketo",
    "mailgun", "amazonses", "postmark", "campaign monitor"
  ];
  if (bulkPlatforms.some(p => xMailer.toLowerCase().includes(p))) {
    return false;
  }

  // X-Campaign header is used by marketing platforms
  if (xCampaign) return false;

  return true; // Passed L1 — no bulk signals found
}

function checkSender(message) {
  const from = message.getFrom().toLowerCase();
  const emailMatch = from.match(/[\w.+%-]+@[\w.-]+\.[a-z]{2,}/);

  if (!emailMatch) return false;

  const email = emailMatch[0];
  const prefix = email.split("@")[0];

  // Common automated sender patterns
  const blockedPrefixes = [
    "noreply", "no-reply", "donotreply", "do-not-reply",
    "notification", "notifications", "alert", "alerts",
    "mailer", "bounce", "verification", "verify",
    "otp", "security", "system", "robot"
  ];

  if (blockedPrefixes.some(prefixWord => prefix.includes(prefixWord))) {
    return false;
  }

  return true;
}

function checkIntent(message) {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty("OPENAI_API_KEY");
  const subject = message.getSubject() || "(no subject)";
  const from = message.getFrom();

  // Only send first 1000 chars to keep API cost minimal
  const body = message.getPlainBody().substring(0,
