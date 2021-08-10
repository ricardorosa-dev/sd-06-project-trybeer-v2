const { endpoint } = require('./utils');

const getProducts = () => fetch(`${endpoint}/products`)
  .then((response) => response.json());

module.exports = {
  getProducts,
};
