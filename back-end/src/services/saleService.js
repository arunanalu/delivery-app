const Sequelize = require('sequelize');
const { sale, salesProduct, user, product } = require('../database/models');
const config = require('../database/config/config');
const {
  createdWithSuccsess,
  invalidId,
  invalidEntry,
} = require('../utils/dictionaries/messagesDefault');
const {
  /* registerSaleValidation, */
  updateSaleValidation,
  getSalesByUserIdValdiation,
} = require('../validations/salesValidations');
const { errorConstructor } = require('../utils/functions');
const { badRequest } = require('../utils/dictionaries/statusCode');

const sequelize = new Sequelize(config.development);

const registerSalesService = async (incomingSale, arrayProducts) => {
  /* registerSaleValidation(incomingSale, arrayProducts); */
  const t = await sequelize.transaction();
  try {
    const saleCreated = await sale.create({ ...incomingSale }, { transaction: t });
    const newArrayProducts = arrayProducts.map((element) => ({
      saleId: saleCreated.dataValues.id,
      ...element,
    }));
    await salesProduct.bulkCreate([...newArrayProducts], { transaction: t });
    await t.commit();
    return {
      message: createdWithSuccsess,
      saleId: saleCreated.dataValues.id,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const verifySaleId = async (id) => {
  const shouldExist = await sale.findOne({ where: { id } });
  if (!shouldExist) throw errorConstructor(badRequest, invalidId);
};

const updateSaleStatusService = async (id, newStatus) => {
  await verifySaleId(id);
  updateSaleValidation(id, newStatus);
  await sale.update({ status: newStatus }, { where: { id } });
};

const verifyUserId = async (id) => {
  const shouldExist = await user.findOne({ where: { id } });
  if (!shouldExist) throw errorConstructor(badRequest, invalidId);
};

const getSalesByUserIdService = async (id) => {
  await verifyUserId(id);
  getSalesByUserIdValdiation(id);
  const sales = await sale.findAll({ where: { userId: id } });
  const salesToReturn = sales.map((element) => element.dataValues);
  return salesToReturn;
};

const getSaleDetailsService = async (id) => {
  if (!id) {
    throw errorConstructor(badRequest, invalidEntry);
  }
  await verifySaleId(id);
  const salesAndProducts = await sale.findOne({
    where: { id },
    include: { model: product, as: 'products', through: { attributes: ['quantity'] } },
  });

  return salesAndProducts.dataValues;
};

const getSaleByIdSellerService = async (id) => {
  const sales = await sale.findAll({ where: { sellerId: id } });
  console.log('🚀 ~ file: saleService.js ~ line 79 ~ getSaleByIdSellerService ~ sales', sales);
  const salesToReturn = sales.map((element) => element.dataValues);
  return salesToReturn;
};

module.exports = {
  registerSalesService,
  updateSaleStatusService,
  getSalesByUserIdService,
  getSaleDetailsService,
  getSaleByIdSellerService,
};
