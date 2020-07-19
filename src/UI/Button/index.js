import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";


const Button = props => {
  return (
      <button
          {...props}
          className={classes.Button}
          style={{width: props.width}}
      >
          {props.children}
      </button>
  );
};

Button.propTypes = {
    width: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default Button;