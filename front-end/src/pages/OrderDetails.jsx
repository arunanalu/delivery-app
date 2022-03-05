import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSaleById, updateStatus } from '../services/calls';
import useLocalStorage from '../hooks/useLocalStorage';
import Table from '../components/Table';

const fetchOrderDetails = async (id, token) => {
  const response = await getSaleById(id, token);
  return response.data;
};

export default function OrderDetails() {
  const DATA_ID_DETAILS = 'customer_order_details';
  const { id } = useParams();
  const [user] = useLocalStorage('user', {});
  const columns = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
  const { data, isLoading, isError } = useQuery(
    'orderDetails', () => fetchOrderDetails(id, user.token),
  );

  const sale_date = new Date(data?.saleDate);
  const NUMBER_DATE = 9;
  const day = sale_date?.getDate() <= NUMBER_DATE ? `0${sale_date?.getDate()}` : sale_date?.getDate();
  const month = sale_date?.getMonth() <= NUMBER_DATE
        ? `0${sale_date?.getMonth() + 1}` : (sale_date?.getMonth() + 1);
  const year = sale_date.getFullYear();

  const handleStatus = async () => {
    const status = {
      status: 'Entregue',
    };

    await updateStatus(id, status, user.token);
  };

  if (isLoading) return <div>Carregando</div>;
  if (isError) return <div>Deu ruim</div>;
  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      <div>
        <p
          data-testid={ `${DATA_ID_DETAILS}__element-order-details-label-order-id` }
        >
          {`PEDIDO ${data.id}`}

        </p>
        <p
          data-testid={ `${DATA_ID_DETAILS}__element-order-details-label-seller-name` }
        >
          P. Vend: Fulana Pereira

        </p>
        <p
          data-testid={ `${DATA_ID_DETAILS}__element-order-details-label-order-date` }
        >
          {`${day}/${month}/${year}`}

        </p>
        <p
          data-testid={
            `${DATA_ID_DETAILS}__element-order-details-label-delivery-status`
          }
        >
          {data.status}

        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ handleStatus }
          disabled={
            !!(data.status === 'Entregue'
            || data.status === 'Pendente'
            || data.status === 'Preparando')
          }
        >
          MARCAR COMO ENTREGUE

        </button>
      </div>
      <Table
        columns={ columns }
        items={ data.products }
        testIdNumber="customer_order_details__element-order-table-item-number-"
        testIdName="customer_order_details__element-order-table-name-"
        testIdQuantity="customer_order_details__element-order-table-quantity-"
        testIdUnitPrice="customer_order_details__element-order-table-unit-price-"
        testIdSubTotal="customer_order_details__element-order-table-sub-total-"
        thereIsButton={ false }
      />
      <p
        data-testid="customer_order_details__element-order-total-price"
      >
        {`Total: ${data.totalPrice.toString().replace('.', ',')}`}
      </p>
    </div>
  );
}
