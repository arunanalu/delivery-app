module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define(
    "sale",
    {
      total_price: DataTypes.DECIMAL(9, 2),
      delivery_address: DataTypes.STRING(100),
      delivery_number: DataTypes.STRING(50),
      sale_date: DataTypes.DATE,
      status: DataTypes.STRING(50)
    },
    {
      timestamps: false,
      tableName: "sales",
    }
  );
  sale.associate = (models) => {
    sale.belongsTo(models.user, {
      foreignKey: "id",
      as: "user_id",
    });
    sale.belongsTo(models.user, {
      foreignKey: "id",
      as: "seller_id",
    });
  };
  return sale;
};
