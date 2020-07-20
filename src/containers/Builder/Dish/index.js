import React from "react";
import PropTypes from "prop-types";

import classes from "./Builder.module.css";

import Ingredient from "../Ingredients/Ingredient";
import BurgerDefaults from "../Ingredients/DefaultIngridients/BurgerDedaults";

const Dish = props => {
    return (
        <section className={classes.Builder}>
            <BurgerDefaults>
                {props.ingredients.length > 0 ?
                    props.ingredients.map(ingredient => (
                        <Ingredient
                            type={props.menu[ingredient.menuName].type}
                            key={ingredient.id}
                            onClick={props.onIngredientClick.bind(null, ingredient.id)}
                        />
                    ))
                    : <p>Please start cooking the burger!</p>
                }
            </BurgerDefaults>
        </section>
    );
};

Dish.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        menuName: PropTypes.string,
    })).isRequired,
    menu: PropTypes.object.isRequired,
    onIngredientClick: PropTypes.func
};

export default Dish;
