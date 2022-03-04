import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSaleById } from '../services/calls';

const fetchOrderDetails = async (id) => {
  const response = await getSaleById(id);
  console.log(response)
  return response.data;
};

export default function OrderDetails() {
  const { id } = useParams();
  const columns = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];
  const { data, isLoading, isError } = useQuery(
    'orderDetails', () => fetchOrderDetails(id),
  );
  console.log(data);

  return (
    <div>

      <h1>Detalhes do Pedido</h1>
      {/* <div>
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO ${order.id}`}

        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vend: Fulana Pereira

        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {order.saleDate}

        </p>
        <p
          data-testid="
            customer_order_details__element-order-details-label-delivery-status"
        >
          {order.status}

        </p>
        <Button
          onClick={ handleStatus }
        />
      </div> */}
    </div>
  );
}

/* import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/checkout.css';
import { getSaleById } from '../services/calls';
import Table from '../components/Table';
import Button from '../components/Button';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const columns = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

  useEffect(async () => {
    const orderDet = await getSaleById(id);
    setOrder(orderDet);
  }, [id]);

  const handleStatus = async () => {
    const status = {
      status: 'entregue',
    };

    await updateStatus(id, status);
  };

  return (
    <div>
      <Header />
      <div>
        <h1>Detalhes do Pedido</h1>
        <div>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`PEDIDO ${order.id}`}

          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P. Vend: Fulana Pereira

          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {order.saleDate}

          </p>
          <p
            data-testid="
            customer_order_details__element-order-details-label-delivery-status"
          >
            {order.status}

          </p>
          <Button
            onClick={ handleStatus }
          />
        </div>
        <Table
          columns={ columns }
          items={ order.products }
          onClick={ () => removeItem(product.id) }
          testIdNumber="customer_order_details__element-order-table-item-number-"
          testIdName="customer_order_details__element-order-table-name-"
          testIdQuantity="customer_order_details__element-order-table-quantity-"
          testIdUnitPrice="customer_order_details__element-order-table-unit-price-"
          testIdSubTotal="customer_order_details__element-order-table-sub-total-"
        />
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          {`Total: ${order.totalPrice}`}
        </p>
      </div>
    </div>
  );
} */
