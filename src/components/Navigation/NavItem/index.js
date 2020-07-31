import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

import classes from "./NavItem.module.css";

const NavItem = props => {
    return (
        <li className={classes.NavItem}>
            <NavLink
                exact
                to={props.link}
                activeClassName={classes.Active}
            >
                {props.children}
            </NavLink>
        </li>
    );
}

NavItem.propTypes = {
    link: PropTypes.string,
    children: PropTypes.string,
};

export default NavItem;
