# AI-Gmail-Triage-Automation-System

## Overview of Project 

This is an AI-powered customer support email triage system built to automate the full lifecycle of handling support tickets — from the moment an email lands in the inbox to the moment a resolved reply reaches the customer.

The system works in four stages:

**1. Detection & Validation –**  
Incoming Gmail emails are screened by a Google Apps Script to confirm they're genuine support issues before they enter the pipeline.

**2. AI Classification & Routing –**   
Valid tickets are analyzed by AI to determine category, sentiment, and urgency, then routed to the right team via Slack, logged in Google Sheets, and acknowledged with a confirmation email to the customer.

**3. AI-Assisted Resolution –**   
A sub-workflow searches a Pinecone knowledge base for relevant past solutions. If one is found, AI drafts a reply for human review (approve, edit, or decline) before it's sent. If no solution exists and the ticket is high-urgency with negative sentiment, it's automatically escalated to a priority team.  

**4. Human-Reviewed Delivery –**  
Whether a support agent edits the AI draft or writes a fresh response, the final reply is sent back to the customer, closing the loop.


## Setup Guide

### Prerequisites (create/connect these accounts first)
- Zapier
- Gmail
- OpenAI (ChatGPT API key)
- Google Apps Script
- Google Sheets
- Pinecone
- Slack — create one workspace with these public channels:
  - `engineering-department`
  - `billing-department`
  - `feature-request-department`
  - `general-department`
  - `solution-priority`

### General steps for every template
1. Open the template link
2. Click **"Try it"**
3. Sign in to Zapier if prompted
4. Zapier copies the template into your workspace

---

### Template 1: AppScript Trigger
1. **Gmail:** Connect account → sign in → allow access → select connected account → Test
2. **Webhook:** Open the Webhooks by Zapier node → replace URL with your Apps Script Web App URL
3. Publish

---

### Template 2: AI-Triage with Gmail through AppScript
1. **Gmail:** Select your connected account in each Gmail node
2. **OpenAI:** Connect account → enter API key → set Origin to `Global`
3. **Slack:** Connect account → authorize workspace → use the same account across all Slack nodes
4. **Google Sheets:** Connect account → allow access → select it in every Sheets node
5. **Sub-Zap node:** Select your account → select the Sub-Zap (configure Template 3 first so it's available to select)
6. Publish

---

### Template 3: Sub-Zap by Email on Slack Approval
1. **OpenAI, Slack, Gmail nodes:** Connect the respective accounts in each node's Setup tab
2. **Pinecone:**
   - Create a Pinecone account → create an index (e.g. `zapier-ai-triage`) using `llama-text-embed-v2` → keep other settings default
   - Generate an API key from the Pinecone sidebar and save it
   - In the Zapier Pinecone node → Account → enter your Pinecone API key
   - Select your index name in the Configure tab
   - Store some dummy question-and-answer data in Pinecone (across your category namespaces — technical, billing, feature request, general) so the workflow has sample data to retrieve during testing
3. **Slack API Request node:** Replace the webhook URL in the Body section with the webhook URL from Template 4 (create that first)
4. Publish

---

### Template 4: Edited and Collected Data Sent to Gmail
1. **Webhook:** Configure the webhook → copy its URL → paste it into Template 3's Slack API Request node (Body section)
2. **Gmail:** Connect your account in the Gmail node's Setup tab
3. Publish
