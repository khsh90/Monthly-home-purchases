# Appwrite Setup Instructions

## CORS Configuration (CRITICAL - THIS FIXES THE ERROR!)

1. Go to your Appwrite Console: https://fra.cloud.appwrite.io/console
2. Select your project: `fra-69d0701b00051cd5cfa2`
3. Click on **Settings** in the left sidebar
4. Scroll down to **Platforms**
5. Click **Add Platform** → **Web App**
6. Add these domains (one at a time):
   - `https://branch-master-2e512ff.appwrite.network`
   - `http://localhost`
   - `http://127.0.0.1`
   - `*` (for development - allows all domains)
7. Click **Create** for each

## Collection Setup

1. Go to **Databases** in the left sidebar
2. Click on your database: `69d071e20030f19397c9`
3. Click on collection: `home_purchases_collection`
4. Go to **Attributes** tab
5. Ensure you have an attribute called `data` with type **String** (length: 65535 or maximum)
6. Go to **Settings** tab
7. Under **Permissions**, add:
   - **Role: Any** → Read, Update, Create, Delete

## Test the Connection

After completing the above steps, refresh your website at:
https://branch-master-2e512ff.appwrite.network

The CORS error should be resolved and data should save properly!

## Current Configuration

- **Endpoint**: https://fra.cloud.appwrite.io/v1
- **Project ID**: fra-69d0701b00051cd5cfa2
- **Database ID**: 69d071e20030f19397c9
- **Collection ID**: home_purchases_collection
- **Document ID**: main_state

## API Key
Your API key has been added to the code for authentication.
