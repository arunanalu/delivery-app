import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { user } from '../app/slices/userSlice';
import '../styles/nav-bar.css';

export default function Header() {
  const history = useHistory();

  const handleLogout = async () => {
    await localStorage.removeItem('authentication');
    history.push('/'); // verificar
  };

  return (
    <nav className="nav-bar-header">
      <div className="container-nav-bar">
        <Link
          data-testid="customer_products__element-navbar-link-products"
          className="nav-bar-products"
          to="/products" // verificar
        >
          PRODUTOS
        </Link>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          className="nav-bar-orders"
          to="/orderders" // verificar
        >
          MEUS PEDIDOS

        </Link>
      </div>
      <div className="container-nav-bar">
        <h1
          className="nav-bar-user"
        >
          {user.name}

        </h1>
        <button
          type="button"
          className="nav-bar-logout"
          onClick={ async () => handleLogout() }
        >
          Sair

        </button>

      </div>

    </nav>
  );
}
