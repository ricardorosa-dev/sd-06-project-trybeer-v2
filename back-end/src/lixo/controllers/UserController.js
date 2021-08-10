const { Router } = require('express');
const { getAll } = require('../models/UserModel');
const {
  getEmailService,
  registerUserService,
  updateUserName,
  allUserOrdersService,
} = require('../../services/UserService');
const tokenValidator = require('../../middlewares/tokenValidator');
const status = require('../../utils/statusDictionary');
const messages = require('../../utils/messageDictionary');
const { ThrowError } = require('../../middlewares/errorHandler/errorHandler');
const { secret, jwtConfig, jwtSign, createJWTPayload } = require('../../authorization/jwtConfig');

const userRouter = new Router();

userRouter.get('/', async (req, res) => {
  const allUsers = await getAll();
  return res.status(status.SUCCESS).json(allUsers);
});

userRouter.post('/login', async (req, res, next) => {
  const user = await getEmailService(req.body.email);
  try {
    if (!user.length) throw new ThrowError(status.NOT_FOUND, messages.USER_NOT_FOUND);
    const payload = createJWTPayload(user);
    
    const token = jwtSign(payload, secret, jwtConfig);
    return res.status(status.SUCCESS)
      .json({
        token, 
        name: user[0].name, 
        email: user[0].email, 
        role: user[0].role, 
        id: user[0].id,
      });
  } catch (error) {
    next(error);
  }
});

userRouter.post('/register', async (req, res, next) => {
  const { body: user, body: { name, email, role } } = req;
  const resultRegister = await registerUserService(user);
  try {
    if (!resultRegister) {
      throw new ThrowError(status.CONFLICT, messages.EMAIL_EXISTS);
    }
    
    const payload = createJWTPayload(user);
    
    if (!resultRegister.affectedRows) {
      throw new ThrowError(status.INTERNAL_ERROR, messages.DEFAULT_ERROR);
    }
    const token = jwtSign(payload, secret, jwtConfig);
    return res.status(status.CREATED)
      .json({ token, name, email, role });
  } catch (error) {
    next(error);
  }
});

userRouter.put('/update', tokenValidator, async (req, res) => {
  const { name: newUserName } = req.body;
  const { email } = req.user;
  await updateUserName(newUserName, email);
  res.status(status.NO_CONTENT).send({ status: 'ok' });
});

userRouter.get('/orders', async (req, res) => {
  const { email } = req.headers;
  const allOrders = await allUserOrdersService(email);
  // console.log('email:', email)
  // console.log('resultado:', allOrders)
  res.status(status.SUCCESS).json(allOrders);
});

module.exports = userRouter;
