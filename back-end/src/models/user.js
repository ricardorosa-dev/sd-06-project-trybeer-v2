const createUsers = (sequelize, Datatypes) => {
  const User = sequelize.define('user', {
    name: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    role: Datatypes.STRING,
  }, { timestamps: false });
  
  User.associate = (models) => {
    User.hasMany(models.sales, {
      foreignKey: 'userId',
      as: 'sale',
    });
  };
  
  return User;
};

module.exports = createUsers;
