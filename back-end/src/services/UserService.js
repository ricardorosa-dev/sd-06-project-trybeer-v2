const { user, sales } = require('../models');

const getEmailService = async (emailLogin) => {
  const resultService = await user.findOne({ where: { email: emailLogin } });
  return resultService;
};

const registerUserService = async (body) => {
  const verifyEmail = await user.findOne({
    where: { email: body.email },
  });
  if (verifyEmail) return false;
  const resultService = await user.create(body);
  return resultService;
};

const updateUserName = async (newUserName, email) => {
  const updatedUser = await user.update(
    { name: newUserName },
    { where: { email } },
  );
  return updatedUser;
};

const allUserOrdersService = async (email) => {
  const { dataValues } = await user.findOne({ where: { email } });
  const userId = dataValues.id;
  
  const userOrders = await sales.findAll({ where: { userId } });
  return userOrders;
};

module.exports = {
  getEmailService,
  registerUserService,
  updateUserName,
  allUserOrdersService,
};
