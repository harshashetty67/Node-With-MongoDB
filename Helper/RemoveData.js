const { MongoClient} = require('mongodb');

function RemoveItemFromRepo()
{
    const uri = "mongodb+srv://harshashetty67:dHs8ttYwb2hvf7Fr@my-mongo.elbhwd6.mongodb.net/"; // MongoDB connection string.
    const dbName = 'circulation';
    const client = new MongoClient(uri); // create a client to the mongodb server

    function Remove(filter)
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);  
                
                // removing the record from DB
                const result = await db.collection('NewsPapers').deleteOne(filter);             
                console.log(result);
                resolve(result);                
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

    return {Remove};
}

module.exports = RemoveItemFromRepo(); // exporting the returned object (containing the reference of methods).