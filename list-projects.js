#!/usr/bin/env node

const https = require('https');

const API_KEY = 'standard_38c23c338b049b60e8d9e5947fe5a8c7672e3c23b83e4b5a3f8a928ac57cab227104bc32add5663d930f24b1d01555b06243c79122aa747851a8a98efc1955f1cbe18decd69ea6d545d68db0f6ebeaaecf33c7999e7b0c0d2356fede122b789da949ade4b7bfa124acf9e18d22cef647abcb61511632124c3afc0dc93b8adab6';
const ENDPOINT = 'fra.cloud.appwrite.io';

function apiRequest(method, path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: ENDPOINT,
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Key': API_KEY
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                console.log('Status:', res.statusCode);
                console.log('Body:', body);
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
                }
            });
        });

        req.on('error', reject);
        req.end();
    });
}

console.log('🔍 Listing all projects...\n');
apiRequest('GET', '/v1/projects').then(projects => {
    console.log('\nProjects:', JSON.stringify(projects, null, 2));
}).catch(console.error);
