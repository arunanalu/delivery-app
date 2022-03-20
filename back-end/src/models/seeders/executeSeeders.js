const productsSeeders = require("./productsSeeders");
const usersSeeders = require("./userSeeders");

const executeSeeders = async () => {
  console.log('populing seeders...', '\n');
  console.log('starting products seeders', '\n');
  await productsSeeders().then(() => {
    console.log('success !', '\n')
  })
  console.log('starting users seeders', '\n');
  await usersSeeders().then(() => {
    console.log('success !', '\n')
  })
  process.exit();
}

module.exports = executeSeeders;