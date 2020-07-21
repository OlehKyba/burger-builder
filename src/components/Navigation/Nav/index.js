import React from "react";
import PropTypes from "prop-types";

import classes from "./Nav.module.css";

import RightNav from "../RightNav";
import NavItem from "../NavItem";

const Nav = props => {
    return (
        <nav className={classes.Nav}>
            {props.logo}
            <RightNav>
                {props.children}
            </RightNav>
        </nav>
    );
}

Nav.propTypes = {
    logo: PropTypes.element,
    children: PropTypes.oneOfType([
        PropTypes.objectOf(NavItem),
        PropTypes.arrayOf(PropTypes.objectOf(NavItem)),
    ]),
};

export default Nav;
