import React, {forwardRef} from "react";
import PropTypes from "prop-types";

import classes from "./Input.module.css";


const Input = forwardRef((props, ref) => {
    const {form: {touched, errors}, field, ...elseProps} = props;
    const isError = touched[field.name] && errors[field.name];
    const inputStyle = isError ? classes.Error : classes.Primary;
    return (
        <div className={classes.Container}>
            <input
                ref={ref}
                {...field}
                className={[classes.Input, inputStyle].join(" ")}
                {...elseProps}
            />
            {isError && (
                <div className={classes.ErrorContainer}>
                    <p>{errors[field.name]}</p>
                </div>
            )}
        </div>
    );
});

Input.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        name: PropTypes.string,
        value: PropTypes.any,
    }),
    form: PropTypes.shape({
        errors: PropTypes.objectOf(PropTypes.string),
        touched: PropTypes.objectOf(PropTypes.bool),
    }),
};

export default Input;
