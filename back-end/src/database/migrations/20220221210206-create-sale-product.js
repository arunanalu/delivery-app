'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("saleProducts", {
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "product_id",
        allowNull: false,
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "sales",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "sale_id",
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('saleProducts');
  }
};
