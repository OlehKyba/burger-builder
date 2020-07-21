import React from "react";
import PropTypes from "prop-types";

import classes from "./RightNav.module.css";

import NavItem from "../NavItem";

const RightNav = props => {
    return (
        <ul className={classes.RightNav}>
            {props.children}
        </ul>
    );
}

RightNav.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.objectOf(NavItem),
        PropTypes.arrayOf(PropTypes.objectOf(NavItem)),
    ]),
};

export default RightNav;
