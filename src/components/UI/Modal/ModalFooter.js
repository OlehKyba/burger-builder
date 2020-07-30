import React from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";

const ModalFooter = props => {
    return (
        <div className={classes.ModalFooter}>
            {props.children}
        </div>
    );
};

ModalFooter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
};

export default ModalFooter;
