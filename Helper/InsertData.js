const { MongoClient} = require('mongodb');

function Circlerepo()
{
    const uri = "*****"; // MongoDB connection string.
    const dbName = 'Dominos';
    const client = new MongoClient(uri); // create a client to the mongodb server

    function LoadData(data)
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);

                result = await db.collection('PizzaMenu').insertMany(data); // inserting multplie records at once using insertMany() method by passing json object.      
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

    // Adding data to MongoDB collection
    function Add(record)
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);

                const result = await db.collection('NewsPapers').insertOne(record); // inserting a single records using insertOne()      
                console.log(result);
                resolve(result); // resolve the result                
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

    return {LoadData,Add};
}

module.exports = Circlerepo(); // exporting the returned object (containing the reference of methods) from CircleRepo() call.