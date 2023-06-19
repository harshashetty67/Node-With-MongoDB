
const MongoClient = require('mongodb').MongoClient;
const Insertdata = require('../Helper/InsertData');
const assert = require('assert'); // for assert call
const data  = require('../circulation.json'); // importing the json data

const uri = "*****"; // MongoDB connection string.
const dbName = 'circulation';

// Create a client object from the MongoClient class by passing our connection string as parameter.

async function main() 
{
    const client = new MongoClient(uri);

    try
    {
        // Connect the client to the server.
        await client.connect(); // using promise call instead of callback func().

        // calling the insert data method from other module => circularRepo.js
        const results = await Insertdata(data);
        
        //console.log(await server.serverStatus());

        // assert the number of records inserted
        console.log(assert.equal(5,results.insertedCount)); // count of inserted records

        // list of databases
        //const server = client.db(dbName).admin();
        //console.log(await server.listDatabases());

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
