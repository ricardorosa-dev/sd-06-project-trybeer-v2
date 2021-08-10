const { Router } = require('express');
const {
  createMessages,
  getAllMessages,
  getUserMessages,
  getMsgUsers,
  createUser,
  getAllUsers,
} = require('../models/mongoModel');
// const {
//   getAllUsersService,
//   createUserService,
//   createAdminService,
// } = require('../services/UsersService');
// const { validateUser, validateEmail, validateAdmin } = require('../middlewares/UsersMid');

const routerMessage = Router();
const CREATED = 201;
const SUCCESS = 200;

// USERS
routerMessage.post('/users', async (req, res) => {
  const { name, email, level } = req.body;
  const messageCreated = await createUser(name, email, level);
  return res.status(CREATED).json(messageCreated);
});

routerMessage.get('/users', async (req, res) => {
  const allUsers = await getAllUsers();
  console.log(allUsers);
  return res.status(SUCCESS).json(allUsers);
});

// MESSAGES
routerMessage.post('/messages', async (req, res) => {
  // Testar se o 'from' e o 'to' existem antes de criar a mensagem (seria no Service)
  
  const { from, to, message } = req.body;
  const time = new Date();
  const messageCreated = await createMessages(from, to, message, time);
  return res.status(CREATED).json(messageCreated);
});

routerMessage.get('/messages', async (req, res) => {
  const allMessages = await getAllMessages();
  return res.status(SUCCESS).json(allMessages);
});

routerMessage.get('/messages/numbers', async (req, res) => {
  const usersMessages = await getMsgUsers();
  console.log(usersMessages);
  return res.status(SUCCESS).json(usersMessages);
});

routerMessage.get('/messages/:email', async (req, res) => {
  const { email } = req.params;
  const messages = await getUserMessages(email);
  
  return res.status(SUCCESS).json(messages);
});

module.exports = routerMessage;
