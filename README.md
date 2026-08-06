# AI-Powered Customer Support Triage System (Zapier)

## Overview

This is an AI-powered customer support email triage system built to automate the full lifecycle of handling support tickets — from the moment an email lands in the inbox to the moment a resolved reply reaches the customer.

The system works in four stages:

1. **Detection & Validation** – Incoming Gmail emails are screened by a Google Apps Script to confirm they're genuine support issues before they enter the pipeline.
2. **AI Classification & Routing** – Valid tickets are analyzed by AI to determine category, sentiment, and urgency, then routed to the right team via Slack, logged in Google Sheets, and acknowledged with a confirmation email to the customer.
3. **AI-Assisted Resolution** – A sub-workflow searches a Pinecone knowledge base for relevant past solutions. If one is found, AI drafts a reply for human review (approve, edit, or decline) before it's sent. If no solution exists and the ticket is high-urgency with negative sentiment, it's automatically escalated to a priority team.
4. **Human-Reviewed Delivery** – Whether a support agent edits the AI draft or writes a fresh response, the final reply is sent back to the customer, closing the loop.

In short: it's a semi-autonomous support desk — AI handles the classification and first-draft response, humans stay in control of quality and edge cases, and every ticket is tracked and routed without manual sorting.

---

## Prerequisites

Before setting up any workflow, make sure you have the required accounts and Slack channels ready.

📄 **Full prerequisites list:** [docs/prerequisites.md](./docs/prerequisites.md)

---

## Workflows

### Template 1: AppScript Trigger

Filters incoming Gmail emails through 3 validation layers (headers, sender domain, AI intent classification) before creating a support ticket.

- 📄 **Full setup guide:** [docs/01-appscript-trigger-setup.md](./docs/01-appscript-trigger-setup.md)
- 📜 **Script:** [scripts/email-triage.gs](./scripts/email-triage.gs)
- 🔗 **Template:** [Zapier Template Link](https://zapier.com/templates/details/appscripttrigger-4826bb?secret=MTp0ZW1wbGF0ZToxbWZVOXFpZ1QzMTA5WHZmSVluRXZzTjExQU9YVm9DMWZENGJEUFJXcnhzOjFxc3YxNA)

![AppScript Trigger Setup](./screenshots/workflow1_appscript_trigger.png)

---

### Template 2: AI-Triage with Gmail through AppScript

Classifies new tickets by category, sentiment, and urgency using AI; routes to the right Slack team, logs to Google Sheets, and sends a confirmation email to the customer.

- 📄 **Full setup guide:** [docs/02-ai-triage-setup.md](./docs/02-ai-triage-setup.md)
- 🔗 **Template:** [Zapier Template Link](https://zapier.com/templates/details/ai-triage-with-gmail-through-appscript-9307b2)

![AI-Triage Setup](./screenshots/workflow2-node-config.png)

---

### Template 3: Sub-Zap by Email on Slack Approval

Searches Pinecone for relevant past solutions and drafts an AI response for human review on Slack (approve, edit, or decline). Auto-escalates unresolved high-urgency, negative-sentiment tickets.

- 📄 **Full setup guide:** [docs/03-subzap-approval-setup.md](./docs/03-subzap-approval-setup.md)
- 🔗 **Template:** [Zapier Template Link](https://zapier.com/templates/details/sub-zap-by-email-on-slack-approval-292dd0)

![Sub-Zap Approval Setup](./screenshots/workflow3-pinecone-index.png)

---

### Template 4: Edited and Collected Data Sent to Gmail

Sends the final reply to the customer — whether it's an edited AI draft or a manually submitted solution from the support team.

- 📄 **Full setup guide:** [docs/04-collected-reply-setup.md](./docs/04-collected-reply-setup.md)
- 🔗 **Template:** [Zapier Template Link](https://zapier.com/templates/details/edited-and-collected-data-sent-to-gmail-95b2d8)

![Collected Reply Setup](./screenshots/workflow4-webhook.png)

---

## Setup Order

> ⚠️ These workflows depend on each other — configure them in this sequence:
> **Template 1 → Template 4 (get webhook URL) → Template 3 (paste webhook, configure Pinecone) → Template 2 (select Sub-Zap)**

See each linked setup guide in `/docs` for full step-by-step instructions.
