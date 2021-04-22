const { Router } = require('express');
const rescue = require('express-rescue');
const OrdersService = require('../service/OrdersService');
const { users, sales } = require('../../models');

const router = new Router();

const OK = 200;
const BAD_REQUEST = 404;

router.post('/', rescue(async (req, res) => {
  try {
    const user = req.body;

    const { id: userId } = await users.findOne({ where: {
      email: user.email,
    } });

    const [{ dataValues }] = await sales.findAll({ where: { userId } });
    const orders = [dataValues];

    return res.status(OK).json(orders);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'No orders found' });
  }
}));

router.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const orderInfo = await OrdersService.getDetails(id);
    console.log(orderInfo);

    return res.status(OK).json(orderInfo);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ message: 'No orders found' });
  }
}));

module.exports = router;
