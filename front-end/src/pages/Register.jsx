import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { registerUser } from '../services/calls';
import { validRegisterForm } from '../utils/validations/schemas';
import './styles/register.css';

export default function Register() {
  const [name, setUserInput] = useState('');
  const [password, setPasswordInput] = useState('');
  const [email, setEmailInput] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  console.log(errorMessage);

  const handleButtonClick = async () => {
    try {
      const response = await registerUser({ email, password, name });
      await localStorage.setItem('user', JSON.stringify({ ...response.data }));
      history.push('customer/products');
    } catch (error) {
      setErrorMessage(error);
      setShowErrorMessage(true);
    }
  };
  const isFormValid = () => {
    const { error } = validRegisterForm.validate({
      email,
      password,
      name,
    });
    return !error;
  };

  return (
    <main className="container-register">
      <h1>Cadastro</h1>
      <form className="form-register">
        <section className="container_register_inputs">
          <FormInput
            labelText="Email"
            type="email"
            name="email"
            value={ email }
            changeHandler={ setEmailInput }
            page="register"
          />
          <FormInput
            labelText="Password"
            type="password"
            name="password"
            value={ password }
            changeHandler={ setPasswordInput }
            page="register"
          />
          <FormInput
            labelText="User"
            type="text"
            name="name"
            value={ name }
            changeHandler={ setUserInput }
            page="register"
          />
        </section>
        <section className="container_register_buttons">
          <button
            type="button"
            disabled={ !isFormValid() }
            onClick={ handleButtonClick }
            data-testid="common_register__button-register"
            className={ `registrar-btn ${
              !isFormValid() ? 'disable' : 'enable'
            }` }
          >
            CADASTRAR
          </button>
        </section>
      </form>
      {showErrorMessage && (
        <span data-testid="common_register__element-invalid_register">
          {errorMessage}
        </span>
      )}
    </main>
  );
}
