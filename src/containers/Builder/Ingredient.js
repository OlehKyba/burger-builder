import React from "react";
import PropTypes from "prop-types";

import classes from './Ingredients.module.css';

const Ingredient = props => {

    return (
        <div className={classes[props.type]}>
            {props.type === 'BreadTop' && <div className={classes.Seeds}></div>}
        </div>
    );
};

Ingredient.propTypes = {
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
