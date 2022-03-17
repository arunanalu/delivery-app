import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getSaleById } from '../services/calls';

export default function SellerOrdersDetails() {
  const [orderDetails, setOrderDetails] = useState(undefined);
  const { id: idParamPage } = useParams();
  useEffect(() => {
    const idToNumber = Number(idParamPage);
    const user = localStorage.getItem('user');
    const userToJs = JSON.parse(user);
    getSaleById(idToNumber, userToJs.token).then(({ data }) => setOrderDetails(data));
  }, [idParamPage]);
  if (!orderDetails) return <p>não possui produtos</p>;
  const date = new Date(orderDetails.saleDate);
  return (
    <div>
      <Header />
      <h1>Detalhes pedidos</h1>
      <label
        htmlFor="asdsad"
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {orderDetails.id}
      </label>
      <div data-testid="seller_order_details__element-order-details-label-order-date">
        {`${date.toLocaleDateString('pt-br', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}`}
      </div>
      <label
        htmlFor="sddsf"
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {orderDetails.status}
      </label>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled
      >
        Saiu para entrega
      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
      >
        Preparar pedido
      </button>

      <p data-testid="seller_order_details__element-order-total-price">
        {orderDetails.totalPrice.replace('.', ',')}
      </p>

      {orderDetails.products.map(({ id, name, price, quantity }, i) => (
        <div key={ i }>
          <p
            data-testid={ `seller_order_details__element-order-table-item-number-${i}` }
          >
            {`id: ${id}`}
          </p>
          <p
            data-testid={ `seller_order_details__element-order-table-name-${i}` }
          >
            {`name: ${name}`}
          </p>
          <p
            data-testid={ `seller_order_details__element-order-table-quantity-${i} ` }
          >
            {`quantity: ${quantity}`}
          </p>
          <p
            data-testid={ `seller_order_details__element-order-table-unit-price-${i}` }
          >
            {`price: ${price}`}
          </p>
          <p
            data-testid={ `seller_order_details__element-order-table-sub-total-${i}` }
          >
            {`subtotal: ${Number(quantity * price)}`}
          </p>
        </div>
      ))}
    </div>
  );
}
