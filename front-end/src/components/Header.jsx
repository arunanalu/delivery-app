import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import './styles/header.css';

export default function Header() {
  const history = useHistory();
  const [user] = useLocalStorage('user', {});

  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push('/'); // verificar
  };

  return (
    <nav className="nav-bar-header">
      <div className="container-nav-bar-products">
        <Link
          data-testid="customer_products__element-navbar-link-products"
          className="nav-bar-products"
          to={ `/${user.role}/products` }
        >
          PRODUTOS
        </Link>
      </div>
      <div className="container-nav-bar-orders">
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          className="nav-bar-orders"
          to={ `/${user.role}/orders` }
        >
          MEUS PEDIDOS
        </Link>
      </div>
      <div className="container-nav-bar-user">
        <h1
          className="nav-bar-user"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {user.name}

        </h1>
      </div>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        className="nav-bar-logout"
        onClick={ handleLogout }
      >
        Sair
      </button>
    </nav>
  );
}
