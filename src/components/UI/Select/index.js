import React from "react";
import PropTypes from "prop-types";

import classes from "./Select.module.css";

const Select = props => {
    return (
        <div className={[classes.Select].join(" ")}>
            <select {...props.field}>
                {props.children}
            </select>
        </div>
    );
};

Select.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    field: PropTypes.shape({
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        name: PropTypes.string,
        value: PropTypes.any,
    }),
};

export default Select;
