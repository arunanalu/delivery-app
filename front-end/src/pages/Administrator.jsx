import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { validRegisterForm } from '../utils/validations/schemas';
import { addUser, getAllUsersOnLoad } from '../app/slices/userSlice';
import { getAllUsers, postUserAdm } from '../services/calls';

export default function Administrator() {
  const roles = ['seller', 'customer'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [tokenInit, setTokenInit] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const fetchAndSetToken = useCallback(async () => {
    const user = localStorage.getItem('user');
    const { token } = JSON.parse(user);
    setTokenInit(token);
    const { data } = await getAllUsers(tokenInit);
    dispatch(getAllUsersOnLoad(data));
  }, [dispatch, tokenInit]);

  useEffect(() => {
    fetchAndSetToken();
  }, [fetchAndSetToken]);

  const isFormValid = () => {
    const { error } = validRegisterForm.validate({
      email,
      password,
      name,
    });
    return !error;
  };

  const onClicAddUser = async () => {
    try {
      const user = {
        role,
        name,
        email,
        password,
      };
      console.log(tokenInit);
      await postUserAdm(tokenInit, user);
      dispatch(addUser(user));
    } catch (error) {
      setErrorMessage(error);
      setShowErrorMessage(true);
    }
  };

  return (
    <div style={ { display: 'flex' } }>
      <Input
        type="text"
        label="Namee"
        onChange={ ({ target }) => setName(target.value) }
        value={ name }
        testid="admin_manage__input-name"
      />
      <Input
        type="text"
        label="Email"
        onChange={ ({ target }) => setEmail(target.value) }
        value={ email }
        testid="admin_manage__input-email"
        id="admin_manage__input-email"
      />
      <Input
        type="text"
        label="Senha"
        onChange={ ({ target }) => setPassword(target.value) }
        value={ password }
        testid="admin_manage__input-password"
        id="admin_manage__input-password"
      />
      <Select
        testid="admin_manage__select-role"
        onChange={ ({ target }) => setRole(target.value) }
        label="Tipo"
        value={ role }
        options={ roles }
      />
      <Button
        testid="admin_manage__button-register"
        label="Cadastrar"
        disabled={ !isFormValid() }
        onClick={ onClicAddUser }
      />
      {showErrorMessage && (
        <span data-testid="admin_manage__element-invalid-register">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
