const connection = require('./connection');

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const getEmail = async (emailLogin) => {
  const [result] = await connection.execute('SELECT * FROM users WHERE email=?', [emailLogin]);
  return result;
};

const registerUser = async ({ name, email, password, role }) => {
  const [responsePayload] = await connection
    .execute('INSERT INTO users(name, email, password, role) VALUES(?, ?, ?, ?)',
      [name, email, password, role]);
  return responsePayload;
};

const updateName = async (newUserName, email) => {
  console.log(newUserName);
  console.log(email);

  await connection
    .execute('UPDATE users SET name=? WHERE email=?', [newUserName, email]);
  // console.log(updatedUser)
  return null;
};

const getAllUserOrders = async (idUser) => {
  const [allUserOrders] = await connection.execute('SELECT * FROM sales WHERE user_id=?', [idUser]);
  return allUserOrders;
};

module.exports = {
  getAll,
  getEmail,
  registerUser,
  updateName,
  getAllUserOrders,
};
