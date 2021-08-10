import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header/Header';
import { getAdminSaleDetails, updateProductStatus } from '../../../services/Sales';
import capitalize from '../../../utils/capitalize';
import { parseCartPrice } from '../../../utils/parseValues';
import './AdminOrdersDetail.scss';
import { useHistory } from 'react-router';

export default function AdminOrdersDetail({ match: { params: { id } } }) {
  const [saleDetails, setSaleDetails] = useState({});
  
  const history = useHistory();

  useEffect(() => {
    const fetchSale = async () => {
      const sale = await getAdminSaleDetails(id);
      setSaleDetails(sale);
    };
    fetchSale();
  }, [id]);

  const fullfilOrder = async () => {
    const newState = {
      ...saleDetails,
      sale: { ...saleDetails.sale, status: 'Entregue' },
    };
    setSaleDetails(newState);
    await updateProductStatus(id, { saleStatus: 'Entregue' });
  };

  const setAsPreparing = async () => {
    const newState = {
      ...saleDetails,
      sale: { ...saleDetails.sale, status: 'Preparando' },
    };
    setSaleDetails(newState);

    await updateProductStatus(id, { saleStatus: 'Preparando' });
  };

  const { saleProducts, sale } = saleDetails;

  return (

    <div>
      <Header title="TryBeer" user="admin" />
      <div className="orderDetailsContainer">
        {saleProducts && (
          <>
            <h1>
              <div data-testid="order-number">
                {`Pedido ${sale.id}`} <br />
                <p className="orderDate">
                  {
                  `${new Date(Date.parse(sale.saleDate)).getDate()}/
                  ${new Date(Date.parse(sale.saleDate)).getMonth()}/
                  ${new Date(Date.parse(sale.saleDate)).getYear()}`
                  }
                </p>
              </div>
              <div className="orderStatus" data-testid="order-status">
                ({sale && capitalize(sale.status)})
              </div>
            </h1>
            <div className="sale-details">
              <ul>
                {saleProducts.map(({ quantity, productId }, index) => (
                  <li key={ index }>
                      Id do produto: {productId} (qtd: {quantity})
                  </li>
                ))}
              </ul>
              <h2 data-testid="order-total-value">
                {sale && parseCartPrice(Number(sale.totalPrice))}
              </h2>
            </div>

            {sale && sale.status === 'Pendente' && (
              <div className="buttonsContainer">
                <button
                  type="button"
                  data-testid="mark-as-prepared-btn"
                  onClick={ setAsPreparing }
                >
                  Preparar pedido
                </button>
                <button
                  type="button"
                  data-testid="mark-as-delivered-btn"
                  onClick={ fullfilOrder }
                >
                  Marcar como entregue
                </button>
              </div>
            )}

            {sale && sale.status === 'Preparando' && (
              <div className="buttonsContainer">
                <button
                  type="button"
                  data-testid="mark-as-delivered-btn"
                  onClick={ fullfilOrder }
                >
                  Marcar como entregue
                </button>
              </div>
            )}

          </>
        )}
      </div>
      <div className="backButtonContainer">
        <button className="backButton" onClick={() => history.goBack()}>Voltar</button>
      </div>
    </div>
  );
}

AdminOrdersDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,  
    }).isRequired,
  }).isRequired,
};
