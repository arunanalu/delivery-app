/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { login } from '../services/calls';
import { validLoginForm } from '../utils/validations/schemas';
import logo from '../images/BEBIDAS.png';
import './styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const [user] = useLocalStorage('user', false);

  const isFormInvalid = () => {
    const { error } = validLoginForm.validate({ email, password });
    return error;
  };

  const handleButtonClick = async () => {
    try {
      const response = await login({ email, password });
      await localStorage.setItem('user', JSON.stringify({ ...response.data }));
      switch (response.data.role) {
      case 'seller':
        history.push(`${response.data.role}/orders`);
        break;
      case 'customer':
        history.push(`${response.data.role}/products`);
        break;
      case 'administrator':
        history.push('admin/manage');
        break;
      default:
        break;
      }
    } catch (error) {
      setErrorMessage(error);
      setShowErrorMessage(true);
    }
  };

  if (user) return <Redirect to="customer/products" />;

  return (
    <main className="container-login">
      <div className="logo">
        <img src={ logo } alt="logo bebidas express" width="200px" />
        {/* <h1>Group 2</h1> */}
      </div>
      <div className="container_login_inputs">
        <div className="inputs">
          <div className="login_label">
            <label htmlFor="username">
              Login
            </label>
          </div>
          <input
            data-testid="common_login__input-email"
            name="username"
            type="text"
            id="username"
            minLength="4"
            onChange={ (e) => setEmail(e.target.value) }
            className="input-login"
            required
          />
        </div>
        <div className="inputs">
          <div className="login_label">
            <label htmlFor="password">
              Senha
            </label>
          </div>
          <input
            data-testid="common_login__input-password"
            name="password"
            type="password"
            minLength="4"
            onChange={ (e) => setPassword(e.target.value) }
            className="input-login"
            required
          />
        </div>

        <button
          data-testid="common_login__button-login"
          className="modal_button-login"
          type="button"
          disabled={ isFormInvalid() }
          onClick={ handleButtonClick }
        >
          Login
        </button>

        <button
          data-testid="common_login__button-register"
          type="button"
          className="button-register"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>

      </div>
      {showErrorMessage && (
        <span data-testid="common_login__element-invalid-email">
          {errorMessage}
        </span>
      )}
    </main>
  );
}
