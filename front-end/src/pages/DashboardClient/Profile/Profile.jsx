import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Input from '../../../components/Input/Input';
import { updateUser } from '../../../services/Users';
import { updateName, verifyUser } from '../../../store/LocalStorage/actions';
import './Profile.scss';

const handleSaveButton = async ({
  userName,
  email,
  setUserNameInStorage,
  setIsUpdated,
}) => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const { token } = storage;
  await updateUser(userName, email, token);
  updateName(userName);
  setUserNameInStorage(userName);
  setIsUpdated(true);
};

export default function Profile() {
  const [userName, setUserName] = useState(); // -> lenadro parisi carvalho
  const [userEmail, setUserEmail] = useState();
  const [userNameInStorage, setUserNameInStorage] = useState(); // -> lenadro parisi
  const [isUpdated, setIsUpdated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const { name, email } = verifyUser(history);
    setUserName(name);
    setUserEmail(email);
    setUserNameInStorage(name);
  }, [history]);

  const setField = (field, value) => {
    if (field === 'Name') return setUserName(value);
  };

  const buttonClickPayload = { userName, userEmail, setUserNameInStorage, setIsUpdated };
  return (
    <div>
      <Header title="Meu perfil" user="client" />
      <form className="profileForm">
        <h2>Editar o nome:</h2>
        <Input
          title="Name"
          value={ userName }
          testId="profile-name-input"
          onChange={ setField }
        />
        <Input
          className="disabledButton"
          title="Email"
          value={ userEmail }
          testId="profile-email-input"
          isReadOnly
        />
        <button
          data-testid="profile-save-btn"
          type="button"
          disabled={ userName === userNameInStorage }
          onClick={ () => handleSaveButton(buttonClickPayload) }
        >
          Salvar
        </button>
        {isUpdated && 'Atualização concluída com sucesso'}
      </form>
    </div>
  );
}
