import React from "react";
import PropTypes from "prop-types";

import classes from "./Nav.module.css";

import RightNav from "../RightNav";
import NavItem from "../NavItem";
import BurgerIcon from "../BurgerIcon";
import Backdrop from "../../../UI/Backdrop";

const Nav = props => {
    return (
        <>
            <nav className={classes.Nav}>
                <RightNav isOpen={props.isOpen}>
                    {props.children}
                </RightNav>
                <BurgerIcon
                    isOpen={props.isOpen}
                    onClick={props.onBurgerIconClick}
                />
                {props.logo}
            </nav>
            {<Backdrop isShow={props.isOpen} onClick={props.onBurgerIconClick}/>}
        </>
    );
}

Nav.propTypes = {
    isOpen: PropTypes.bool,
    onBurgerIconClick: PropTypes.func,
    logo: PropTypes.element,
    children: PropTypes.oneOfType([
        PropTypes.objectOf(NavItem),
        PropTypes.arrayOf(PropTypes.objectOf(NavItem)),
    ]),
};

Nav.defaultProps = {
    isOpen: false,
};

export default Nav;
