# 🔧 Appwrite Setup Guide - Fix CORS & Connection Issues

## The Problem
Your app shows these errors:
```
Access to fetch has been blocked by CORS policy
GET https://fra.cloud.appwrite.io/.../documents/main_state net::ERR_FAILED 403 (Forbidden)
```

## The Solution (4 Easy Steps)

### Step 1: Add Web Platform (CORS Fix) ⭐ MOST IMPORTANT

1. **Open Appwrite Console:**
   - Go to: https://fra.cloud.appwrite.io/console
   - Login with your credentials

2. **Navigate to your project:**
   - You should see your project in the list
   - Click on it to open

3. **Go to Settings:**
   - Click "Settings" in the left sidebar (⚙️ gear icon)

4. **Add Platforms:**
   - Scroll down to the "**Platforms**" section
   - Click "**Add Platform**" button
   - Select "**Web App**"
   - Fill in:
     - **Name:** `Shopping List`
     - **Hostname:** `branch-master-2e512ff.appwrite.network`
   - Click "**Create**" or "**Add Platform**"

5. **Add Wildcard (for development):**
   - Click "**Add Platform**" again
   - Select "**Web App**"
   - Fill in:
     - **Name:** `Development`
     - **Hostname:** `*`
   - Click "**Create**"

### Step 2: Configure Collection

1. **Go to Databases:**
   - Click "Databases" in the left sidebar

2. **Open your database:**
   - Database ID: `69d071e20030f19397c9`
   - Click on it

3. **Open your collection:**
   - Collection ID: `home_purchases_collection`
   - Click on it

4. **Check Attributes:**
   - Click the "**Attributes**" tab
   - Make sure you have an attribute called `data`
   - If not, click "**Create Attribute**":
     - **Key:** `data`
     - **Type:** String
     - **Size:** `1000000` (1 MB)
     - **Required:** Uncheck
     - Click "**Create**"
   - Wait 5-10 seconds for the attribute to be "Available"

### Step 3: Set Permissions

1. **Still in your collection, go to "Settings" tab**

2. **Scroll to "Permissions" section**

3. **Add these permissions:**
   - Click "**Add Role**"
   - Select "**Any**"
   - Check these boxes:
     - ✅ **Read**
     - ✅ **Create**
     - ✅ **Update**
     - ✅ **Delete**
   - Click "**Update**" or "**Save**"

### Step 4: Test Your App

1. **Refresh your website:**
   - Go to: https://branch-master-2e512ff.appwrite.network
   - Press `Ctrl+Shift+R` (hard refresh)

2. **Check browser console:**
   - Press `F12` to open developer tools
   - Go to "Console" tab
   - You should see: "✅ متصل بـ Appwrite"

3. **Test functionality:**
   - Click "اختر" on any item
   - Click "حفظ" button
   - Reload the page - your selections should persist!

## Verification Checklist

✅ **Platforms added** (branch-master-2e512ff.appwrite.network and *)
✅ **Attribute "data" created** and status is "Available"
✅ **Permissions set to "Any"** with Read/Create/Update/Delete
✅ **Website loads** without CORS errors
✅ **Data saves and loads** correctly

## Still Having Issues?

### Check Console Errors:
1. Open your website
2. Press `F12`
3. Go to Console tab
4. Look for red errors
5. Take a screenshot and share it

### Verify Project Settings:
- **Endpoint:** https://fra.cloud.appwrite.io/v1
- **Project ID:** fra-69d0701b00051cd5cfa2
- **Database ID:** 69d071e20030f19397c9
- **Collection ID:** home_purchases_collection
- **Document ID:** main_state

## What We Fixed in the Code

1. ✅ **Removed `.setKey()`** - This only works on server-side, not in browsers
2. ✅ **Fixed data structure** - Now properly stores data as JSON in `data` field
3. ✅ **Uses anonymous access** - Works with proper collection permissions

## Screenshots Needed (if still not working):

1. Appwrite Console → Project → Settings → Platforms section
2. Appwrite Console → Database → Collection → Attributes tab
3. Appwrite Console → Database → Collection → Settings → Permissions
4. Browser Console (F12) showing any errors

---

**The main fix is Step 1 (Adding Platforms).** This solves the CORS error!
