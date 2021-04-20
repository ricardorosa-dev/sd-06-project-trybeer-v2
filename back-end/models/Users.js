const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { primaryKey: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.Sales,
      { foreignKey: 'userId', as: 'users' });
  };

  return Users;
};

module.exports = createUsers;
