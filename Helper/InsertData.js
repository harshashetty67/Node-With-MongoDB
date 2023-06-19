const { MongoClient} = require('mongodb');

function Circlerepo(data)
{
    const uri = "*****"; // MongoDB connection string.
    const dbName = 'circulation';
    const client = new MongoClient(uri); // create a client to the mongodb server
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);

                result = await db.collection('NewsPapers').insertMany(data); // inserting multplie records at once using insertMany() method by passing json object.      
                resolve(result); // resolve the result returned by insertMany()                  
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

module.exports = Circlerepo; // exporting the method;