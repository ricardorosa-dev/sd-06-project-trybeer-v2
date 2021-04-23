import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TopBar from '../components/TopBar';
import { getOrderDetails } from '../services/orders';
import { formatDate } from '../utils/index';
import parseCurrency from '../utils/parseCurrencyToBRL';
import '../styles/orderdetail.css';

function DetailsOrder() {
  const [orderDetails, setOrderDetails] = useState();

  const url = window.location.href.replace('3000', '3001');

  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) history.push('/login');

    getOrderDetails(url).then((response) => setOrderDetails(response));
  }, [history, url]);

  return !orderDetails ? <h1>Loading...</h1> : (
    <div>
      <TopBar name="Detalhes do Pedido" />
      <div className="order-main-container">
        <div className="order-container">
          <div className="order-date">
            <span data-testid="order-number">
              {`Pedido ${orderDetails.id}  `}
            </span>
            <span data-testid="order-date">
              {formatDate(orderDetails.saleDate)}
            </span>
          </div>
          <ul>
            {(orderDetails.product.map((order, index) => (
              <li className="orderlist" key={ index }>
                <span data-testid={ `${index}-product-qtd` }>
                  { `${order.saleProduct.quantity}  ` }
                </span>
                <span data-testid={ `${index}-product-name` }>
                  { ` ${order.name}  ` }
                </span>
                <span data-testid={ `${index}-product-total-value` }>
                  {parseCurrency(
                    `${(order.price * order.saleProduct.quantity).toFixed(2)}`,
                  )}
                </span>
              </li>)))}
          </ul>
          <span data-testid="order-total-value">
            Total:
            {parseCurrency(orderDetails.totalPrice) }
          </span>
        </div>
      </div>
    </div>
  );
}

export default DetailsOrder;
