import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/Users';
import logoVerde from '../../assets/logos/logoVerde_limpa.png';
import './Login.scss';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { validateEmail, validatePassword } from '../../utils/validations';

const userRedirect = async (email, password, history) => {
  const result = await login(email, password);
  if (result.message) return console.log(result.message);
  localStorage.setItem('user', JSON.stringify(result));
  if (result.role === 'administrator') return history.push('/admin/orders');
  if (result.role === 'client') return history.push('/products');
  return null;
};

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const setField = (field, value) => {
    if (field === 'Email') return setEmail(value);
    return setPassword(value);
  };
  return (
    <>
      <div className="overlay" />
      <div className="entrance" />
      <section className="defaultPage">
        <form className="loginForm">
          <img src={ logoVerde } width="150px" className="logo" alt="logo" />
          <section className="loginInputs">
            <Input
              title="Email"
              type="text"
              testId="email-input"
              value={ email }
              onChange={ setField }
              placeholder="Email"
              autocomplete="on"
            />
            <Input
              title="Senha"
              type="password"
              testId="password-input"
              value={ password }
              onChange={ setField }
              placeholder="Senha"
              autocomplete="on"
            />
          </section>
          <section className="loginButtons">
            <Button
              title="ENTRAR"
              testId="signin-btn"
              isDisabled={ isDisabled }
              onClick={ () => userRedirect(email, password, history) }
              className="golden"
            />
            <Button
              title="CRIAR CONTA"
              testId="no-account-btn"
              onClick={ () => history.push('/register') }
            />
          </section>
        </form>
      </section>
    </>
  );
}
