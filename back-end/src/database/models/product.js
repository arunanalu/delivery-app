module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4,2),
      url_image: DataTypes.STRING(200),
    },
    {
      timestamps: false,
      tableName: "products",
    }
  );
  product.associate = (models) => {
    product.hasMany(models.salesProduct, { foreignKey: "product_id", as: "products" });
  };
  return product;
};
