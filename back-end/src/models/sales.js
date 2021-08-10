const createSales = (sequelize, Datatypes) => {
  const Sale = sequelize.define('sales', {
    userId: Datatypes.NUMBER,
    totalPrice: Datatypes.NUMBER,
    deliveryAddress: Datatypes.STRING,
    deliveryNumber: Datatypes.STRING,
    saleDate: Datatypes.DATE,
    status: Datatypes.STRING,
  }, { timestamps: false });
  
  Sale.associate = (models) => {
    Sale.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'idUser',
    });
  };
  
  return Sale;
};

module.exports = createSales;
