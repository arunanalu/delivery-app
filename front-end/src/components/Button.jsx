import React from 'react';
import PropTypes from 'prop-types';

function Button({
  testid, disabled, onClick, label, className,
}) {
  return (
    <button
      type="submit"
      data-testid={ testid }
      disabled={ disabled }
      onClick={ onClick }
      className={ className }
    >
      {label}
    </button>

  );
}

Button.propTypes = {
  testid: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: undefined,
  onClick: undefined,
  className: undefined,
  testid: undefined,
};

export default Button;
