//const GetCircularRepoData = require('../Helper/GetData');
const assert = require('assert'); // for assert call
const RemoveRepo = require('..//Helper/RemoveData'); 
const GetCircularRepoData = require('../Helper/GetData');

async function main()
{          
   const result = await RemoveRepo.Remove({Newspaper:'Times Of India'});
   assert.equal(result.deletedCount,1); // assert the number of records deleted

   console.log(await GetCircularRepoData.getData({Newspaper:'Times Of India'},1)); // this will return null
}

main();