import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateTotal } from '../app/slices/cartSlice';

export default function ProductCard({ name, imagePath, price, id }) {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => {
    const { items } = state.cart;
    const productInCart = items.find((product) => product.id === id);
    if (!productInCart) return 0;
    const productIndex = items.indexOf(productInCart);
    return items[productIndex].quantity;
  });

  const handleAddProduct = () => {
    dispatch(addToCart({ id, name, price }));
    dispatch(updateTotal());
  };

  const handleRemoveProduct = () => {
    dispatch(removeFromCart({ id }));
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
        {price}
      </span>
      <img
        src={ imagePath }
        alt={ `A cold ${name}` }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <section
        className="product-card__bottom-section"
      >
        <h1
          className="product-card__name"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h1>
        <div className="product-card__cart-controllers">
          <button
            type="button"
            onClick={ handleRemoveProduct }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <h2
            data-testid={ `customer_products__input-card-quantity-${id}` }
          >
            {quantity}
          </h2>
          <button
            type="button"
            onClick={ handleAddProduct }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </section>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
}.isRequired;
