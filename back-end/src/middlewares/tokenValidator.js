const jwt = require('jsonwebtoken');
const { secret } = require('../authorization/jwtConfig');
const { ThrowError } = require('./errorHandler/errorHandler');
const status = require('../utils/statusDictionary');
const messages = require('../utils/messageDictionary');
const { user } = require('../models');

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new ThrowError(status.UNAUTHORIZED, messages.UNAUTHORIZED);
    const { userData } = jwt.verify(token, secret);
    const tokenUserEmail = userData.email;
    const username = await user.findOne({ where: { email: tokenUserEmail } });
    
    if (!username.id) throw new ThrowError(status.NOT_FOUND, messages.USER_NOT_FOUND);
    const registeredUser = username;
    req.user = registeredUser.dataValues;
    next();
  } catch (error) {
    next(error);
  }
}; 
