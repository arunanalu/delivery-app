import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function Table({
  columns,
  items,
  onClick,
  testIdNumber,
  testIdName,
  testIdQuantity,
  testIdUnitPrice,
  testIdSubTotal,
  testIdRemove,
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
                data-testid={ `${testIdNumber}${index}` }
              >
                {index + 1}

              </td>
              <td
                data-testid={ `${testIdName}${index}` }
              >
                {product.name}

              </td>
              <td
                data-testid={ `${testIdQuantity}${index}` }
              >
                {product.quantity}

              </td>
              <td
                data-testid={ `${testIdUnitPrice}${index}` }
              >
                {product.price}

              </td>
              <td
                data-testid={ `${testIdSubTotal}${index}` }
              >
                {product.quantity * product.price}

              </td>
              <Button
                label="Remover"
                onClick={ onClick }
                testid={ `${testIdRemove}${index}` }
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
  testIdSubTotal: PropTypes.string.isRequired,
  testIdRemove: PropTypes.string.isRequired,
};

export default Table;
