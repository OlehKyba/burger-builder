import React from "react";
import PropTypes from "prop-types";

import classes from "./Card.module.css";

const Card = props => {
    return (
        <div className={classes.Card}>
            {props.children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]),
};

export default Card;
