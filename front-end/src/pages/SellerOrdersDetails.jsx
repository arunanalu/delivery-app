import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getSaleById, updateStatus } from '../services/calls';
import { useQuery } from 'react-query';
import useLocalStorage from '../hooks/useLocalStorage';

export default function SellerOrdersDetails() {
  const { id: idParamPage } = useParams();
  const [user] = useLocalStorage('user', {});

  const { data, refetch } = useQuery('sellerOrderDetails', async () => {
    const result = await getSaleById(idParamPage, user.token);
    return result.data;
  });

  const setShipped = async () => {
    await updateStatus(idParamPage, {status: "Em trânsito"},user.token )
    refetch();
  }
  
  const setPreparing = async() => {
    await updateStatus(idParamPage, {status: "Preparando"},user.token )
    refetch();
  }
  
  if (!data) return <p>não possui produtos</p>;
  console.log(data.products[0].salesProduct.quantity)
  const date = new Date(data.saleDate);
  return (
    <div>
      <Header />
      <h1>Detalhes pedidos</h1>
      <label
        htmlFor="asdsad"
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {data.id}
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
        {data.status}
      </label>
      <button
        onClick={setShipped}
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled={data.status !== "Preparando"}
      >
        Saiu para entrega
      </button>
      <button
        type="button"
        onClick={setPreparing}
        data-testid="seller_order_details__button-preparing-check"
        disabled={data.status !== "Pendente"}
      >
        Preparar pedido
      </button>

      <p data-testid="seller_order_details__element-order-total-price">
        {data.totalPrice.replace('.', ',')}
      </p>

      {data.products.map(({ id, name, price, salesProduct }, i) => (
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
            {`quantity: ${salesProduct.quantity}`}
          </p>
          <p
            data-testid={ `seller_order_details__element-order-table-unit-price-${i}` }
          >
            {`price: ${price}`}
          </p>
          <p
            data-testid={ `seller_order_details__element-order-table-sub-total-${i}` }
          >
            {`subtotal: ${Number(salesProduct.quantity * price).toFixed(2)}`}
          </p>
        </div>
      ))}
    </div>
  );
}
