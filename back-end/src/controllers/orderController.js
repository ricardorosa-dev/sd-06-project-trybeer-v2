const { Router } = require('express');
const Service = require('../services/orderService');
const { sale, user, salesProduct, sequelize, product } = require('../models');
const status = require('../utils/httpStatusCode');

const orderRouter = Router();
const erroReturnCatch = status.INTERNAL_SERVER_ERROR;
const messageJson = { message: 'Internal Server Error' };

orderRouter.post('/', async (req, res) => {
  try {
    const { email, totalPrice, deliveryAddress, deliveryNumber, date, saleProduct } = req.body;
    console.log(req.body);
    
    const { id } = await user.findOne({ where: { email } });

    await Service.createSale(
      { id, totalPrice, deliveryAddress, deliveryNumber, date, saleProduct },
    );

    res.status(200).json({ id, totalPrice, deliveryAddress, deliveryNumber, date });
  } catch (error) {
    console.log(error.message);
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.get('/', async (_req, res) => {
  try {
    const allSales = await sale.findAll();

    return res.status(status.OK).json(allSales);
  } catch (error) {
    return res.status(erroReturnCatch).json(messageJson);
  }
});

orderRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  // try {
    const Salebyid = await salesProduct.findAll({
       where: { saleId: id },
       include: [
         { model: sale, as: 'sale', attributes: [] },
         { model: product, as: 'product', attributes: [] },
        ],
       attributes: ['quantity',
       [sequelize.col('sale.status'), 'status'],
       [sequelize.col('sale.saleDate'), 'saleDate'],
       [sequelize.col('product.name'), 'name'],
       [sequelize.col('product.price'), 'price'],
       [sequelize.literal('product.price * quantity'), 'price2'],
      ],
    });

    return res.status(status.OK).json(Salebyid);
  // } catch (error) {
    // return res.status(erroReturnCatch).json(messageJson);
  // }
});

orderRouter.put('/', async (req, res) => {
  const { id } = req.body;
  const updateStatus = await sale.findByPk(id);
  updateStatus.status = 'Entregue';
  updateStatus.save();
  res.status(200).json('atualizado');
});

module.exports = orderRouter;
