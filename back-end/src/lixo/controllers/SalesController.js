const { Router } = require('express');
const status = require('../../utils/statusDictionary');
const tokenValidator = require('../../middlewares/tokenValidator');
const salesService = require('../../services/SalesService');

const salesRouter = new Router();

salesRouter.get('/', async (req, res) => {
  const result = await salesService.getAllSales();
  res.status(status.SUCCESS).json(result);
});

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSalesById(id);
  res.status(status.SUCCESS).json(result);
});

salesRouter.post('/checkout', tokenValidator, async (req, res) => {
const { payload, products } = req.body;
const response = await salesService.createSaleService(payload, products);
  
  return res.status(status.SUCCESS).json(response);
});

salesRouter.get('/', async (_req, res) => {
  const sales = await salesService.getAllSales();
  res.status(status.SUCCESS).json(sales);
});

salesRouter.get('/admin/details/:id', async (req, res) => {
  const { id: saleId } = req.params;
  const responsePayload = await salesService.getSaleById(saleId);
  const { sale, saleProducts } = responsePayload;
  res.status(status.SUCCESS).json({ sale, saleProducts });
});

salesRouter.put('/admin/details/:id', async (req, res) => {
  const { id: saleId } = req.params;
  await salesService.fullfilSale(saleId);
  res.status(status.SUCCESS).json({ updated: true });
});

module.exports = salesRouter;
