import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { getProducts } from '../../services/Products';
import DrinkCard from '../../components/DrinkCard/DrinkCard';
import { verifyUser } from '../../store/LocalStorage/actions';
import { getFullCartPrice, getCart } from '../../store/LocalStorage/provider';
import './Products.scss';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cartSum, setCartSum] = useState(getFullCartPrice());

  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      verifyUser(history);
      const allProducts = await getProducts();
      await setProducts(allProducts);
    };
    fetchProducts();
  }, [history]);

  const handleRedirect = () => {
    history.push({
      pathname: '/checkout',
      state: { sum: cartSum },
    });
  };

  return (
    <div>
      <Header title="TryBeer" user="client" />
      <div className="productsContainer">
        <div className="productCards">
          {products.map((product, index) => (
            <DrinkCard
              product={ product }
              key={ product.id }
              index={ index }
              setCartSum={ setCartSum }
            />
          ))}
        </div>
        <button
          className="checkoutButton"
          data-testid="checkout-bottom-btn"
          onClick={ handleRedirect }
          type="button"
          disabled={ !getCart() || !getCart().length }
        >
          Ver Carrinho ({cartSum || 'R$ 0,00'})
        </button>
      </div>
    </div>
  );
}
