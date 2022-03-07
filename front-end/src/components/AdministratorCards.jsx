import React from 'react';
import { useSelector } from 'react-redux';

export default function AdministratorCards() {
  const data = useSelector(({ user }) => user.users);
  return (
    <div>
      {data.length !== 0 && data.map(({
        id, name, email, role,
      }, index) => (
        <div key={ index }>
          <span
            data-testid={ `admin_manage__element-user-table-item-number-${index}` }
          >
            {id}
          </span>
          <span
            data-testid={ `admin_manage__element-user-table-name-${index}` }
          >
            {name}
          </span>
          <span
            data-testid={ `admin_manage__element-user-table-email-${index}` }
          >
            {email}
          </span>
          <span
            data-testid={ `admin_manage__element-user-table-role-${index}` }
          >
            {role}
          </span>
          <button
            type="button"
            data-testid={ `admin_manage__element-user-table-remove-${index}` }
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}
