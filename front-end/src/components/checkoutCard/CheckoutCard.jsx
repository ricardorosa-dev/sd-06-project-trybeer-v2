import React from 'react';
import PropTypes from 'prop-types';
import './CheckoutCard.scss';

const deleteProduct = (product, changeState) => {
  const storage = JSON.parse(localStorage.getItem('cart'));
  const myItem = storage.find((item) => item.id === product.id);
  storage.splice(storage.findIndex((item) => item.id === myItem.id), 1);
  localStorage.setItem('cart', JSON.stringify(storage));

  changeState(JSON.parse(localStorage.getItem('cart')));
  return product;
};

const CheckoutCard = ({ product, changeState, specialNumber }) => {
  const { quantity, name, price } = product;
  const editPrice = `R$ ${price.toString().replace('.', ',')}`;
  const fullPrice = (price * quantity).toFixed(2);
  const editFullPrice = `R$ ${fullPrice.toString().replace('.', ',')}`;

  return (
    <tr>
      <td data-testid={ `${specialNumber}-product-qtd-input` }>
        {quantity}
      </td>
      <td data-testid={ `${specialNumber}-product-name` }>
      {name}
      </td>
      <td data-testid={ `${specialNumber}-product-total-value` }>
        { editFullPrice }
      </td>
      <td data-testid={ `${specialNumber}-product-unit-price` }>
        {`(${editPrice} un)`}
      </td>
      <td>
        <button
          data-testid={ `${specialNumber}-removal-button` }
          type="button"
          onClick={ () => deleteProduct(product, changeState) }
        >
          {(window.screen.width > 600) ? 'EXCLUIR' : 'X' }
        </button>
      </td>
      </tr>
  );
};

CheckoutCard.propTypes = {
  product: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  changeState: PropTypes.func.isRequired,
  specialNumber: PropTypes.number.isRequired,
};

export default CheckoutCard;
