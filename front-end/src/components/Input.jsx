import React from 'react';
import PropTypes from 'prop-types';

function Input({
  type, onChange, testid, value, label, className,
}) {
  return (
    <div className={ className }>
      <label className="label" htmlFor={ testid }>
        {label}
      </label>
      <input
        type={ type }
        value={ value }
        data-testid={ testid }
        onChange={ onChange }
        id={ testid }
      />

    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  testid: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: undefined,
  className: undefined,
  testid: undefined,
};

export default Input;
