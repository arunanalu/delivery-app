import React from 'react';
import { useQuery } from 'react-query';
import { getUserOrders } from '../services/calls';
import useLocalStorage from '../hooks/useLocalStorage';
import OrderCard from '../components/OrderCard';
import './styles/orders.css';
import Loading from '../components/Loading';

const fetchOrders = async (user) => {
  const response = await getUserOrders(user.token, user.id);
  return response.data;
};
export default function Orders() {
  const [user] = useLocalStorage('user', {});
  const { data, isLoading, isError } = useQuery('orders', () => fetchOrders(user));

  if (isLoading) return <Loading />;
  if (isError) return <div>Deu ruim</div>;
  const indexes = data.map((_el, index) => index);
  indexes.reverse();
  return (
    <div
      className="orders-list-container"
    >
      {data.map((order, index) => (
        <OrderCard
          id={ indexes[index] }
          realId={ order.id }
          status={ order.status }
          saleDate={ new Date(order.saleDate) }
          key={ indexes[index] }
          totalPrice={ order.totalPrice.toString() }
        />
      ))}
    </div>
  );
}
