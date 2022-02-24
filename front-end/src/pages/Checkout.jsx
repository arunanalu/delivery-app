import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart, removeFromCart } from '../app/slices/cartSlice';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Select from '../components/Select';
import '../styles/checkout.css';
import useLocalStorage from '../hooks/useLocalStorage';
import { sale } from '../services/calls';
import Table from '../components/Table';

export default function Checkout() {
  const dispatch = useDispatch();
  const columns = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item'];
  /* dispatch(addToCart({ id: 1, name: 'teste', quantity: 1, price: 2.99 })); */ // test. Pedir pra adicionar o preço unitário
  const cart = useSelector((state) => state.cart); // o useSelector renderiza sozinho quando algo muda
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [seller, setSeller] = useState('');
  const sellers = ['Fulana Pereira'];
  const user = useLocalStorage('user', {});
  const history = useHistory();

  const removeItem = (id) => {
    dispatch(removeFromCart({ id })); // na verdae tem que fazer uma função pra remover mesmo
  };

  const handleFinishOrder = async () => {
    const products = cart.items.map((item) => (
      { productId: item.id, quantity: item.quantity }));
    const req = {
      sale: {
        userId: user.id,
        sellerId: 2,
        totalPrice: cart.total,
        deliveryAddress: address,
        deliveryNumber: number,
      },
      products,
    };
    const response = await sale(req, user.token); // ver como o token ta sendo salvo
    history.push(`/customer/orders/${response.saleId}`);
  };

  return (
    <div className="container-checkout">
      <Header />
      <div className="finish-order">
        <h1>Finalizar Pedido</h1>
        <Table
          columns={ columns }
          items={ cart.items }
          onClick={ () => removeItem(product.id) }
          testIdNumber={ `customer_checkout__element-order-table-item-number-${index}` }
          testIdName={ `customer_checkout__element-order-table-name-${index}` }
          testIdQuantity={ `customer_checkout__element-order-table-quantity-${index}` }
          testIdUnitPrice={ `customer_checkout__element-order-table-unit-price-${index}` }
        />
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: ${cart.total}`}
        </p>
      </div>
      <div className="delivery-checkout">
        <h2>Detalhes e Endereços para Entrega</h2>
        <div>
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
        </div>
      </div>
      <Button
        onClick={ handleFinishOrder }
        testid="customer_checkout__button-submit-order"
        label="Finalizar Pedido"
      />
    </div>
  );
}
