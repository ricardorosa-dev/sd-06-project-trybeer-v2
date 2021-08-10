const { sales, salesProducts } = require('../models');
const status = require('../utils/statusDictionary');
const messages = require('../utils/messageDictionary');
const { ThrowError } = require('../middlewares/errorHandler/errorHandler');

const createSaleService = async (payload, products) => {
  if (!payload) throw new ThrowError(status.BAD_REQUEST, messages.NO_EMPTY_FIELDS);
  console.log(payload);
  const { dataValues } = await sales.create(payload);

  const { id } = dataValues;
  const insertProducts = products.map((product) => (
    { saleId: id, productId: product.id, quantity: product.quantity }
  ));
  
  await salesProducts.bulkCreate(insertProducts);
  return dataValues;
};

const getAllSales = async () => {
  const allSales = await sales.findAll();
  return allSales;
};

const getSaleById = async (saleId) => {
  const { dataValues } = await sales.findByPk(saleId);
  const saleProducts = await salesProducts.findAll({ where: { saleId } });

  const responsePayload = {
    sale: dataValues,
    saleProducts,
  };
  return responsePayload;
};

const fullfilSale = async (saleId, saleStatus) => {
  const sale = await sales.update({ status: saleStatus }, { where: { id: saleId } });
  console.log(sale);
  return sale;
};

/**
 * Lista venda detalhada filtrada  pelo id da venda
 * @param {String} id 
 * @returns Object contendo detalhes da venda
 */
const getSalesById = async (id) => {
  console.log(id, 'iddddd');
  const result = await sales.findByPk(id);
  console.log(result, 'result back');
  return result;
};

module.exports = {
  getSaleById,
  getAllSales,
  createSaleService,
  fullfilSale,
  getSalesById,
};
