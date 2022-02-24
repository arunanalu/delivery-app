import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function Table({
  columns, items, onClick, testIdNumber, testIdName, testIdQuantity, testIdUnitPrice,
}) {
  return (
    <table className="items">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={ index }>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? 'Seu carrinho está vazio'
          : items.map((product, index) => (
            <tr key={ product.id }>
              <td
                data-testid={ testIdNumber }
              >
                {index + 1}

              </td>
              <td
                data-testid={ testIdName }
              >
                {product.name}

              </td>
              <td
                data-testid={ testIdQuantity }
              >
                {product.quantity}

              </td>
              <td
                data-testid={ testIdUnitPrice }
              >
                {product.price}

              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {product.quantity * product.price}

              </td>
              <Button
                label="Remover"
                onClick={ onClick }
                testid={
                  `customer_checkout__element-order-table-remove-${index}`
                }
              />

            </tr>
          ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  testIdNumber: PropTypes.string.isRequired,
  testIdName: PropTypes.string.isRequired,
  testIdQuantity: PropTypes.string.isRequired,
  testIdUnitPrice: PropTypes.string.isRequired,
};

export default Table;
