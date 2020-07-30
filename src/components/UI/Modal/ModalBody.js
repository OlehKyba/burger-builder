import React from "react";
import PropTypes from "prop-types";

import classes from "./Modal.module.css";

const ModalBody = props => {
    return (
        <div className={classes.ModalBody}>
            {props.children}
        </div>
    );
};

ModalBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
};

export default ModalBody;
