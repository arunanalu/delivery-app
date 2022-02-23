const Sequelize = require('sequelize');
const { sale, salesProduct } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const registerSalesService = async (incomingSale, arrayProducts) => {
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
      message: 'Sucessfully created',
      saleId: saleCreated.dataValues.id,
    };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const updateSaleStatusService = async (id, newStatus) => {
  await sale.update({ status: newStatus }, { where: { id } });
};

const getSalesByUserIdService = async (id) => {
  const sales = await sale.findAll({ where: { userId: id } });
  return sales.dataValues;
};

// fazer uma rota para pegar os detalhes de um pedido. precisa retornar pro front todos os produtos comprados naquele pedido

module.exports = { registerSalesService, updateSaleStatusService, getSalesByUserIdService };