// For more examples, see: https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#std-label-aggregation-pipeline-examples 

const { MongoClient} = require('mongodb');

function AggregateScenario()
{
    const uri = "********"; // MongoDB connection string.
    const dbName = 'circulation';
    const pizzaDbName = 'Dominos';
    const client = new MongoClient(uri); // create a client to the mongodb server

    function AvgFinalist()
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);  
                
                const result = await db.collection('NewsPapers').aggregate(   // aggregate can have multpile stages
                    [
                      {
                         $group: {_id:null, avgFinalist:{$avg:"$Pulitzer Prize Winners and Finalists, 2004-2014"}}   // group by stage
                      }          
                    ]
                ).toArray();    // Note: toArray() always needs await, so associate it with await calls. (it can give errors if not called properly.)    
                
                resolve(result[0]);                
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
    
    function ComplexAggregateForAvgFinalist()
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(dbName);  
                
                //complex aggregate -> multi-stage
                const result = await db.collection('NewsPapers').aggregate(   // aggregate can have multpile stages
                    [
                    // Stage 1
                    {
                     $project:{   // project helps in modifying the contents of an object
                        "Newspaper": 1,
                        "Pulitzer Prize Winners and Finalists, 1990-2014": 1, // field:1 says don't modify the field, retain as it is.
                        "Change in Daily Circulation, 2004-2013": 1,          // Here we are saying retain these 3 fields as it is.
                        overallChange:{          //------------------------------- Here overallChange is a new field added and its value is determined based on a condition.
                            $cond: {if:{$gte:["$Change in Daily Circulation, 2004-2013",0]},then:"positive",else:"negative"}
                        }
                     }
                    },
                    // Stage 2
                    {
                        $group: {_id:"$overallChange", avgFinalist:{$avg:"$Pulitzer Prize Winners and Finalists, 1990-2014"}}   // group by the new field.
                    }, 
                    // Stage 3
                    {
                    $sort: {avgFinalist: 1} // sort in ascending order.
                    }             
                    ]
                ).toArray();      // Note: toArray() always needs await, so associate it with await calls. (it can give errors if not called properly.)    
                resolve(result);  // we need all the elements.          
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

    function PizzaQuantity()
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(pizzaDbName);  
                
                // removing the record from DB
                const result = await db.collection('PizzaMenu').aggregate(  
                    [
                        // Stage 1: Filter pizza order documents by pizza size
                        {
                            $match: { size: "medium" }
                        },
                        // Stage 2: Group remaining documents by pizza name and calculate total quantity
                        {
                            $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
                        }             
                    ]
                ).toArray();    // Note: toArray() always needs await, so associate it with await calls. (it can give errors if not called properly.)    
                
                resolve(result);    // send array of pizzas grouped by name and totalQuantity of their order.            
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

    function ComplexAggOfPizzaTotalPrice()
    {
        return new Promise(async (resolve,reject)=>
        {
            try
            {      
                await client.connect(); // connect to ther server
                
                // connect to the db
                const db = client.db(pizzaDbName);  
                
                // 3-stage aggregation
                const result = await db.collection('PizzaMenu').aggregate(  
                    [                
                    {
                     $project:{   // project helps in modifying the contents of an object
                        "id": 1,
                        "name": 1, // field:1 says don't modify the field, retain as it is.
                        "quantity": 1,
                        "price" :1,         // Here we are saying retain these 4 fields as it is.
                        review:{          //------------------------------- Here review is a new field added and its value is determined based on a condition.
                            $cond: {if:{$gt:["$quantity",10]},then:"Yummy",else:"Disliked"}
                        }
                     }
                    },

                    // Stage 2: Group by review and their total price.
                    {
                        $group: { _id: "$review", totalCost: { $sum: "$price" } }
                    },

                    // Stage 3 : Sort the result in descending order.
                    {
                        $sort: { totalCost: -1 } // 1 will sort in ascending order.
                    }             
                    ]
                ).toArray();    // Note: toArray() always needs await, so associate it with await calls. (it can give errors if not called properly.)    
                
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

    return {AvgFinalist, PizzaQuantity, ComplexAggregateForAvgFinalist, ComplexAggOfPizzaTotalPrice}; // return the function references.
}

module.exports = AggregateScenario(); // exporting the returned object (containing the reference of methods).