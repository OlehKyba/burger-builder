import React from "react";
import PropTypes from "prop-types";

import classes from "./Button.module.css";


const Button = props => {
    const {width, invert, ...other} = props;
    const colorClass = invert ? classes.Invert : classes.Primary;
    return (
        <button
            {...other}
            className={[classes.Button, colorClass].join(" ")}
            style={{width: props.width}}
        >
            {props.children}
        </button>
  );
};

Button.propTypes = {
    invert: PropTypes.bool,
    width: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    invert: false,
};

export default Button;
