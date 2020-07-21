import React from "react";
import PropTypes from "prop-types";

import classes from "./Backdrop.module.css";

const Backdrop = props => {
    return props.isShow && <div className={classes.Backdrop} onClick={props.onClick}/>;
};

Backdrop.propTypes = {
    isShow: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

export default Backdrop;
