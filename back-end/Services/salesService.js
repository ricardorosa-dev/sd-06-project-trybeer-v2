const SalesModel = require('../Model/salesModel');
const models = require('../models');
const { throwThisError } = require('../Utils');

const registerNewOrder = async (req, res) => {
  const { email, orderValue, address, number, products } = req.body;
  const date = new Date();
  const status = 'Pendente';

  const { id } = await models.user.findOne({ where: { email } });

  const order = { id, orderValue, address, number, date, status };
  const newOrder = await models.sales.create(order);

  const insertId = newOrder.id;
  await SalesModel.insertProductSale(insertId, products);
  
  res.status(200).json({ message: 'OK' });
};

const getOrdersByUser = async (req, res) => {
  const { useremail } = req.params;
  const userByEmail = await models.user.findOne({ where: { useremail } }).id;
  const salesByUser = await models.sales.findOne({ where: { userByEmail } });
  if (!salesByUser) throwThisError(500, 'Internal error');

  res.status(200).json(salesByUser);
};

const getOrderDetails = async (req, res) => {
  const { saleid } = req.params;

  const orderDetails = await models.sales.findOne({ where: { saleid } });
  const orderProductsDetails = await models.sales_products.findAll({ where: { saleid } });
  
  const response = { ...orderDetails, products: orderProductsDetails };
  res.status(200).json(response);
};

const getAdminOrders = async (req, res) => {
  const orders = await SalesModel.getAdminOrders();

  res.status(200).json(orders);
};

const getAdminOrderDetails = async (req, res) => {
  const { id } = req.params;

  const orderDetails = await SalesModel.getOrderById(id);
  const orderProductsDetails = await SalesModel.getOrderProductsByOrderId(id);

  const response = { ...orderDetails, products: orderProductsDetails };
  res.status(200).json(response);
};

const editOrderStatus = async (req, res) => {
  const { id } = req.params;
  await SalesModel.editOrderStatus(id);
  
  res.status(200).json({ message: 'ok' });
};

module.exports = {
  registerNewOrder,
  getOrdersByUser,
  getOrderDetails,
  getAdminOrders,
  getAdminOrderDetails,
  editOrderStatus,
};