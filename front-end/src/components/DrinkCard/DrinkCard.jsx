import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseCartPrice } from '../../utils/parseValues';
import { addItem, subtractItem, setCart } from '../../store/LocalStorage/actions';
import { getCart, getFullCartPrice } from '../../store/LocalStorage/provider';
import { NINETEEN } from '../../services/magicNumbers';
import './drinkCard.scss';

const syncStorageWithCart = (cartItem, id) => {
  const date = (new Date()).toISOString().slice(0, NINETEEN)
      .replace(/-/g, '/')
      .replace('T', ' ');
  const newCartItem = { ...cartItem, default_product: false, saleDate: date };
  const oldStorage = getCart();
  let newStorage = [];
  if (newCartItem) {
    if (!oldStorage) {
      newStorage = [{ ...newCartItem }];
      return setCart(newStorage);
    }
    const isItemInCart = oldStorage.filter((product) => product.id === id).length;
    if (!isItemInCart) {
      newStorage = [...oldStorage, { ...newCartItem }];
      return setCart(newStorage);
    }
    if (isItemInCart) {
      const oldStorageWithoutItem = oldStorage.filter((product) => product.id !== id);
      if (newCartItem.quantity === 0) {
        return setCart(oldStorageWithoutItem);
      }
      newStorage = [...oldStorageWithoutItem, { ...newCartItem }];
      return setCart(newStorage);
    }
  }
};

const getItemInStorage = (urlImage, name, price, id) => {
  const cart = getCart();
  const product = { id, name, price, quantity: 0, urlImage, default_product: true };

  if (!cart) return product;

  if (cart) {
    const result = cart.find((item) => item.id === id);

    if (!result) return product;

    return result;
  }
};

export default function DrinkCard({ product, index, setCartSum }) {
  const { urlImage, name, price, id } = product;
  const [cartItem, setCartItem] = useState(getItemInStorage(urlImage, name, price, id));

  useEffect(() => {
    if (!cartItem.default_product) {
      syncStorageWithCart(cartItem, id);
      setCartSum(getFullCartPrice());
    }
  }, [cartItem, id, setCartSum]);

  return (
    <div className="productCard">
      <p
        className="price-tag"
        data-testid={ `${index}-product-price` }
      >
        {parseCartPrice(price)}
      </p>
      <div className="imageAndButtons">
        <button
            type="button"
            className="plus-button"
            data-testid={ `${index}-product-plus` }
            onClick={ () => addItem(cartItem, setCartItem) }
          >
            +
          </button>
          
          <div className="imageContainer">
            <img
            // className="card-img"
            data-testid={ `${index}-product-img` }
            alt={ `${name} product card` }
            src={ urlImage }
            />
          </div>
        
        <button
            type="button"
            className="minus-button"
            data-testid={ `${index}-product-minus` }
            onClick={ () => subtractItem(cartItem, setCartItem) }
          >
            &#8722;
          </button>
      </div>
      
      <p className="name-tag" data-testid={ `${index}-product-name` }>{name}</p>
      <div>
        <div className="quantity-tag" data-testid={ `${index}-product-qtd` }>
          {`Quantidade: ${cartItem.quantity}`}
        </div>
      </div>

    </div>
  );
}

DrinkCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
  setCartSum: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
