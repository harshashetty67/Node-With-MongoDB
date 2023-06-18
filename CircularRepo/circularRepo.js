const { MongoClient} = require('mongodb');

function Circlerepo(data)
{
    const uri = "mongodb+srv://harshashetty67:dHs8ttYwb2hvf7Fr@my-mongo.elbhwd6.mongodb.net/?retryWrites=true&w=majority"; // MongoDB connection string.
    const dbName = 'circulation';
        return new Promise(async (resolve,reject)=>
        {
            try
            {
                const client = new MongoClient(uri); // create a client to the mongodb server
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);

                result = await db.collection('NewsPapers').insertMany(data); // inserting multplie records at once using insertMany() method by passing json object.      
                resolve(result); // resolve the result returned by insertMany()
                
                await client.close(); // close the connection wherever you open it.
            }
            catch(err)
            {
                reject(err); // reject incase of error.
            }
        });
}

module.exports = Circlerepo; // exporting the method;