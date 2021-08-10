import React from 'react';
import PropTypes from 'prop-types';
import './AdminOrderCard.scss';
import capitalize from '../../utils/capitalize';

export default function AdminOrderCard({ sale, index }) {
  const {
    id,
    deliveryAddress,
    deliveryNumber,
    totalPrice,
    status,
  } = sale;
  return (
    <a className="adminOrderCard" href={ `/admin/orders/${id}` }>
      <h2
        data-testid={ `${index}-order-number` }
      >
        Pedido
        {' '}
        {id}
      </h2>
      <p
        data-testid={ `${index}-order-address` }
      >
        {`${deliveryAddress}, ${deliveryNumber}`}
      </p>
      <div>
        <span
          data-testid={ `${index}-order-total-value` }
        >
          R$
          {' '}
          {(totalPrice).replace('.', ',')}
        </span>
        <span
          className={
            `itemStatus ${status === 'pendente' ? 'itemPending' : 'itemDelivered'}`
          }
          data-testid={ `${index}-order-status` }
        >
          {capitalize(status)}
        </span>
      </div>
    </a>
  );
}

// AdminOrderCard.propTypes = {
//   index: PropTypes.number.isRequired,
//   deliveryAddress: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   deliveryNumber: PropTypes.string.isRequired,
//   totalPrice: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
// };

AdminOrderCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
