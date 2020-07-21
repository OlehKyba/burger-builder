import React from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIcon.module.css";

const BurgerIcon = props => {
    const iconClass = props.isOpen ? [classes.BurgerIcon, classes.Change].join(" ") : classes.BurgerIcon;
    return (
        <div className={iconClass} onClick={props.onClick}>
            <div className={classes.Bar1}/>
            <div className={classes.Bar2}/>
            <div className={classes.Bar3}/>
        </div>
    );
};

BurgerIcon.propTypes = {
    isOpen: PropTypes.bool,
    onClick: PropTypes.func,
};

BurgerIcon.defaultProps = {
    isOpen: false,
};

export default BurgerIcon;
