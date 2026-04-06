# 🚨 QUICK FIX - 2 Minutes Setup

## Problem: CORS Error (403 Forbidden)

Your website cannot connect to Appwrite because the domain isn't authorized.

## Solution: Add Your Domain (2 steps)

### Step 1: Open Appwrite Console

Click this link: **[Open Appwrite Settings](https://fra.cloud.appwrite.io/console/project-fra-69d0701b00051cd5cfa2/settings)**

### Step 2: Add Platforms

1. Scroll down until you see **"Platforms"** section
2. Click the blue **"Add Platform"** button
3. Click **"Web"** or **"Web App"**
4. Fill in:
   ```
   Name: My Shopping App
   Hostname: branch-master-2e512ff.appwrite.network
   ```
5. Click **"Create"** or **"Add"**

6. **Repeat** for development:
   - Click **"Add Platform"** again
   - Click **"Web App"**
   - Fill in:
     ```
     Name: Development
     Hostname: *
     ```
   - Click **"Create"**

### Step 3: Refresh Your Website

Go to your website and press **Ctrl+Shift+R** (hard refresh):
https://branch-master-2e512ff.appwrite.network

## ✅ Done!

The CORS error should be gone and your app should work!

---

## Still Not Working?

### Check Collection Setup:

1. Go to: [Your Collection](https://fra.cloud.appwrite.io/console/project-fra-69d0701b00051cd5cfa2/databases/69d071e20030f19397c9/collection/home_purchases_collection)

2. Click **"Attributes"** tab
   - Make sure you have a `data` attribute (type: String)
   - If not, click **"Create Attribute"**:
     - Key: `data`
     - Type: String
     - Size: 1000000
     - Click Create

3. Click **"Settings"** tab
   - Scroll to **"Permissions"**
   - Click **"Add Role"** → Select **"Any"**
   - Check: ✅ Read, ✅ Create, ✅ Update, ✅ Delete
   - Click **"Update"**

---

## What We Fixed in Code

- ✅ Removed `.setKey()` (doesn't work in browsers)
- ✅ Fixed data structure (JSON stringify/parse)
- ✅ Proper document format for Appwrite

The code is ready - you just need to configure the Appwrite console!
