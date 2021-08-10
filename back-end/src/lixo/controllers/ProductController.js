const { Router } = require('express');
const status = require('../../utils/statusDictionary');
const ProductsService = require('../../services/ProductsService');

const productsRouter = new Router();

productsRouter.get('/', async (req, res) => {
  const products = await ProductsService.getAllProducts();
  res.status(status.SUCCESS).json(products);
});

module.exports = productsRouter;
