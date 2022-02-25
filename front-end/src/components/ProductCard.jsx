import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart,
  decreaseOneFromCart,
  updateTotal,
  setItemQuantity,
} from '../app/slices/cartSlice';
import './styles/productCard.css';

export default function ProductCard({ name, imagePath, price, id }) {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(({ cart }) => {
    const product = cart.items.find((item) => item.id === id);
    if (!product) return 0;
    return product.quantity;
  });

  const handleAddProduct = () => {
    dispatch(addOneToCart({ id, name, price }));
    dispatch(updateTotal());
  };

  const handleChange = (e) => {
    dispatch(setItemQuantity({ id, name, price, quantity: Number(e.target.value) }));
    dispatch(updateTotal());
  };

  const handleRemoveProduct = () => {
    dispatch(decreaseOneFromCart({ id }));
    dispatch(updateTotal());
  };

  return (
    <div
      className="product-card"
    >
      <span
        className="product-card__price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {price.replace('.', ',')}
      </span>
      <img
        src={ imagePath }
        alt={ `A cold ${name}` }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h1
        className="product-card__name"
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </h1>
      <button
        type="button"
        onClick={ handleRemoveProduct }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        type="number"
        placeholder="0"
        value={ cartQuantity }
        onChange={ handleChange }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        type="button"
        onClick={ handleAddProduct }
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
}.isRequired;
