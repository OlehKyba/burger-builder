import React from "react";

import Nav from "../Navigation/Nav";
import NavItem from "../Navigation/NavItem";
import Logo from "./Logo";

const Header = props => {
  return (
      <header>
          <Nav logo={<Logo />}>
              <NavItem link={"/"} active>Home</NavItem>
              <NavItem link={"/"}>Builder</NavItem>
              <NavItem link={"/"}>Sign In</NavItem>
              <NavItem link={"/"}>Sign up</NavItem>
          </Nav>
      </header>
  );
};

export default Header;
