import React from 'react';
import './styles/products.scss';
import { useQuery } from 'react-query';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../services/calls';
import ProductCard from '../components/ProductCard';
import useLocalStorage from '../hooks/useLocalStorage';
import queryClient from '../react-query/queryClient';

// coloquei aqui por causa do linter
const fetchProducts = async (user) => {
  const response = await getAllProducts(user.token);
  return response.data;
};

export default function Products() {
  const [user] = useLocalStorage('user', {});
  const history = useHistory();
  const cartTotal = useSelector((state) => state.cart.total);

  const {
    data: productList,
    isError: productsFetchFailed,
    isLoading: productsIsFetching,
  } = useQuery('products', () => fetchProducts(user));

  if (productsIsFetching) return <p>Estou carregando aaa</p>;
  if (productsFetchFailed) {
    queryClient.cancelQueries('products');
    return <Redirect to="/" />;
  }
  return (
    <>
      {/* trocar pelo header componentizado */}
      <header>
        <nav>
          <button
            type="button"
          >
            Produtoss
          </button>
          <button type="button">Pedidos</button>
        </nav>
        <h1>{user.name}</h1>
        <button type="button">Sair</button>
      </header>
      <main>
        {productList.map((product) => (
          <ProductCard
            key={ product.id }
            id={ product.id }
            name={ product.name }
            imagePath={ product.image }
            price={ product.price }
          />
        ))}
        <button
          type="button"
          onClick={ () => history.push('checkout') }
          id="card-button"
        >
          {`Ver carrinho: ${cartTotal}`}
        </button>
      </main>
    </>
  );
}
