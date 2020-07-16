import React from "react";
import PropTypes from "prop-types";

import classes from './Ingredients.module.css';

const Ingredient = props => {

    const seeds = (
        <>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
        </>
    );

    return (
        <div className={classes[props.type]}>
            {props.type === 'BreadTop' ? seeds : null}
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
        ]
    ),
};

export default Ingredient;
