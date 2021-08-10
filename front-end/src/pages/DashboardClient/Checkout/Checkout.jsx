import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button/Button';
import { verifyUser } from '../../../store/LocalStorage/actions';
import { getCart } from '../../../store/LocalStorage/provider';
import { postSale } from '../../../services/Sales';
import CheckoutCard from '../../../components/checkoutCard/CheckoutCard';
import AddressForm from './AddressForm';
import { parseCartPrice } from '../../../utils/parseValues';
import { TWO_THOUSAND, NINETEEN } from '../../../services/magicNumbers';
import './Checkout.scss';

const Checkout = (props) => {
  const { location } = props;
  if (!location.state) location.state = 0;

  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || '');
  const [chkButton, setChkButton] = useState(true);
  const [chkForm, setChkForm] = useState({ st: '', num: '' });
  const [statusPedido] = useState('Pendente'); // ou Entregue
  const [mySum, setSum] = useState(location.state.sum || ' ');
  const [saleDone, setSaleDone] = useState(false);

  const history = useHistory();

  useEffect(() => {
    verifyUser(history);
  }, [history]);

  useEffect(() => {
    const sumNumber = Number(mySum.split(' ')[1].replace(',', '.'));
    if (chkForm.st.length && chkForm.num.length && sumNumber > 0) {
      setChkButton(false);
    } else {
      setChkButton(true);
    }
  }, [mySum, chkForm]);

  const handleChange = (input, e) => {
    setChkForm({ ...chkForm, [input]: e.target.value });
  };

  const changeState = (newState) => {
    setCart(newState);
    const newCart = JSON.parse(localStorage.getItem('cart'));
    let newValue = 0;
    // console.log(newCart);
    newCart.map((product) => {
      newValue += (Number(product.price) * product.quantity);
      return newValue;
    });
    setSum(parseCartPrice(newValue));
  };

  const makeSale = async () => {
    // console.log(user);
    const date = (new Date()).toISOString().slice(0, NINETEEN)
      .replace(/-/g, '/')
      .replace('T', ' ');
    const payload = {
      userId: user.id,
      totalPrice: Number(mySum.split(' ')[1].replace(',', '.')).toFixed(2),
      deliveryAddress: chkForm.st,
      deliveryNumber: chkForm.num,
      saleDate: date,
      status: statusPedido,
    };
    const products = getCart();
    const saleResponse = await postSale(user.token, payload, products);

    if (saleResponse.userId) {
      setSaleDone('Compra realizada com sucesso!');

      setTimeout(() => {
        localStorage.setItem('cart', '[]');
        return history.push('/products');
      }, TWO_THOUSAND);
    } else {
      setSaleDone(saleResponse);
    }
  };

  return (
    <div>
      {(saleDone)
        ? (
          <div className="saleDone">
            <h1>{saleDone}</h1>
          </div>
        )
        : (
          <div>
            <Header title="Carrinho" user="client" />
            {/* <h3>Produtos</h3> */}
            <div className="productsOnCart">
                {
                  (cart.length)
                    ? (
                      <table>
                        <thead>
                          <tr>
                            <th>Qtd.</th>
                            <th>Item</th>
                            <th>Preço total</th>
                            <th>Preço unit.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((product, index) => (
                            <CheckoutCard
                              product={ product }
                              changeState={ changeState }
                              key={ index }
                              specialNumber={ index }
                            />
                          ))}
                        </tbody>
                      </table>
                    )
                    : (
                    <div className="nothingOnCart">
                      <h2>Não há produtos no carrinho</h2>
                    </div>
                      )
                }
            </div>
            <div className="cartTotal" data-testid="order-total-value">
              Total: {mySum}
            </div>
            <div className="addressBox">
              <h2>Adicione um endereço</h2>
              <AddressForm handleChange={ handleChange } />
              <Button
                title="Finalizar pedido"
                isDisabled={ chkButton }
                testId="checkout-finish-btn"
                onClick={ () => makeSale() }
              />
            </div>
          </div>
        )}
    </div>
  );
};

Checkout.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      sum: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Checkout;
