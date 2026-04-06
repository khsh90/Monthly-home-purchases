const { Client, Databases } = require('node-appwrite');

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69d0701b00051cd5cfa2')
  .setKey('standard_38c23c338b049b60e8d9e5947fe5a8c7672e3c23b83e4b5a3f8a928ac57cab227104bc32add5663d930f24b1d01555b06243c79122aa747851a8a98efc1955f1cbe18decd69ea6d545d68db0f6ebeaaecf33c7999e7b0c0d2356fede122b789da949ade4b7bfa124acf9e18d22cef647abcb61511632124c3afc0dc93b8adab6');

const databases = new Databases(client);

async function setupDatabase() {
  try {
    console.log('Checking for database...');
    
    // List all databases
    const dbList = await databases.list();
    console.log('Existing databases:', dbList.databases.map(d => ({ id: d.$id, name: d.name })));
    
    // Check for our database
    const DB_ID = '69d071e20030f19397c9';
    let database;
    
    try {
      database = await databases.get(DB_ID);
      console.log('✓ Database found:', database.$id);
    } catch (e) {
      console.log('✗ Database not found. Creating...');
      database = await databases.create(DB_ID, 'Home Purchases DB');
      console.log('✓ Database created:', database.$id);
    }
    
    // Check for collection
    try {
      const collection = await databases.getCollection(DB_ID, 'home_purchases_collection');
      console.log('✓ Collection found:', collection.$id);
    } catch (e) {
      console.log('✗ Collection not found. Creating...');
      const collection = await databases.createCollection(
        DB_ID,
        'home_purchases_collection',
        'Home Purchases Collection',
        true // document level security
      );
      console.log('✓ Collection created:', collection.$id);
    }
    
    // Check for document
    try {
      const doc = await databases.getDocument(DB_ID, 'home_purchases_collection', 'main_state');
      console.log('✓ Document found:', doc.$id);
    } catch (e) {
      console.log('✗ Document not found. Creating...');
      const doc = await databases.createDocument(
        DB_ID,
        'home_purchases_collection',
        'main_state',
        { data: JSON.stringify([]) }
      );
      console.log('✓ Document created:', doc.$id);
    }
    
    console.log('\n✓ Database setup complete!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

setupDatabase();
