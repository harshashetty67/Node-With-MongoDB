const aggregate = require('../Helper/Aggregate');

async function main()
{
    //const result = await aggregate.PizzaQuantity(); // calling the aggregate method for Pizza records.
    //console.log(result);

    // Complex aggregate
    const response = await aggregate.ComplexAggOfPizzaTotalPrice();
    console.log(response);
}

main();

/*---------------------------------------------
// For more examples, see: https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#std-label-aggregation-pipeline-examples 
*/