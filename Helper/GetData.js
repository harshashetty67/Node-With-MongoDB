const { MongoClient, ObjectID} = require('mongodb'); // the ObjectId helps in converting the _id object to string.

function GetCircleData()
{
    const uri = "mongodb+srv://harshashetty67:dHs8ttYwb2hvf7Fr@my-mongo.elbhwd6.mongodb.net/"; // MongoDB connection string.
    const dbName = 'circulation';
    const client = new MongoClient(uri); // create a client to the mongodb server

    function getData(query,limit)
    {    
        return new Promise(async (resolve,reject)=>
        {
            try
            {
                
                await client.connect(); // connect to ther server
                // connect to the db
                const db = client.db(dbName);

                let result = db.collection('NewsPapers').find(query); // inserting multplie records at once using insertMany() method by passing json object.      
                
                if(limit>0)
                {
                    result = result.limit(limit); // limit the number of records.
                    //result = result.skip(2).limit(limit); // skip() will exclude the specified number of records from result.
                }
                resolve(await result.toArray()); // resolve the result returned by insertMany()        
            }
            catch(err)
            {
                reject(err); // reject incase of error.
            }
            finally
            {
                await client.close(); // close the connection wherever you open it.
            }
        });
    }

    function getDataById(id)
    {    
        return new Promise(async (resolve,reject)=>
        {
            try
            {
                
                await client.connect(); // connect to ther server
                // connect to the db
                const db = client.db(dbName);

                const result = await db.collection('NewsPapers').findOne({_id: id}); // findOne() returns only one record mathcing the filter expression.
                
                resolve(result); // resolve the result      
            }
            catch(err)
            {
                reject(err); // reject incase of error.
            }
            finally
            {
                await client.close(); // close the connection wherever you open it.
            }
        });
    }
    return {getData, getDataById};  // returns the object containing referneces of both the methods.
}

module.exports = GetCircleData(); // exporting the object returned from method call instead of reference.