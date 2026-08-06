# Template 3: Sub-Zap by Email on Slack Approval — Setup Guide

🔗 **Template link:** https://zapier.com/templates/details/sub-zap-by-email-on-slack-approval-292dd0?secret=MTp0ZW1wbGF0ZToxNnk3TkNfS25IOTR2OHJHUnI4aVpVaFRVMnEwYy1yR3JQRTRoaFFBUVBZOmtjMGIydw

> ⚠️ Configure **Template 4** first to get the webhook URL needed in this workflow.

## App Configuration

### ChatGPT (OpenAI)
Open the ChatGPT node → **Setup** tab → **Account** → select your OpenAI account.

### Slack
Open the Slack node → **Setup** tab → **Account** → select your Slack account.

### Gmail
Open the Gmail node → **Setup** tab → **Account** → select your Gmail account.

### Pinecone

**Step 1 — Create the index**
1. Go to Pinecone → create an account → log in
2. **Index → Create Index**
   - Index name: e.g. `zapier-ai-triage`
   - Configuration: select `llama-text-embed-v2`
   - Keep all other settings default
   - Create Index
3. Go to **API Keys** (left sidebar) → create one API key → copy and save it

**Step 2 — Connect Pinecone in Zapier**
1. Open the Pinecone node in Zapier → **Setup → Account → Create Account**
2. Enter your Pinecone API key
3. Go to **Configure** → select your index name under **Index Name**

**Step 3 — Add sample data**
Store some dummy question-and-answer pairs in Pinecone across your category namespaces (technical, billing, feature request, general) so the workflow has sample data to retrieve and test against.

### Slack API Request node
1. Go to the **Configure** tab → **Body** section
2. Replace the webhook URL with your webhook URL generated in **Template 4**
   (create Template 4 first, then come back and paste it here)

## Publish
Once all nodes are connected and configured, click **Publish**.

## Screenshots

![Sub-Zap by Email on Slack Approval workflow Image](../screenshots/workflow3_sub_zap_slack_approval.png)

---
[← Back to README](../README.md)
