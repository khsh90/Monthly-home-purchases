#!/usr/bin/env node

/**
 * Appwrite Configuration Script
 * This script uses the Appwrite API to configure the project properly
 */

const https = require('https');

const API_KEY = 'standard_38c23c338b049b60e8d9e5947fe5a8c7672e3c23b83e4b5a3f8a928ac57cab227104bc32add5663d930f24b1d01555b06243c79122aa747851a8a98efc1955f1cbe18decd69ea6d545d68db0f6ebeaaecf33c7999e7b0c0d2356fede122b789da949ade4b7bfa124acf9e18d22cef647abcb61511632124c3afc0dc93b8adab6';
const PROJECT_ID = 'fra-69d0701b00051cd5cfa2';
const DB_ID = '69d071e20030f19397c9';
const COL_ID = 'home_purchases_collection';
const DOC_ID = 'main_state';
const ENDPOINT = 'fra.cloud.appwrite.io';

function apiRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: ENDPOINT,
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': PROJECT_ID,
                'X-Appwrite-Key': API_KEY
            }
        };

        if (data) {
            const body = JSON.stringify(data);
            options.headers['Content-Length'] = Buffer.byteLength(body);
        }

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(body));
                    } catch (e) {
                        resolve(body);
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${body}`));
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function main() {
    console.log('🚀 Configuring Appwrite...\n');

    // Step 1: Add platform for CORS
    console.log('📱 Step 1: Adding Web Platform for CORS...');
    try {
        const platform = await apiRequest('POST', `/v1/projects/${PROJECT_ID}/platforms`, {
            type: 'web',
            name: 'Shopping List App',
            hostname: 'branch-master-2e512ff.appwrite.network'
        });
        console.log('✅ Platform added:', platform.hostname);
    } catch (e) {
        if (e.message.includes('already exists')) {
            console.log('✅ Platform already exists');
        } else {
            console.log('⚠️  Error:', e.message);
        }
    }

    // Add wildcard for development
    try {
        const platform2 = await apiRequest('POST', `/v1/projects/${PROJECT_ID}/platforms`, {
            type: 'web',
            name: 'Development (Any)',
            hostname: '*'
        });
        console.log('✅ Wildcard platform added');
    } catch (e) {
        if (e.message.includes('already exists')) {
            console.log('✅ Wildcard platform already exists');
        } else {
            console.log('⚠️  Error:', e.message);
        }
    }

    // Step 2: Check/Create collection attribute
    console.log('\n📝 Step 2: Checking collection attributes...');
    try {
        const attrs = await apiRequest('GET', `/v1/databases/${DB_ID}/collections/${COL_ID}/attributes`);
        const hasData = attrs.attributes.some(a => a.key === 'data');

        if (!hasData) {
            console.log('Creating "data" attribute...');
            await apiRequest('POST', `/v1/databases/${DB_ID}/collections/${COL_ID}/attributes/string`, {
                key: 'data',
                size: 1000000,
                required: false
            });
            console.log('✅ Attribute "data" created (wait 10 seconds for it to be ready)');
        } else {
            console.log('✅ Attribute "data" already exists');
        }
    } catch (e) {
        console.log('⚠️  Error checking attributes:', e.message);
    }

    // Step 3: List and check collection permissions
    console.log('\n🔐 Step 3: Checking collection permissions...');
    try {
        const collection = await apiRequest('GET', `/v1/databases/${DB_ID}/collections/${COL_ID}`);
        console.log('Current permissions:', collection.permissions);

        if (collection.permissions.length === 0) {
            console.log('⚠️  No permissions set! Updating collection...');
            await apiRequest('PUT', `/v1/databases/${DB_ID}/collections/${COL_ID}`, {
                permissions: [
                    'read("any")',
                    'create("any")',
                    'update("any")',
                    'delete("any")'
                ]
            });
            console.log('✅ Collection permissions updated');
        } else {
            console.log('✅ Collection has permissions');
        }
    } catch (e) {
        console.log('⚠️  Error:', e.message);
    }

    // Step 4: Try to create/update the document with proper permissions
    console.log('\n📄 Step 4: Setting up initial document...');
    try {
        const doc = await apiRequest('GET', `/v1/databases/${DB_ID}/collections/${COL_ID}/documents/${DOC_ID}`);
        console.log('✅ Document exists');
    } catch (e) {
        if (e.message.includes('404')) {
            console.log('Creating document...');
            try {
                await apiRequest('POST', `/v1/databases/${DB_ID}/collections/${COL_ID}/documents`, {
                    documentId: DOC_ID,
                    data: {
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
                    permissions: [
                        'read("any")',
                        'update("any")',
                        'delete("any")'
                    ]
                });
                console.log('✅ Document created with proper permissions');
            } catch (e2) {
                console.log('⚠️  Error creating document:', e2.message);
            }
        } else {
            console.log('⚠️  Error:', e.message);
        }
    }

    console.log('\n✨ Configuration complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Refresh your website: https://branch-master-2e512ff.appwrite.network');
    console.log('2. Open browser console (F12) to check for errors');
    console.log('3. Try adding items to your shopping list');
}

main().catch(console.error);
