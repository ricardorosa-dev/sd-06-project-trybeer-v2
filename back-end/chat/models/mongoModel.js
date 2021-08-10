const connection = require('./connection');

// USERS
const createUser = async (name, email, level) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, level }));
  return {
    _id: insertedId,
    name,
    email,
    level,
  };
};

const getAllUsers = async () => connection()
  .then((database) => database.collection('users').find().toArray());

// MESSAGES
const createMessages = async (from, to, message, time) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('messages').insertOne({ from, to, message, time }));
  return {
    _id: insertedId,
    from,
    to,
    message,
    time,
  };
};

const getAllMessages = async () => connection()
  .then((database) => database.collection('messages').find().toArray());

const getUserMessages = async (email) => connection()
  .then((database) => database.collection('messages')
  .find({ $or: [{ from: email }, { from: 'tryber@trybe.com.br', to: email }] }).toArray());

// Pegar a mensagem mais recente de cada usuario, pra gerar os cards no Admin
const getMsgUsers = async () => connection()
  .then((db) => db.collection('messages').aggregate(
    [
      { $group: { _id: '$from', lastMessage: { $max: '$time' } } },
      { $match: { _id: { $not: /tryber@trybe.com.br/ } } },
      { $sort: { lastMessage: -1 } },
      { $project: { user: '$_id', lastMessage: 1 } },
    ],
  ).toArray());

module.exports = {
  createUser,
  getAllUsers,
  createMessages,
  getAllMessages,
  getUserMessages,
  getMsgUsers,
};
