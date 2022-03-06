import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';
import { getSaleBySellerId } from '../services/calls';

const fetchOrders = async (user) => {
  const response = await getSaleBySellerId(user.id, user.token);
  return response.data;
};

export default function SellerOrders() {
  const history = useHistory();
  const [user] = useLocalStorage('user', {});
  const { data, isLoading, isError } = useQuery('orders', () => fetchOrders(user));
  if (isLoading) return <div>Carregando</div>;
  if (isError) return <div>Deu ruim</div>;
  return (
    <div>
      <Header />
      {data.map(
        ({ deliveryAddress, id, saleDate, status, totalPrice }, index) => (
          <button
            onClick={ () => history.push(`/seller/orders/${id}`) }
            type="button"
            key={ index }
          >
            <div data-testid={ `seller_orders__element-order-id-${id}` }>
              {id}
            </div>
            <div data-testid={ `seller_orders__element-delivery-status-${id}` }>
              {status}
            </div>
            <div
              data-testid={ `seller_orders__element-card
              -address-${id}` }
            >
              {deliveryAddress}
            </div>
            <div
              data-testid={ `seller_orders__element-order
              -date-${id}` }
            >
              {saleDate}
            </div>
            <div
              data-testid={ `seller_orders__element-card
              -price-${id}` }
            >
              {totalPrice}
            </div>
          </button>
        ),
      )}
    </div>
  );
}
