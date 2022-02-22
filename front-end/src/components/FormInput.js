import React from 'react';
import PropTypes from 'prop-types';

export default function FormInput(props) {
  const {
    labelText,
    value,
    page,
    name,
    type,
    changeHandler,
  } = props;

  return (
    <>
      <label className={ `modal-${page}_label` } htmlFor={ name }>
        { labelText }
      </label>
      <br />
      <input
        data-testid={ `common_${page}__input-${name}` }
        name={ name }
        type={ type }
        value={ value }
        autoComplete="none"
        onChange={ (e) => {
          changeHandler(e.target.value);
          console.log(e.target.value);
        } }
        className={ `input-${page}` }
        required
      />
    </>
  );
}

FormInput.propTypes = {
  labelText: PropTypes.string,
}.isRequired;
