import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import { userOrders } from '../../../services/Users';
import { verifyUser } from '../../../store/LocalStorage/actions';
import { parseCartPrice } from '../../../utils/parseValues';
import dateIcon from './dateIcon.png';
import price from './price.png';
import prendedor from './prendedor.jpg';
import './Orders.scss';

export default function Orders() {
  const [orders, setOrders] = useState([{}]);
  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      const { email } = verifyUser(history);
      if (!email) return null;
      const allOrders = await userOrders(email);
      setOrders(allOrders);
      console.log(allOrders);
    };
    fetchOrders();
  }, [history]);

  const redirectOrder = (id) => history.push(`/orders/${id}`);

  return (
    <div className="div-pedidos">
      <Header title="Meus Pedidos" user="client" />
      <div className="ordersContainer">
        {orders.map((order, index) => (
          <div
            role="button"
            tabIndex={ index }
            key={ index }
            data-testid={ `${index}-order-card-container` }
            onClick={ () => redirectOrder(order.id) }
            onKeyDown={ () => redirectOrder(order.id) }
            className="orders"
          >
            <div className="image">
              <img className="prancheta" src={ prendedor } alt="prancheta" />
            </div>
            <div className="text-content">
              <h2 className="pedido" data-testid={ `${index}-order-number` }>{`Pedido ${order.id}`}</h2>
              <div className="div-date">
                <img className="calendario" src={ dateIcon } alt="calendário" />
                <h4
                  data-testid={ `${index}-order-date` }
                  className="date-orders textos-pedidos"
                >
                  {
                    `${new Date(Date.parse(order.saleDate)).getDate()}/
                    ${new Date(Date.parse(order.saleDate)).getMonth()}/
                    ${new Date(Date.parse(order.saleDate)).getYear()}`
                  }
                </h4>
              </div>
              <div className="div-price">
                <img className="price" src={ price } alt="etiqueta de preço" />
                <h4 className="textos-pedidos" data-testid={ `${index}-order-total-value` }>
                  { parseCartPrice(parseInt(order.totalPrice)) }
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
