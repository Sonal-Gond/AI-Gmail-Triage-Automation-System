# Template 1: AppScript Trigger — Setup Guide

🔗 **Template link:** https://zapier.com/templates/details/appscripttrigger-4826bb?secret=MTp0ZW1wbGF0ZToxbWZVOXFpZ1QzMTA5WHZmSVluRXZzTjExQU9YVm9DMWZENGJEUFJXcnhzOjFxc3YxNA

## Step 1: Create Gmail Labels

1. Open Gmail → click the gear icon → **See all settings**
2. Go to the **Labels** tab → scroll to bottom → **Create new label**
3. Create the following labels:
   - `raw-inbox`
   - `new-ticket`
   - `triage-done`

## Step 2: Create Gmail Filter (route support emails to raw-inbox)

Go to **Settings → Filters and Blocked Addresses → Create new filter**

| Filter field | Value |
|---|---|
| To | `support@yourcompany.com` (your support inbox address) |
| Has the words | *(leave blank)* |
| Doesn't have | *(leave blank — do not add keywords here)* |
| Action: Apply label | `raw-inbox` |
| Action: Never send to spam | ✅ Checked |
| Action: Skip inbox | Optional — leave unchecked |

## Step 3: Create the Apps Script Project

1. Go to [script.google.com](https://script.google.com) → **New project**
2. Name the project: `EmailTriage`
3. Delete the default empty function
4. Go to **Project Settings** (gear icon) → **Script Properties** → add:

| Property key | Value / description |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `YOUR_SUPPORT_EMAIL` | The support email address customers send issues to |

> ⚠️ Keep the property key names exactly as shown above.

5. Save the properties.
6. Go to **Editor** → paste in the script from [`../scripts/email-triage.gs`](../scripts/email-triage.gs).

## Step 4: Deploy the Script as a Web App

1. Save the code.
2. Click **Deploy → New deployment**
3. Select type: **Web app**
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Click **Deploy** → copy the **Web app URL**

> ⚠️ Store this URL immediately — it will not be shown again.

## Step 5: Configure the Zapier Trigger Zap

1. Open the **AppScript Trigger** Zap template (link above) → click **"Try it"**.
2. **Gmail module:**
   - Click **Connect Account** → Sign in to Gmail → select your Google account → grant access.
   - Trigger event: `New Labeled Email` → Label: `raw-inbox`.
   - Click **Test** to verify the connection.
3. **Webhooks by Zapier module:**
   - Action event: `POST`
   - URL: *your Apps Script Web App URL from Step 4*
   - Payload Type: `JSON`
   - Data: map fields per the payload screenshot below.
4. Continue → Skip Test → **Publish**.

## Step 6: Update the Downstream Zap

1. Open **AI-Triage Support Issue on Gmail** Zap.
2. Open the first Gmail trigger module.
3. Select `new-ticket` label.
4. Publish.

## Screenshots

![AppScript Trigger Workflow Image](../screenshots/workflow1_appscript_trigger.png)

---
[← Back to README](../README.md)
