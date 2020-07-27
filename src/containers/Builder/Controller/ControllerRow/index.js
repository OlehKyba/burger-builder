import React from "react";
import PropTypes from "prop-types"

import classes from "./ControllerRow.module.css";
import iconsPath from "./icons";

import Button from "../../../../components/UI/Button";
import Icon from "../../../../components/UI/Icon";

const ControllerRow = props => {
    return (
        <div className={classes.Row}>
            <Icon src={iconsPath[props.label]} alt={props.label} width={'60px'} />
            <p>{` × ${props.count}`}</p>
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
    count: PropTypes.number.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    canRemove: PropTypes.bool,
};

export default ControllerRow;
