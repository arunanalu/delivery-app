import React from 'react';
import { useQuery } from 'react-query';
import { getUserOrders } from '../services/calls';
import useLocalStorage from '../hooks/useLocalStorage';
import OrderCard from '../components/OrderCard';
import './styles/orders.css';

const fetchOrders = async (user) => {
  const response = await getUserOrders(user.token, user.id);
  return response.data;
};
export default function Orders() {
  const [user] = useLocalStorage('user', {});
  const { data, isLoading, isError } = useQuery('orders', () => fetchOrders(user));

  if (isLoading) return <div>Carregando</div>;
  if (isError) return <div>Deu ruim</div>;
  return (
    <div
      className="orders-list-container"
    >
      {data.map((order) => (
        <OrderCard
          id={ order.id }
          status={ order.status }
          saleDate={ new Date(order.saleDate) }
          key={ order.id }
          totalPrice={ order.totalPrice.toString() }
        />
      ))}
    </div>
  );
}
