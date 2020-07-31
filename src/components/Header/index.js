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
                {props.nav.map(item => (
                    <NavItem link={item.link} key={item.name}>
                        {item.name}
                    </NavItem>
                ))}
            </Nav>
        </header>
    );
};

Header.propTypes = {
    nav: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        link: PropTypes.string,
    })),
    isSideDrawerOpen: PropTypes.bool,
    onBurgerIconClick: PropTypes.func,
};

Header.defaultProps = {
    isSideDrawerOpen: false,
};

export default Header;
