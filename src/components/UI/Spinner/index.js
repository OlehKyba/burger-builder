import React from "react";
import PropTypes from "prop-types";

import classes from "./Spinner.module.css";

const Spinner = props => {
    const spinnerClass = props.isSpin ? classes.Loader : [classes.Loader, classes.Disabled].join(" ");
    return (
        <div className={props.isSpin ? classes.ActiveContainer : undefined}>
            <div className={spinnerClass}>
                <span />
                <span />
                <span />
                <span />
            </div>
            {props.children}
        </div>
    );
};

Spinner.propTypes = {
    children: PropTypes.element,
    isSpin: PropTypes.bool,
};

export default Spinner;
