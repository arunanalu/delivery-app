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
    <div>
      <label className="label-register" htmlFor={ name }>
        { labelText }
      </label>
      <input
        data-testid={ `common_${page}__input-${name}` }
        name={ name }
        type={ type }
        value={ value }
        autoComplete="none"
        onChange={ (e) => {
          changeHandler(e.target.value);
        } }
        className="input-register-page"
        required
      />
    </div>
  );
}

FormInput.propTypes = {
  labelText: PropTypes.string,
}.isRequired;
