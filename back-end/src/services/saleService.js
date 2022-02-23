const Sequelize = require('sequelize');
const { sale, salesProduct, user } = require('../database/models');
const config = require('../database/config/config');
const { createdWithSuccsess, invalidId } = require('../utils/dictionaries/messagesDefault');
const { 
  registerSaleValidation, 
  updateSaleValidation, 
  getSalesByUserIdValdiation, 
} = require('../validations/salesValidations');
const { errorConstructor } = require('../utils/functions');
const { badRequest } = require('../utils/dictionaries/statusCode');

const sequelize = new Sequelize(config.development);

const registerSalesService = async (incomingSale, arrayProducts) => {
  registerSaleValidation(incomingSale, arrayProducts);
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

// fazer uma rota para pegar os detalhes de um pedido. precisa retornar pro front todos os produtos comprados naquele pedido e suas quantidades

module.exports = { registerSalesService, updateSaleStatusService, getSalesByUserIdService };