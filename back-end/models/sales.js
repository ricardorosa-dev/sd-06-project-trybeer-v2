const createSales = (sequelize, DataTypes) => {
  const sale = sequelize.define('sales', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.INTEGER,
    saleDate: DataTypes.STRING,
    status: DataTypes.STRING,
  }, { timestamps: false });

  sale.associate = (models) => {
    sale.belongsTo(models.users,
      { foreignKey: 'userId', as: 'user' });
  };

  return sale;
};

module.exports = createSales;