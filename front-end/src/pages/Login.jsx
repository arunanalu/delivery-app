import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../services/calls';
import { validLoginForm } from '../utils/validations/schemas';
// import "./style/Login.scss";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const isFormInvalid = () => {
    const { error } = validLoginForm.validate({ email, password });
    return error;
  };

  const handleButtonClick = async () => {
    try {
      const response = await login({ email, password });
      await localStorage.setItem('user', JSON.stringify({ ...response.data }));
      console.log(response);
      switch (response.data.role) {
      case 'seller':
        history.push(`${response.data.role}/orders`);
        break;
      case 'customer':
        history.push(`${response.data.role}/products`);
        break;
      case 'administrator':
        history.push(`${response.data.role}/manage`);
        break;
      default:
        break;
      }
    } catch (error) {
      setErrorMessage(error);
      setShowErrorMessage(true);
    }
  };

  return (
    <main>
      <h1>Group 2</h1>
      <div className="container_login_inputs">
        <label className="login_label" htmlFor="username">
          Login:
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
        </label>
        <label className="modal-login_label" htmlFor="password">
          Senha:
          <input
            data-testid="common_login__input-password"
            name="password"
            type="password"
            minLength="4"
            onChange={ (e) => setPassword(e.target.value) }
            className="input-login"
            required
          />
        </label>
      </div>
      <div className="modal-login_buttons">
        <button
          data-testid="common_login__button-login"
          className="modal_button"
          type="button"
          disabled={ isFormInvalid() }
          onClick={ handleButtonClick }
        >
          Login
        </button>
        <Link to="/register">
          <button
            data-testid="common_login__button-register"
            type="button"
          >
            Ainda não tenho conta
          </button>
        </Link>
      </div>
      {showErrorMessage && (
        <span data-testid="common_login__element-invalid-email">
          {errorMessage}
        </span>
      )}
    </main>
  );
}
