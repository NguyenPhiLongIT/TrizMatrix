const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://phuongp2003:2003925@cluster0.nnzxn5t.mongodb.net"
const client = new MongoClient(url);

// Reference the database to use
const dbName = "triz_matrix";

async function run(tableName, queryCommand) {
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName);
        // Reference the "people" collection in the specified database
        const col = db.collection(tableName);
        // Find and return the document
        const filter = queryCommand;
        const document = await col.find(filter).toArray();
        // console.log("Document found:\n" + JSON.stringify(document));
        return document; // Return the document
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

async function runOne(tableName, queryCommand) {
    try {
        // Connect to the Atlas cluster
        await client.connect();
        const db = client.db(dbName);
        // Reference the "people" collection in the specified database
        const col = db.collection(tableName);
        // Find and return the document
        const filter = queryCommand;
        const document = await col.findOne(filter);
        // console.log("Document found:\n" + JSON.stringify(document));
        return document; // Return the document
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

module.exports = { run, runOne };
