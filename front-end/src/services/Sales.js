const { endpoint } = require('./utils');

const applicationJsonContent = 'application/json';

const postSale = (token, payload, products) => fetch(`${endpoint}/sales/checkout`, {
  method: 'POST',
  headers: {
    'Content-type': applicationJsonContent,
    authorization: token,
  },
  body: JSON.stringify({ payload, products }),
})
  .then((response) => response.json());

const getAllSales = () => fetch(`${endpoint}/sales`)
  .then((response) => response.json());

const getSalesById = (id) => fetch(`${endpoint}/sales/${id}`)
  .then((responses) => responses.json());
  // .then((response) => response.dataValues);

const getSales = () => fetch(`${endpoint}/sales`)
  .then((response) => response.json());

const getAdminSaleDetails = async (id) => {
  const response = await fetch(`${endpoint}/sales/admin/details/${id}`);
  const result = await response.json();
  console.log(result);
  return result;
};

// const fullfilSale = (id, status) => fetch(`${endpoint}/sales/admin/details/${id}`, {
//   method: 'PUT',
//   headers: {
//     'Content-Type': applicationJsonContent,
//   },
//   body: JSON.stringify(status),
// }).then((response) => response.json());

const updateProductStatus = (id, status) => {
  fetch(`${endpoint}/sales/admin/details/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': applicationJsonContent,
    },
    body: JSON.stringify(status),
  }).then((response) => response.json());
};

module.exports = {
  getAdminSaleDetails,
  getSales,
  postSale,
  // fullfilSale,
  getAllSales,
  getSalesById,
  updateProductStatus,
};
