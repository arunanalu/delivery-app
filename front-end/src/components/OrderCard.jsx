import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/orderCard.css';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  const history = useHistory();
  return (
    <div
      onClick={ () => history.push(`orders/${id}`) }
      className="order-card"
      aria-hidden="true"
    >
      <div className="order-card__number-container">
        <h1>Pedido</h1>
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {id}
        </span>
      </div>
      <h3
        className="order-card__status"
        data-testid={ `customer_orders__element-delivery-status-${id}` }
      >
        {status}
      </h3>
      <div
        className="order-card__date-price-container"
      >
        <h3
          data-testid={ `customer_orders__element-order-date-${id}` }
          className="order-card__date"
        >
          {`${saleDate.toLocaleDateString('pt-br',
            { year: 'numeric', month: '2-digit', day: '2-digit' })
          }`}
        </h3>
        <h3
          data-testid={ `customer_orders__element-card-price-${id}` }
          className="order-card__price"
        >
          {`R$ ${totalPrice.replace('.', ',')}`}
        </h3>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
  saleDate: PropTypes.instanceOf(Date),
}.isRequired;
