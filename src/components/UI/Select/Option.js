import React from "react";
import PropTypes from "prop-types";

const Option = props => {
    return (
        <option value={props.value} disabled={props.disabled}>{props.children}</option>
    );
};

Option.propTypes = {
    children: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Option;
