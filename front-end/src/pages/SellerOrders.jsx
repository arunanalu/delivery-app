import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/calls';

export default function SellerOrders() {
  const [orders, setOrders] = useState(undefined);
  useEffect(() => {
    const user = localStorage.getItem('user');
    const userToJs = JSON.parse(user);
    const userId = 3;
    getUserOrders(userToJs.token, userId).then(({ data }) => setOrders(data));
  }, []);
  return (
    <div>
      {orders
        && orders.map(
          ({
            deliveryAddress,
            id,
            saleDate,
            status,
            totalPrice,
          }) => (
            <a href={ `/seller/orders/${id}` } key={ id }>
              <p data-testid={ `seller_orders__element-order-id-${id}` }>{id}</p>
              <p
                data-testid={ `seller_orders__element-delivery-
              status-${id}` }
              >
                {status}
              </p>
              <p
                data-testid={ `seller_orders__element-card
              -address-${id}` }
              >
                {deliveryAddress}
              </p>
              <p
                data-testid={ `seller_orders__element-order
              -date-${id}` }
              >
                {saleDate}
              </p>
              <p
                data-testid={ `seller_orders__element-card
              -price-${id}` }
              >
                {totalPrice}
              </p>
            </a>
          ),
        )}
    </div>
  );
}
