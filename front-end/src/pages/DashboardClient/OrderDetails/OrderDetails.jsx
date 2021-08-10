import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import './OrderDetails.scss';
import { getSalesById } from '../../../services/Sales';
import { parseCartPrice } from '../../../utils/parseValues';
import { verifyUser } from '../../../store/LocalStorage/actions';

/**
 * Soma o total do pedido (quantidade * preco)
 * @param {String} products
 * @returns String contendo a soma dos itens teste teste
 */
// const soma = (products) => {
//   let totalVenda = 0;
//   products.forEach((e) => {
//     totalVenda += Number(e.quantity) * Number(e.price);
//   });
//   return totalVenda;
// };

export default function Orders({ match: { params: { id } } }) {
  const [orderDetails, setOrderDetails] = useState([]);
  const history = useHistory();

  useEffect(() => {
    verifyUser(history);
  }, [history]);

  useEffect(() => {
    const getOrderDetails = async () => {
      console.log(id, 'iddd');
      const result = await getSalesById(id);
      setOrderDetails(result);
      console.log(result, 'resuuuult');
    };
    getOrderDetails();
  }, [id]);

  return (
    <div className="body">
      <div>
        <Header title="Detalhes de Pedido" user="client" />
      </div>
      <div className="geral">
        <div className="title">
          <div className="orderContainer">
            <h2 data-testid="order-number">{`Pedido ${orderDetails.id} (${orderDetails.status})`}</h2>
          </div>
          <div className="data">
            {/* <h2>{`Data: ${orderDetails.saleDate}`}</h2> */}
            <h3>
            {
              `${new Date(Date.parse(orderDetails.saleDate)).getDate()}/
              ${new Date(Date.parse(orderDetails.saleDate)).getMonth()}/
              ${new Date(Date.parse(orderDetails.saleDate)).getYear()}`
            }
            </h3>
            {/* <h2 data-testid="order-date">{correctDate(orderDetails.saleDate)}</h2> */}
          </div>
        </div>
        <div className="detalhes">
          {/* <p className="quantidade">
            {orderDetails.quantity}
          </p> */}
          {/* <p className="nome">
            {orderDetails.productName}
          </p> */}
          {/* <p className="preço">{parseCartPrice(orderDetails.price)}</p> */}
          <p
            className="subtotal"
          >
              {/* parseCartPrice(orderDetails.quantity * orderDetails.price) */}
              <h3>{`Total ${parseCartPrice((orderDetails.totalPrice))}`}</h3>
          </p>
        </div>
      </div>
    </div>
  );
}

Orders.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
