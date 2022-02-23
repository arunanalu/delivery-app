const Sequelize = require('sequelize');
const { sale, salesProduct } = require('../database/models');
const config = require('../database/config/config');
const { createdWithSuccsess } = require('../utils/dictionaries/messagesDefault');
const { registerSaleValidation } = require('../validations/salesValidations');

const sequelize = new Sequelize(config.development);

// const registerSalesProducts = () => {
  
// };

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

module.exports = { registerSalesService };