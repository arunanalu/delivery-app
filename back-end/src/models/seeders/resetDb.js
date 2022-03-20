const Product = require("../productSchema")
const Sale = require("../saleSchema")
const SalesProduct = require("../salesProductSchema")
const User = require("../userSchema")
const executeSeeders = require("./executeSeeders")

const resetDb = async () => {
  console.log('reseting database...', '\n');
  console.log('deleting entries in salesproducts collection', '\n')
  await SalesProduct.deleteMany().then(() => {
    console.log('succsess!', '\n')
  }).catch((err) => console.log(err))
  console.log('deleting entries in sales collection', '\n')
  await Sale.deleteMany().then(() => {
    console.log('success!', '\n');
  }).catch((err) => console.log(err))
  console.log('deleting entries in products collection', '\n');
  await Product.deleteMany().then(() => {
    console.log('success!', '\n')
  }).catch((err) => console.log(err))
  console.log('deleting entries in users collection', '\n')
  await User.deleteMany().then(() => {
    console.log('success!', '\n');
  }).catch((err) => console.log(err))
  await executeSeeders();
}

resetDb();