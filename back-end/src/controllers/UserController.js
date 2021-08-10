const { Router } = require('express');
const { user } = require('../models');
const {
  getEmailService,
  registerUserService,
  updateUserName,
  allUserOrdersService,
} = require('../services/UserService');
const tokenValidator = require('../middlewares/tokenValidator');
const status = require('../utils/statusDictionary');
const messages = require('../utils/messageDictionary');
const { ThrowError } = require('../middlewares/errorHandler/errorHandler');
const { secret, jwtConfig, jwtSign, createJWTPayload } = require('../authorization/jwtConfig');
require('dotenv');

const userRouter = new Router();

userRouter.get('/', async (req, res) => {
  const allUsers = await user.findAll();
  return res.status(status.SUCCESS).json(allUsers);
});

userRouter.post('/login', async (req, res, next) => {
  const { dataValues } = await getEmailService(req.body.email);
  console.log(dataValues);
  try {
    if (!dataValues.id) throw new ThrowError(status.NOT_FOUND, messages.USER_NOT_FOUND);
    const payload = createJWTPayload(dataValues);

    const token = jwtSign(payload, secret, jwtConfig);
    return res.status(status.SUCCESS)
      .json({
        token,
        name: dataValues.name,
        email: dataValues.email,
        role: dataValues.role,
        id: dataValues.id,
      });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/register', async (req, res, next) => {
  const { body: username, body: { name, email, role } } = req;
  const resultRegister = await registerUserService(username);
  // console.log(resultRegister.dataValues.id);
  const { id } = resultRegister.dataValues;
  try {
    if (!resultRegister) {
      throw new ThrowError(status.CONFLICT, messages.EMAIL_EXISTS);
    }

    const payload = createJWTPayload(username);

    if (!resultRegister.dataValues) {
      throw new ThrowError(status.INTERNAL_ERROR, messages.DEFAULT_ERROR);
    }
    const token = jwtSign(payload, secret, jwtConfig);
    return res.status(status.CREATED).json({ token, name, email, role, id });
  } catch (error) {
    next(error);
  }
});

userRouter.put('/update', tokenValidator, async (req, res) => {
  if (!req.body.name) {
    return res.status(404).json({ message: 'Adicione um atributo "name"' });
  }
  
  const { name: newUserName } = req.body;
  const { email } = req.user;
  await updateUserName(newUserName, email);
  res.status(status.NO_CONTENT).json({ message: 'ok' });
});

userRouter.get('/orders', async (req, res) => {
  const { email } = req.headers;
  const allOrders = await allUserOrdersService(email);
  res.status(status.SUCCESS).json(allOrders);
});

module.exports = userRouter;
