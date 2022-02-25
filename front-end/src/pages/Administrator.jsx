import React, { useState } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { validRegisterForm } from '../utils/validations/schemas';

export default function Administrator() {
  const roles = ['Vendedor', 'Comprador'];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const isFormValid = () => {
    const { error } = validRegisterForm.validate({
      email,
      password,
      name,
    });
    return !error;
  };
  return (
    <div style={ { display: 'flex' } }>
      <Input
        type="text"
        label="Name"
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
      />
    </div>
  );
}
