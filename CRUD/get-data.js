const MongoClient = require('mongodb').MongoClient;
const GetCircularRepoData = require('../Helper/GetData');
const assert = require('assert');

async function main() 
{
    

    try
    {

        // calling the insert data method from other module => circularRepo.js
        const results = await GetCircularRepoData.getData();
        console.log(results);
        // assert the number of records inserted
        assert.equal(5,results.length); // count of inserted records

        // filtering based on query
        const filteredRes = await GetCircularRepoData.getData({Newspaper:"Karavali Ale"});
        console.log(filteredRes);
        // assert the number of records inserted
        assert.equal(filteredRes[0].Newspaper,"Karavali Ale"); // count of inserted records

        // Limiting the number of records returned.
        const limitResult = await GetCircularRepoData.getData({},3); // passing empty query will retrieve every record.
        console.log(limitResult);
        assert.equal(3,limitResult.length); // should give me 3 records only

        // Filtering the result based on id
        const resultByid = await GetCircularRepoData.getDataById(results[3]._id);
        console.log(resultByid);
        assert.equal(results[3].Newspaper,resultByid.Newspaper); // should compare the Newspaper titles.


    }
    catch(err)
    {
        throw(err);
    }
    finally
    {
        
        // clearing DB after testing to eliminate duplicate rows.
        // await client.db(dbName).dropDatabase(); 
    }

    
}

main();