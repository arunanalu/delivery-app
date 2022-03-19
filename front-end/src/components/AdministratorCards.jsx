import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { deleteUser } from '../services/calls';
import './styles/administratorCards.css';

export default function AdministratorCards({ attUsersFunc }) {
  const data = useSelector(({ user }) => user.users);
  const [user] = useLocalStorage('user');

  const fetchDeleteUser = async (id) => {
    await deleteUser(id, user.token);
    await attUsersFunc();
  };

  const categories = ['ID', 'Nome', 'Email', 'Tipo', 'Deletar'];

  return (
    <>
      {/* <div className="users-main-ct">
        {data.length !== 0 && data.map(({
          id, name, email, role,
        }, index) => (
          <div key={ index } className="users-ct">
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
              onClick={ () => fetchDeleteUser(id) }
            >
              Excluir
            </button>
          </div>
        ))}
      </div> */}
      <table className="users-main-ct">
        <tr className="users-titles">
          {
            categories.map((element) => (
              <th key={ element }>{element}</th>
            ))
          }
        </tr>
        {
          data.length !== 0 && data.map((userRegistered) => (
            <tr key={ userRegistered.id } className="users-lines">
              <td>{userRegistered.id}</td>
              <td>{userRegistered.name}</td>
              <td>{userRegistered.email}</td>
              <td>{userRegistered.role}</td>
              <td className="delete-user-ct-btn">
                <button
                  type="button"
                  className="delete-user-button"
                  onClick={ () => fetchDeleteUser(userRegistered.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        }
      </table>
    </>
  );
}

AdministratorCards.propTypes = {
  attUsersFunc: PropTypes.func.isRequired,
};
