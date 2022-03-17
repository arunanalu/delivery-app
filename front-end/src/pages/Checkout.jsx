import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeAllFromCart, removeFromCart, updateTotal } from '../app/slices/cartSlice';
import Input from '../components/Input';
import Select from '../components/Select';
import useLocalStorage from '../hooks/useLocalStorage';
import { sale } from '../services/calls';
import Table from '../components/Table';
import './styles/checkout.css';

export default function Checkout() {
  const dispatch = useDispatch();
  const columns = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item'];
  const cart = useSelector((state) => state.cart); // o useSelector renderiza sozinho quando algo muda
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [seller, setSeller] = useState('');
  const sellers = ['Fulana Pereira'];
  const [user] = useLocalStorage('user', {});
  const history = useHistory();

  const removeItem = (id) => {
    dispatch(removeFromCart({ id }));
    dispatch(updateTotal());
  };

  const removeAllItens = () => {
    dispatch(removeAllFromCart());
    dispatch(updateTotal());
  };

  const handleFinishOrder = async () => {
    try {
      const products = cart.items.map((item) => (
        { productId: item.id, quantity: item.quantity }));

      const idDoUsuario = user.id;
      const req = {
        sale: {
          userId: idDoUsuario || 'não veio nada',
          sellerId: 2,
          totalPrice: cart.total,
          deliveryAddress: address,
          deliveryNumber: number,
        },
        products,
      };

      const response = await sale(req, user.token);
      removeAllItens();
      history.push(`/customer/orders/${response.data.saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="c-checkout">
      <h1>Finalizar Pedido</h1>
      <div className="checkout__items">
        <Table
          columns={ columns }
          items={ cart.items }
          total={ cart.total.toString().replace('.', ',') }
          handleClick={ removeItem }
          testIdNumber="customer_checkout__element-order-table-item-number-"
          testIdName="customer_checkout__element-order-table-name-"
          testIdQuantity="customer_checkout__element-order-table-quantity-"
          testIdUnitPrice="customer_checkout__element-order-table-unit-price-"
          testIdSubTotal="customer_checkout__element-order-table-sub-total-"
          testIdRemove="customer_checkout__element-order-table-remove-"
          testIdTotal="customer_checkout__element-order-total-price"
          thereIsButton
        />
      </div>
      <h1>Detalhes e Endereços para Entrega</h1>
      <div className="checkout__details">
        <Select
          options={ sellers }
          testid="customer_checkout__select-seller"
          value={ seller }
          onChange={ ({ target }) => setSeller(target.value) }
          label="P. Vendedora Responsável"
        />
        <Input
          label="Endereço"
          id="address-input"
          testid="customer_checkout__input-address"
          type="text"
          value={ address }
          onChange={ ({ target }) => setAddress(target.value) }
        />
        <Input
          label="Número"
          id="address-number-input"
          testid="customer_checkout__input-addressNumber"
          type="number"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
        <button
          className="checkout__finish-order-btn"
          onClick={ handleFinishOrder }
          data-testid="customer_checkout__button-submit-order"
          type="button"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
