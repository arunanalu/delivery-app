module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'users'
  });
  user.associate = (models) => {
    user.hasMany(models.sale, { foreignKey: 'id', as: 'sales' });
  }
  return user;
}


