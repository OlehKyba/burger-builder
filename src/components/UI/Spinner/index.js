import React from "react";
import PropTypes from "prop-types";

import classes from "./Spinner.module.css";

const Spinner = props => {

    return (
        <div className={classes.Wrapper}>
            <div className={props.isSpin ? classes.Overlay : [classes.Overlay, classes.Disabled].join(" ")}>
                <div className={classes.SpinnerWrapper}>
                    <div className={classes.Loader} />
                </div>
            </div>
            {props.children}
        </div>
    );
};

Spinner.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
    isSpin: PropTypes.bool,
};

export default Spinner;
