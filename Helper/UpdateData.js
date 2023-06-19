const { MongoClient} = require('mongodb');

function UpdateRepository()
{
    const uri = "*****"; // MongoDB connection string.
    const dbName = 'circulation';
    const client = new MongoClient(uri); // create a client to the mongodb server

    function Update(filter,content)
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);

                //const result = await db.collection('NewsPapers').replaceOne(filter,content); // updating single recordusing replaceOne() method by passing filter.   
                
                // updating record using updateOne() requires filter,content and upsert flag in the format => (filter, {$set:content},{upsert:true}).
                const result = await db.collection('NewsPapers').updateOne(filter,{$set:content}, {upsert: true});   
                
                console.log(result);
                resolve(result); // resolve the result returned by replaceOne()                  
            }
            catch(err)
            {
                reject(err); // reject incase of error.
            }
            finally
            {
                await client.close();  // close the connection wherever you open it.
            }
        });
    }

    return {Update};
}

module.exports = UpdateRepository(); // exporting the returned object (containing the reference of methods) from CircleRepo() call.