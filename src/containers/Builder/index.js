import React, {Component} from "react";
import classes from './Builder.module.css';

import Ingredient from "./Ingredient";

class Builder extends Component{

    state = {
        ingredients: [],
        menu: {},
    }

    render() {
        return (
            <>
                <div className={classes.Builder}>
                    <Ingredient type={'BreadTop'} />
                    <Ingredient type={'Salad'} />
                    <Ingredient type={'Cheese'} />
                    <Ingredient type={'Bacon'} />
                    <Ingredient type={'Onion'} />
                    <Ingredient type={'Tomato'} />
                    <Ingredient type={'Meat'} />
                    <Ingredient type={'BreadBottom'} />
                </div>
                <div>
                    Control elements
                </div>
            </>
        );
    }
}

export default Builder;
