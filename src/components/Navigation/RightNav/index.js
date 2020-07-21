import React from "react";
import PropTypes from "prop-types";

import classes from "./RightNav.module.css";

const RightNav = props => {
    const ulClasses = [classes.RightNav, props.isOpen ? classes.Open : classes.Close];
    return (
        <ul className={ulClasses.join(" ")}>
            {props.children}
        </ul>
    );
}

RightNav.propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.oneOfType([
       PropTypes.element,
       PropTypes.arrayOf(PropTypes.element),
    ])),
};

RightNav.defaultProps = {
    isOpen: false,
};

export default RightNav;
