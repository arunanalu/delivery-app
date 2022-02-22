module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    "saleProduct", {
      quantity: DataTypes.INTEGER
    }, { timestamps: false },
  );
  saleProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      as: "product",
      through: saleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
    models.product.belongsToMany(models.sale, {
      as: "sale",
      through: saleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  }
  return saleProduct;
}
