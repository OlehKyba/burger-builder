import React from "react";
import PropTypes from "prop-types";

import classes from "./Result.module.css";

import SuccessIcon from "./SuccessIcon";
import ErrorIcon from "./ErrorIcon";

const Result = props => {
    const Icon = props.status === "success" ? SuccessIcon : ErrorIcon;
    const containerStyle = props.status === "success" ? classes.Success : classes.Error;
    return (
        <div className={[classes.ResultContainer, containerStyle].join(" ")}>
            <Icon />
            {props.children}
        </div>
    );
};

Result.propTypes = {
    status: PropTypes.oneOf([
        "success",
        "error",
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]),
};

Result.defaultProps = {
    status: "success",
};

export default Result
