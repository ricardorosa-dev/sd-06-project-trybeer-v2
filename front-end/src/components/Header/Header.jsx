import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';
import './hamburgers.css';
import { getFullCartPrice } from '../../store/LocalStorage/provider';

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

export default function Header({ title, user }) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerCartSum, setHeaderCartSum] = useState(getFullCartPrice());

  const history = useHistory();
  const options = user === 'client' ? [...clientOptions] : [...adminOptions];

  return (
      <div className="header">
            <button
              type="button"
              className="menu-btn hamburger hamburger--squeeze"
              data-testid="top-hamburguer"
              onClick={ () => {
                const menu = document.querySelector('.side-menu-container');
                menu.classList.toggle('active');
              } }
            >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
            </button>
        <h1 className="title" data-testid="top-title">
          { title }
        </h1>
            <aside className="side-menu-container">
              <ul>
                {options.map(({ name, redirect, testId }) => (
                  <li key={ name }>
                    <button
                      className="menu-item"
                      type="button"
                      onClick={ () => {
                          setHeaderCartSum(getFullCartPrice());
                          history.push({
                            pathname: `${redirect}`,
                            state: { sum: headerCartSum },
                          });
                        }
                      }
                      data-testid={ testId }
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
      </div>
    );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,

};
