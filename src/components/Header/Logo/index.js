import React from "react";

import classes from "./Logo.module.css";
import logo from "../../../assets/logo.svg";

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logo} alt={"Burger Builder"}/>
        </div>
    );
}

export default Logo;
