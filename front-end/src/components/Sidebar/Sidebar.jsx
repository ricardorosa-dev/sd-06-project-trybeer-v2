import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './sidebar.scss';

const clientOptions = [
  {
    name: 'Produtos',
    redirect: '/products',
    testId: 'side-menu-item-products',
  },
  {
    name: 'Meus Pedidos',
    redirect: '/orders',
    testId: 'side-menu-item-my-orders',
  },
  {
    name: 'Meu Perfil',
    redirect: '/profile',
    testId: 'side-menu-item-my-profile',
  },
  {
    name: 'Conversar com a loja',
    redirect: '/chat',
    testId: 'side-menu-chat',
  },
  {
    name: 'Sair',
    redirect: '/login',
    testId: 'side-menu-item-logout',
  },
];

const adminOptions = [
  {
    name: 'Pedidos',
    redirect: '/admin/orders',
    testId: 'side-menu-item-orders',
  },
  {
    name: 'Perfil',
    redirect: '/admin/profile',
    testId: 'side-menu-item-profile',
  },
  {
    name: 'Conversas',
    redirect: '/admin/chats',
    testId: 'side-menu-item-chat',
  },
  {
    name: 'Sair',
    redirect: '/login',
    testId: 'side-menu-item-logout',
  },
];

export default function Sidebar({ user }) {
  const history = useHistory();
  const options = user === 'client' ? [...clientOptions] : [...adminOptions];
  return (
    <aside className="side-menu-container">
      <ul>
        {options.map(({ name, redirect, testId }) => (
          <li key={ name }>
            <button
              type="button"
              onClick={ () => history.push(`${redirect}`) }
              data-testid={ testId }
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  user: PropTypes.string.isRequired,

};
