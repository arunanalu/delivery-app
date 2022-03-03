import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  const history = useHistory();
  return (
    <div
      onClick={ () => history.push(`orders/${id}`) }
      className="order-card"
      aria-hidden="true"
    >
      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        {id}
      </p>
      <h3 data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </h3>
      <h3 data-testid={ `customer_orders__element-order-date-${id}` }>
        {`${saleDate.toLocaleDateString()}`}
      </h3>
      <p data-testid={ `customer_orders__element-card-price-${id}` }>
        {totalPrice.replace('.', ',')}
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
  saleDate: PropTypes.instanceOf(Date),
}.isRequired;
