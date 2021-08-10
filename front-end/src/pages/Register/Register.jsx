import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import { register, registerOnMongo } from '../../services/Users';
import { validateEmail, validatePassword, validateName } from '../../utils/validations';
import './Register.scss';
import loadingGif from '../../assets/gifs/loading.gif';

const inputComponents = [
  {
    title: 'Nome',
    type: 'text',
    testId: 'signup-name',
    placeholder: 'Nome',
  },
  {
    title: 'Email',
    type: 'text',
    testId: 'signup-email',
    placeholder: 'Email',
  },
  {
    title: 'Senha',
    type: 'password',
    testId: 'signup-password',
    placeholder: 'Senha',
  },
];

const setStateSwitch = ({ field, value, setEmail, setPassword, setName }) => {
  if (field === 'Email') return setEmail(value);
  if (field === 'Nome') return setName(value);
  return setPassword(value);
};

export default function Register() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [fetchEmail, setFetchEmail] = useState('');
  const [loading, setLoading] = useState('');
  const history = useHistory();
  useEffect(() => {
    if (validateEmail(email) && validatePassword(password) && validateName(name)) {
      setIsDisabled(false);
    }
  }, [email, password, name]);
  const setField = (field, value) => {
    setStateSwitch({ field, value, setEmail, setPassword, setName });
  };
  const inputValues = [name, email, password];

  const registerRedirect = async (
    { name, email, password, isSeller, history },
    setFetchEmail) => {
    setLoading(true);
    const role = isSeller ? 'administrator' : 'client';
    const result = await register(name, email, password, role);
    console.log(result)

    // Cadastra no MongoDB
    await registerOnMongo(name, email, role);

    if (result.message) return setFetchEmail(result.message);
    localStorage.setItem('user', JSON.stringify(result));
    if (result.role === 'administrator') return history.push('/admin/orders');
    if (result.role === 'client') return history.push('/products');
    return null;
  };

  return (
    <div>
      {(loading)
        ? (
          <img src={ loadingGif } className="loading-gif" alt="loading" />
        )
        : (
          <div className="register-bg">
            <form className="register-inputs">
              {inputComponents.map((component, index) => (
                <Input
                  key={ index }
                  title={ component.title }
                  type={ component.type }
                  testId={ component.testId }
                  placeholder={ component.placeholder }
                  value={ inputValues[index] }
                  onChange={ setField }
                />
              ))}
              <Checkbox class="is-seller" isSeller={ isSeller } setIsSeller={ setIsSeller } />
              <Button
                title="Cadastrar"
                testId="signup-btn"
                isDisabled={ isDisabled }
                onClick={ () => registerRedirect(
                  { name, email, password, isSeller, history },
                  setFetchEmail,
                ) }
              />
              <Button
                title="Voltar"
                className="cancelRegister"
                onClick={history.goBack}
              >
                Voltar
              </Button>
              {fetchEmail && (<div>{fetchEmail}</div>)}
            </form>
          </div>
        )}
    </div>
  );
}
