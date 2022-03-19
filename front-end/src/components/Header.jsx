import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeAllFromCart, updateTotal } from '../app/slices/cartSlice';
import useLocalStorage from '../hooks/useLocalStorage';

import './styles/header.css';

export default function Header({ isSeller, isAdmin }) {
  const history = useHistory();
  const [user] = useLocalStorage('user', {});
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    dispatch(removeAllFromCart());
    dispatch(updateTotal());
    history.push('/'); // verificar
  };

  const productsAndOrders = () => (
    <>
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
    </>
  );

  const sellerOrders = () => (
    <div className="container-nav-bar-orders">
      <Link
        className="nav-bar-products"
        to={ `/${user.role}/orders` }
      >
        PEDIDOS
      </Link>
    </div>
  );

  const admin = () => (
    <p />
  );

  const sellerOrCostumer = () => (isSeller ? sellerOrders() : productsAndOrders());

  return (
    <nav className="nav-bar-header">
      { isAdmin ? admin() : sellerOrCostumer() }
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
        SAIR
      </button>
    </nav>
  );
}

Header.propTypes = {
  isSeller: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

Header.defaultProps = {
  isSeller: undefined,
  isAdmin: undefined,
};
