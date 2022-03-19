import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './styles/table.css';

function Table({
  columns,
  total,
  items,
  handleClick,
  testIdNumber,
  testIdTotal,
  testIdName,
  testIdQuantity,
  testIdUnitPrice,
  testIdSubTotal,
  testIdRemove,
  thereIsButton,
}) {
  return (
    <div
      className="c-table"
    >
      <table className="items">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={ index }>{column}</th>
            ))}
          </tr>
        </thead>
        {items.length === 0 ? (
          <h1
            className="empty-cart-message"
          >
            Seu carrinho está vazio
          </h1>
        ) : (
          <tbody>
            {items.map((product, index) => (
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
                  {product.quantity ? product.quantity : product.salesProduct.quantity}

                </td>
                <td
                  data-testid={ `${testIdUnitPrice}${index}` }
                >
                  {product.price.toString().replace('.', ',')}

                </td>
                <td
                  data-testid={ `${testIdSubTotal}${index}` }
                >
                  {(product.quantity
                    ? product.quantity * product.price
                    : product.salesProduct.quantity * product.price).toFixed(2).toString()
                    .replace('.', ',')}

                </td>
                {thereIsButton && (
                  <td>
                    <Button
                      label="Remover"
                      onClick={ () => handleClick(product.id) }
                      testid={ `${testIdRemove}${index}` }
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <p
        className="order-details__total"
        data-testid={ testIdTotal }
      >
        {`Total: R$ ${total}`}
      </p>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func,
  testIdNumber: PropTypes.string.isRequired,
  testIdTotal: PropTypes.string.isRequired,
  testIdName: PropTypes.string.isRequired,
  testIdQuantity: PropTypes.string.isRequired,
  testIdUnitPrice: PropTypes.string.isRequired,
  testIdSubTotal: PropTypes.string.isRequired,
  testIdRemove: PropTypes.string,
  thereIsButton: PropTypes.bool,
  total: PropTypes.string.isRequired,
};

Table.defaultProps = {
  testIdRemove: undefined,
  handleClick: undefined,
  thereIsButton: undefined,
};

export default Table;
