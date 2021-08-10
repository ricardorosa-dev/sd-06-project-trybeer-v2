const { Router } = require('express');
const status = require('../utils/statusDictionary');
// const messages = require('../utils/messageDictionary');
const ProductsService = require('../services/ProductsService');
// const { ThrowError } = require('../middlewares/errorHandler/errorHandler');
// const { secret, jwtConfig, jwtSign, createJWTPayload } = require('../authorization/jwtConfig');

const productsRouter = new Router();

productsRouter.get('/', async (req, res) => {
  const products = await ProductsService.getAllProducts();
  
  res.status(status.SUCCESS).json(products);
});

module.exports = productsRouter;
