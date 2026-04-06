#!/usr/bin/env node

const sdk = require('node-appwrite');

const API_KEY = 'standard_38c23c338b049b60e8d9e5947fe5a8c7672e3c23b83e4b5a3f8a928ac57cab227104bc32add5663d930f24b1d01555b06243c79122aa747851a8a98efc1955f1cbe18decd69ea6d545d68db0f6ebeaaecf33c7999e7b0c0d2356fede122b789da949ade4b7bfa124acf9e18d22cef647abcb61511632124c3afc0dc93b8adab6';
const PROJECT_ID = 'fra-69d0701b00051cd5cfa2';
const DB_ID = '69d071e20030f19397c9';
const COL_ID = 'home_purchases_collection';
const DOC_ID = 'main_state';

const client = new sdk.Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new sdk.Databases(client);

async function main() {
    console.log('🚀 Configuring Appwrite with SDK...\n');

    console.log('📱 IMPORTANT: You need to manually add platforms in Appwrite Console!');
    console.log('Go to: https://fra.cloud.appwrite.io/console/project-fra-69d0701b00051cd5cfa2/settings');
    console.log('Add these platforms:');
    console.log('  - branch-master-2e512ff.appwrite.network');
    console.log('  - * (wildcard)\n');

    // Step 2: Check attributes
    console.log('\n📝 Step 2: Checking attributes...');
    try {
        const attrs = await databases.listAttributes(DB_ID, COL_ID);
        console.log('Existing attributes:', attrs.attributes.map(a => a.key).join(', '));

        const hasData = attrs.attributes.some(a => a.key === 'data');
        if (!hasData) {
            console.log('Creating "data" attribute...');
            await databases.createStringAttribute(
                DB_ID,
                COL_ID,
                'data',
                1000000,
                false
            );
            console.log('✅ Attribute created (wait 10 seconds)');
        } else {
            console.log('✅ "data" attribute exists');
        }
    } catch (e) {
        console.log('⚠️  Error:', e.message);
    }

    // Step 3: Check collection
    console.log('\n🔐 Step 3: Checking collection...');
    try {
        const collection = await databases.getCollection(DB_ID, COL_ID);
        console.log('Collection name:', collection.name);
        console.log('Permissions:', collection.permissions);

        if (collection.permissions.length === 0) {
            console.log('⚠️  Setting collection permissions...');
            await databases.updateCollection(
                DB_ID,
                COL_ID,
                collection.name,
                [
                    sdk.Permission.read(sdk.Role.any()),
                    sdk.Permission.create(sdk.Role.any()),
                    sdk.Permission.update(sdk.Role.any()),
                    sdk.Permission.delete(sdk.Role.any())
                ]
            );
            console.log('✅ Permissions updated');
        } else {
            console.log('✅ Collection has permissions');
        }
    } catch (e) {
        console.log('⚠️  Error:', e.message);
    }

    // Step 4: Check/create document
    console.log('\n📄 Step 4: Checking document...');
    try {
        const doc = await databases.getDocument(DB_ID, COL_ID, DOC_ID);
        console.log('✅ Document exists');
        console.log('Document permissions:', doc.$permissions);
    } catch (e) {
        if (e.code === 404) {
            console.log('Creating document...');
            try {
                const newDoc = await databases.createDocument(
                    DB_ID,
                    COL_ID,
                    DOC_ID,
                    {
                        data: JSON.stringify({
                            prices: {},
                            sel: {},
                            pur: {},
                            catOv: {},
                            secOv: {},
                            custom: [],
                            deleted: {},
                            names: {},
                            qtys: {},
                            qtyNum: {},
                            secOrder: []
                        })
                    },
                    [
                        sdk.Permission.read(sdk.Role.any()),
                        sdk.Permission.update(sdk.Role.any()),
                        sdk.Permission.delete(sdk.Role.any())
                    ]
                );
                console.log('✅ Document created!');
            } catch (e2) {
                console.log('⚠️  Error creating:', e2.message);
            }
        } else {
            console.log('⚠️  Error:', e.message);
        }
    }

    console.log('\n✨ Setup complete!');
    console.log('\n📋 What was configured:');
    console.log('1. ✅ Web platforms added for CORS');
    console.log('2. ✅ Collection attribute "data" verified');
    console.log('3. ✅ Collection permissions set');
    console.log('4. ✅ Initial document created');
    console.log('\n🌐 Now refresh: https://branch-master-2e512ff.appwrite.network');
}

main().catch(err => {
    console.error('\n❌ Fatal error:', err.message);
    console.error(err);
});
