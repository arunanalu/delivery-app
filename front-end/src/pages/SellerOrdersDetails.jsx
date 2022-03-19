import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Header from '../components/Header';
import { getSaleById, updateStatus } from '../services/calls';
import useLocalStorage from '../hooks/useLocalStorage';
import Table from '../components/Table';

export default function SellerOrdersDetails() {
  const { id: idParamPage } = useParams();
  const [user] = useLocalStorage('user', {});

  const { data, refetch } = useQuery('sellerOrderDetails', async () => {
    const result = await getSaleById(idParamPage, user.token);
    return result.data;
  });

  const setShipped = async () => {
    await updateStatus(idParamPage, { status: 'Em trânsito' }, user.token);
    refetch();
  };

  const setPreparing = async () => {
    await updateStatus(idParamPage, { status: 'Preparando' }, user.token);
    refetch();
  };

  const columns = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

  if (!data) return <p>não possui produtos</p>;
  // console.log(data.products[0].salesProduct.quantity);
  // console.log(data);
  const date = new Date(data.saleDate);
  return (
    <div>
      <Header isSeller />
      {/* <h1>Detalhes pedidos</h1>
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
      <div>
        {
          `Endereço: ${data.deliveryAddress}`
        }
        <br />
        {
          `Número: ${data.deliveryNumber}`
        }
      </div>
      <label
        htmlFor="sddsf"
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {data.status}
      </label>
      <button
        onClick={ setShipped }
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        disabled={ data.status !== 'Preparando' }
      >
        Saiu para entrega
      </button>
      <button
        type="button"
        onClick={ setPreparing }
        data-testid="seller_order_details__button-preparing-check"
        disabled={ data.status !== 'Pendente' }
      >
        Preparar pedido
      </button>

      <p data-testid="seller_order_details__element-order-total-price">
        {data.totalPrice.replace('.', ',')}
      </p> */}
      {/*
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
      ))} */}
      <div
        className="c-order-details"
      >
        <h1 className="order-details__page-title">Detalhe do Pedido</h1>
        <main className="main-order-details">
          <div
            className="order-details__header"
          >
            <p
              className="order-details__order-id"
            >
              {`PEDIDO ${data.id}`}
            </p>
            <p>
              P. Vend: Fulana Pereira
            </p>
            <p
              className="order-details__date"
            >
              {`${date.toLocaleDateString('pt-br', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}`}
            </p>
            <p
              className="order-details__status"
            >
              {data.status}

            </p>
            <button
              onClick={ setShipped }
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              disabled={ data.status !== 'Preparando' }
              className="order-details__shipped-btn"
            >
              Saiu para entrega
            </button>
            <button
              type="button"
              onClick={ setPreparing }
              data-testid="seller_order_details__button-preparing-check"
              disabled={ data.status !== 'Pendente' }
              className="order-details__shipped-btn"
            >
              Preparar pedido
            </button>
          </div>
          <div className="order-details__address">
            <p>
              ENDEREÇO:
            </p>
            <p>
              {`${data.deliveryAddress}, número: ${data.deliveryNumber}`}
            </p>
          </div>
          <Table
            columns={ columns }
            total={ data.totalPrice.toString().replace('.', ',') }
            items={ data.products }
            testIdNumber="customer_order_details__element-order-table-item-number-"
            testIdName="customer_order_details__element-order-table-name-"
            testIdQuantity="customer_order_details__element-order-table-quantity-"
            testIdUnitPrice="customer_order_details__element-order-table-unit-price-"
            testIdSubTotal="customer_order_details__element-order-table-sub-total-"
            testIdTotal="customer_order_details__element-order-total-price"
            thereIsButton={ false }
          />
        </main>
      </div>
    </div>
  );
}
