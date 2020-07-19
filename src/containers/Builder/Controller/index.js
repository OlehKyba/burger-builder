import React from "react";
import PropTypes from "prop-types";

import classes from "./Controller.module.css";

import ControllerRow from "./ControllerRow";

const Controller = props => {
    return (
        <div className={classes.Container}>
            {props.menu.map(item => (
                <ControllerRow
                    key={item.type}
                    label={`${item.type} × ${item.count}`}
                    add={props.add.bind(null, item.menuName)}
                    remove={props.remove.bind(null, item.menuName)}
                    canRemove={item.canRemove}
                />))
            }
        </div>);
};

Controller.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        count: PropTypes.number,
        canRemove: PropTypes.bool,
        menuName: PropTypes.string,
    })),

    add: PropTypes.func,
    remove: PropTypes.func,
};

export default Controller;
