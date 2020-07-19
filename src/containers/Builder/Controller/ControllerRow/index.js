import React from "react";
import PropTypes from "prop-types"

import classes from "./ControllerRow.module.css";

import Button from "../../../../UI/Button";

const ControllerRow = props => {
    return (
        <div className={classes.Row}>
            <p className={classes.Label}>{props.label}</p>
            <Button
                width={'60px'}
                onClick={props.add}
            >
                More
            </Button>
            <Button
                width={'60px'}
                onClick={props.remove}
                disabled={!props.canRemove}
            >
                Less
            </Button>
        </div>
    );
}

ControllerRow.propTypes = {
    label: PropTypes.string.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    canRemove: PropTypes.bool,
};

export default ControllerRow;
