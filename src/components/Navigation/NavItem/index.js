import React from "react";
import PropTypes from "prop-types";

import classes from "./NavItem.module.css";

const NavItem = props => {

    return (
        <li className={classes.NavItem}>
            <a href={props.link} className={props.active ? classes.Active : undefined}>
                {props.children}
            </a>
        </li>
    );
}

NavItem.propTypes = {
    active: PropTypes.bool,
    link: PropTypes.string,
    children: PropTypes.string,
};

NavItem.defaultProps = {
    active: false,
};

export default NavItem;
