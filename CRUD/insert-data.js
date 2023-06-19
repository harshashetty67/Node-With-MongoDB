const Insertdata = require('../Helper/InsertData');
const GetCircularRepoData = require('../Helper/GetData');
const assert = require('assert'); // for assert call
const data  = require('../circulation.json'); // importing the json data


async function main() 
{
    try
    {
        // calling the insert data method from other module => circularRepo.js
        //const results = await Insertdata(data);
        
        //console.log(await server.serverStatus());

        // assert the number of records inserted
        //console.log(assert.equal(5,results.insertedCount)); // count of inserted records

        // list of databases
        //const server = client.db(dbName).admin();
        //console.log(await server.listDatabases());

        // Inserting a single document
        let newRecord = 
        {
        "Newspaper": "Tulu Nadu",
        "Daily Circulation, 2004": 5,
        "Daily Circulation, 2013": 50,
        "Change in Daily Circulation, 2004-2013": 180,
        "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
        "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
        "Pulitzer Prize Winners and Finalists, 1990-2014": 0
        };

        const recordAdded = await Insertdata.Add(newRecord);
        assert(recordAdded.acknowledged); // this assures the record is added.
        
        const fetchItem = await GetCircularRepoData.getDataById(recordAdded.insertedId); // fetch the inserted record by _id
        console.log(fetchItem);
        assert.deepEqual(fetchItem,newRecord); // compare the data


        // await client.db(dbName).dropDatabase(); // clearing DB after testing to elimnate duplicate rows.

    }
    catch(err)
    {
        throw(err);
    }
    
}

main().catch(console.dir);
