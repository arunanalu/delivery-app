const {
  createdWithSuccsess,
  invalidId,
  invalidEntry,
} = require('../utils/dictionaries/messagesDefault');
const {
  /* registerSaleValidation, */
  updateSaleValidation,
  getSalesByUserIdValdiation,
  registerSaleValidation,
} = require('../validations/salesValidations');
const { errorConstructor } = require('../utils/functions');
const { badRequest } = require('../utils/dictionaries/statusCode');
const Sale = require('../models/saleSchema');
const SalesProduct = require('../models/salesProductSchema');
const User = require('../models/userSchema');

const registerSalesService = async (incomingSale, arrayProducts) => {
  registerSaleValidation(incomingSale, arrayProducts);
  const { id } = await User.findOne({ name: 'Fulana Pereira' });
  const saleCreated = await Sale.create({ ...incomingSale, sellerId: id });
  const newArrayProducts = arrayProducts.map((element) => ({
        saleId: saleCreated.id,
        ...element,
  }));
  await SalesProduct.insertMany(newArrayProducts);
  return {
    message: createdWithSuccsess,
    saleId: saleCreated.id,
  };
};

const verifySaleId = async (id) => {
  const shouldExist = await Sale.findOne({ _id: id });
  if (!shouldExist) throw errorConstructor(badRequest, invalidId);
};

const updateSaleStatusService = async (id, newStatus) => {
  await verifySaleId(id);
  updateSaleValidation(id, newStatus);
  await Sale.updateOne({ _id: id }, { status: newStatus });
};

const verifyUserId = async (id) => {
  const shouldExist = await User.findOne({ _id: id });
  if (!shouldExist) throw errorConstructor(badRequest, invalidId);
};

const getSalesByUserIdService = async (id) => {
  await verifyUserId(id);
  getSalesByUserIdValdiation(id);
  const sales = await Sale.find({ userId: id }).sort({ _id: -1 });
  return sales;
};

const getSaleDetailsService = async (id) => {
  if (!id) {
    throw errorConstructor(badRequest, invalidEntry);
  }
  await verifySaleId(id);
  const result = await SalesProduct.find({ saleId: id }).populate('productId').lean();
  const products = result.map((element) => {
    const { productId, quantity } = element;
    return { ...productId, salesProduct: { quantity } };
  });
  const resultSale = await Sale.findOne({ _id: id }).lean();
  const saleAndProducts = { ...resultSale, products: [...products] };
  return saleAndProducts;
};

const getSaleByIdSellerService = async (id) => {
  const sales = await Sale.find({ sellerId: id }).sort({ _id: -1 });
  // console.log('🚀 ~ file: saleService.js ~ line 79 ~ getSaleByIdSellerService ~ sales', sales);
  return sales;
};

module.exports = {
  registerSalesService,
  updateSaleStatusService,
  getSalesByUserIdService,
  getSaleDetailsService,
  getSaleByIdSellerService,
};
