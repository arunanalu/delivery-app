import React from 'react';
import PropTypes from 'prop-types';

function Select({
  onChange, testid, value, options, label,
}) {
  return (
    <div className="select">
      <label htmlFor={ testid } className="label-select">
        {label}
      </label>
      <select
        value={ value }
        data-testid={ testid }
        onChange={ onChange }
        id={ testid }
      >
        {options
          .map((option) => <option key={ option } value={ option }>{option}</option>)}
      </select>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;
