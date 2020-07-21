import React from "react";
import PropTypes from "prop-types";

import Nav from "../Navigation/Nav";
import NavItem from "../Navigation/NavItem";
import Logo from "./Logo";

const Header = props => {
    return (
        <header>
            <Nav
                logo={<Logo />}
                isOpen={props.isSideDrawerOpen}
                onBurgerIconClick={props.onBurgerIconClick}
            >
                <NavItem link={"/"} active>Home</NavItem>
                <NavItem link={"/"}>Builder</NavItem>
                <NavItem link={"/"}>Sign In</NavItem>
                <NavItem link={"/"}>Sign up</NavItem>
            </Nav>
        </header>
    );
};

Header.propTypes = {
    isSideDrawerOpen: PropTypes.bool,
    onBurgerIconClick: PropTypes.func,
};

Header.defaultProps = {
    isSideDrawerOpen: false,
};

export default Header;
