import React from "react";
import PropTypes from "prop-types";

import classes from './Ingredients.module.css';

const Ingredient = props => {
    return (
        <div className={classes[props.type]} onClick={props.onClick}>
            {props.type === 'BreadTop' && <div className={classes.Seeds}/>}
        </div>
    );
};

Ingredient.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.oneOf([
            'BreadBottom',
            'BreadTop',
            'Meat',
            'Cheese',
            'Salad',
            'Bacon',
            'Onion',
            'Tomato',
        ]
    ),
};

export default Ingredient;
