import React, {Component} from "react";
import classes from './Builder.module.css';

import Ingredient from "./Ingredient";

class Builder extends Component{

    state = {
        ingredients: [
            {id: 'Salad_1', menuName: 'salad'},
            {id: 'Cheese_1', menuName: 'cheese'},
            {id: 'Bacon_1', menuName: 'bacon'},
            {id: 'Onion_1', menuName: 'onion'},
            {id: 'Tomato_1', menuName: 'tomato'},
            {id: 'Meat_1', menuName: 'meat'},
        ],

        menu: {
            breadTop: {price: 0.1, count: 1, type:'BreadTop', canAdd: false, canRemove: false},
            breadBottom: {price: 0.1, count: 1, type:'BreadBottom', canAdd: false, canRemove: false},
            salad: {price: 0.2, count: 1, type: 'Salad', canAdd: true, canRemove: true},
            cheese: {price: 0.3, count: 1, type: 'Cheese', canAdd: true, canRemove: true},
            bacon: {price: 0.45, count: 1, type: 'Bacon', canAdd: true, canRemove: true},
            onion: {price: 0.25, count: 1, type: 'Onion', canAdd: true, canRemove: true},
            tomato: {price: 0.35, count: 1, type: 'Tomato', canAdd: true, canRemove: true},
            meat: {price: 0.75, count: 1, type: 'Meat', canAdd: true, canRemove: true},
        },

        price: 0.2,
    }

    getIngredientId = menuItem => {
        const {type} = menuItem;
        const suffix = new Date().getTime();
        return `${type}_${suffix}`;
    };

    getMenuName = ingredientId => {
        const {menuName} = this.state.ingredients.find(item => item.id === ingredientId);
        return menuName;
    }

    addIngredient = menuName => {
        const ingredientData = {...this.state.menu[menuName]};
        if (ingredientData.canAdd) {
            ingredientData.count++;
            const price = this.state.price + ingredientData.price;
            const ingredient = {menuName, id: this.getIngredientId(ingredientData)};
            this.setState({
                menu: {...this.state.menu, [menuName]: ingredientData},
                ingredient: [...this.state.ingredients, ingredient],
                price,
            });
        }
    }

    removeAccurateIngredient = ingredientId => {
        const menuName = this.getMenuName(ingredientId);
        const ingredientData = {...this.state.menu[menuName]};
        if (ingredientData.canRemove) {
            ingredientData.count--;
            ingredientData.canRemove = ingredientData.count > 0;
            const price = this.state.price - ingredientData.price;
            const ingredients = [...this.state.ingredients];
            const index = ingredients.findIndex(item => item.id === ingredientId);
            ingredients.splice(index, 1);
            this.setState({
                menu: {...this.state.menu, [menuName]: ingredientData},
                ingredients,
                price,
            });
        }
    }

    removeIngredient = menuName => {
        const ingredientData = {...this.state.menu[menuName]};
        if (ingredientData.canRemove) {
            ingredientData.count--;
            ingredientData.canRemove = ingredientData.count > 0;
            const price = this.state.price - ingredientData.price;
            const ingredients = [...this.state.ingredients];
            const pattern = new RegExp('^', ingredientData.type);
            const index = ingredients.findIndex(item => pattern.test(item.id));
            ingredients.splice(index, 1);
            this.setState({
                menu: {...this.state.menu, [menuName]: ingredientData},
                ingredients,
                price,
            });
        }
    }


    render() {
        return (
            <>
                <div className={classes.Builder}>
                    <Ingredient type={this.state.menu.breadTop.type} />
                    {this.state.ingredients.map(ingredient => (
                        <Ingredient
                            type={this.state.menu[ingredient.menuName].type}
                            key={ingredient.id}
                            onClick={this.removeAccurateIngredient.bind(null, ingredient.id)}
                        />
                        ))}
                    <Ingredient type={this.state.menu.breadBottom.type} />
                </div>
                <div>
                    Control elements
                </div>
            </>
        );
    }
}

export default Builder;
