const connection = require('./connection');

const getAllByEmail = async (email) => {
  const response = await connection()
    .then((db) => db.collection('message').find({ email }).toArray());
  return response;
};

const createMessage = async (email, message, time) => {
  await connection().then((db) => db.collection('message').updateOne(
    { email },
    { $push: { messageDetails: { email, message, time } } },
    { upsert: true },
  ));
};

const getAll = async () => {
  const response = await connection()
    .then((db) => db.collection('message').find().toArray());
  return response;
};

module.exports = {
  getAllByEmail,
  createMessage,
  getAll,
};
