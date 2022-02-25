import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllProducts } from '../services/calls';
import ProductCard from '../components/ProductCard';
import useLocalStorage from '../hooks/useLocalStorage';
import queryClient from '../react-query/queryClient';
import './styles/products.css';

// coloquei aqui fora por causa do linter
const fetchProducts = async (user) => {
  const response = await getAllProducts(user.token);
  return response.data;
};

export default function Products() {
  const [user] = useLocalStorage('user', {});
  const cartTotal = useSelector((state) => state.cart.total);
  const history = useHistory();

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
    <main>
      {productList.map((product) => (
        <ProductCard
          key={ product.id }
          id={ product.id }
          name={ product.name }
          imagePath={ product.url_image }
          price={ product.price }
        />
      ))}
      <button
        type="button"
        onClick={ () => history.push('checkout') }
        disabled={ cartTotal === 0 }
        id="card-button"
        data-testid="customer_products__button-cart"
      >
        Ver carrinho:
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { cartTotal.toFixed(2).toString().replace('.', ',') }
        </span>
      </button>
    </main>
  );
}
