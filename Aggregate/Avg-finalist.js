const aggregate = require('../Helper/Aggregate');

async function main()
{
    const result = await aggregate.AvgFinalist();
    console.log(result.avgFinalist);

    // complex aggregation
    const response = await aggregate.ComplexAggregateForAvgFinalist();
    console.log(response);
}

main();