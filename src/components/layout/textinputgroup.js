import React from 'react';
import PropTypes from 'prop-types';

// Import classnames to conditionally apply the is-invalid class to input elements if there is an error
import classnames from 'classnames';

const TextInputGroup = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={classnames('form-control form-control-lg', {
          'is-invalid': props.error
        })}
        value={props.value}
        onChange={props.onChange}
      />
      {/* Check for presence of error using a conditional expression */}
      {props.error && <div className="invalid-feedback"> {props.error} </div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string
};

TextInputGroup.defaultProps = {
  type: 'text'
};

export default TextInputGroup;
