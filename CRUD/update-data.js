const GetCircularRepoData = require('../Helper/GetData');
const assert = require('assert'); // for assert call
const UpdateRepo = require('../Helper/UpdateData');

async function main()
{
const itemToBeUpdated = 
        {
        "Newspaper": "New Tulu Nadu Culture",
        "Daily Circulation, 2004": 6,
        "Daily Circulation, 2013": 80,
        "Change in Daily Circulation, 2004-2013": 1100,
        "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
        "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
        "Pulitzer Prize Winners and Finalists, 1990-2014": 1
        };
        
    const updateResult = await UpdateRepo.Update({Newspaper: 'Tulu Nadu'},itemToBeUpdated);

    assert.equal(updateResult.modifiedCount,1); // asserting for updated result.

}

main();