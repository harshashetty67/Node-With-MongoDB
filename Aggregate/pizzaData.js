const Insertdata = require('../Helper/InsertData');
const assert = require('assert');
const pizzaData = require('..//pizza.json');

async function main()
{
    // calling the insert data method from other module => circularRepo.js
    const results = await Insertdata.LoadData(pizzaData);

    // assert the number of records inserted
    console.log(assert.equal(8,results.insertedCount)); // count of inserted records
}

main().catch(console.error());
