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
