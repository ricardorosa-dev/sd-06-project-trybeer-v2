import { parseCartPrice } from '../../utils/parseValues';

export const getCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart;
};

export const getFullCartPrice = () => {
  const oldStorage = getCart();
  if (!oldStorage || !oldStorage.length) return 0;
  const prices = oldStorage.map((product) => ({
    price: product.price,
    quantity: product.quantity,
  }));
  let sum = 0;
  prices.forEach((product) => {
    const productSum = product.price * product.quantity;
    sum += productSum;
  });
  return parseCartPrice(sum);
};
