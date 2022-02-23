module.exports = (sequelize, DataTypes) => {
  const salesProduct = sequelize.define(
    "salesProduct", {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    }, { 
      timestamps: false,
      tableName: "salesProducts",
      underscored: true,
    },
  );
  salesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      as: "products",
      through: salesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
    models.product.belongsToMany(models.sale, {
      as: "sale",
      through: salesProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  }
  return salesProduct;
}
