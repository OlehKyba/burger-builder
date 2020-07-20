import React from "react";
import PropTypes from "prop-types";

import classes from "./Controller.module.css";

import ControllerRow from "./ControllerRow";
import Button from "../../../UI/Button";

const Controller = props => {
    return (
        <div className={classes.Container}>
            <p>Current price: <strong>{props.price.toFixed(3)}</strong></p>
            {props.menu.map(item => (
                <ControllerRow
                    key={item.type}
                    label={`${item.type} × ${item.count}`}
                    add={props.add.bind(null, item.menuName)}
                    remove={props.remove.bind(null, item.menuName)}
                    canRemove={item.canRemove}
                />))
            }
            <Button
                onClick={props.onCheckout}
                width={'100px'}
                disabled={!props.menu.some(item => item.count > 0)}
            >
                Ready!
            </Button>
        </div>);
};

Controller.propTypes = {
    price: PropTypes.number,
    menu: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        count: PropTypes.number,
        canRemove: PropTypes.bool,
        menuName: PropTypes.string,
    })),

    add: PropTypes.func,
    remove: PropTypes.func,
    onCheckout: PropTypes.func,
};

export default Controller;
