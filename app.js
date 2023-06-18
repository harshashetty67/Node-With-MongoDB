
const MongoClient = require('mongodb').MongoClient;
const circularRepo = require('./CircularRepo/circularRepo');
const assert = require('assert'); // for assert call
const data  = require('./circulation.json'); // importing the json data

const uri = "mongodb+srv://harshashetty67:dHs8ttYwb2hvf7Fr@my-mongo.elbhwd6.mongodb.net/"; // MongoDB connection string.
const dbName = 'circulation';

// Create a clinet object from the MongoClient class by passing our connection string as parameter.

async function main() 
{
    const client = new MongoClient(uri);

    try
    {
        // Connect the client to the server.
        await client.connect(); // using promise call instead of callback func().

        // calling the insert data method from other module => circularRepo.js
        const results = await circularRepo(data);
        
        //console.log(await server.serverStatus());

        // assert the number of records inserted
        console.log(assert.equal(2,results.insertedCount)); // count of inserted records

        // list of databases
        const server = client.db(dbName).admin();
        console.log(await server.listDatabases());

        // Ensures that the client will close when you finish/error
        // await client.db(dbName).dropDatabase(); // clearing DB after testing to elimnate duplicate rows.

    }
    catch(err)
    {
        throw(err);
    }
    finally
    {
        await client.close();
    }

    
}

main().catch(console.dir);
