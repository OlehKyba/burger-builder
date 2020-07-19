import React, {Component} from "react";
import classes from './Builder.module.css';

import Ingredient from "./Ingredient";
import Controller from "./Controller";

class Builder extends Component{

    state = {
        ingredients: [],

        menu: {
            breadTop: {price: 0.1, count: 1, type:'BreadTop', canAdd: false, canRemove: false},
            breadBottom: {price: 0.1, count: 1, type:'BreadBottom', canAdd: false, canRemove: false},
            salad: {price: 0.2, count: 0, type: 'Salad', canAdd: true, canRemove: false},
            cheese: {price: 0.3, count: 0, type: 'Cheese', canAdd: true, canRemove: false},
            bacon: {price: 0.45, count: 0, type: 'Bacon', canAdd: true, canRemove: false},
            onion: {price: 0.25, count: 0, type: 'Onion', canAdd: true, canRemove: false},
            tomato: {price: 0.35, count: 0, type: 'Tomato', canAdd: true, canRemove: false},
            meat: {price: 0.75, count: 0, type: 'Meat', canAdd: true, canRemove: false},
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
            ingredientData.canRemove = ingredientData.count > 0;
            const price = this.state.price + ingredientData.price;
            const ingredient = {menuName, id: this.getIngredientId(ingredientData)};
            this.setState({
                menu: {...this.state.menu, [menuName]: ingredientData},
                ingredients: [...this.state.ingredients, ingredient],
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
            const pattern = new RegExp('^' + ingredientData.type);
            const index = ingredients.length -1 - [...ingredients].reverse().findIndex(item => pattern.test(item.id));
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
                    {this.state.ingredients.length > 0 ?
                        this.state.ingredients.map(ingredient => (
                        <Ingredient
                            type={this.state.menu[ingredient.menuName].type}
                            key={ingredient.id}
                            onClick={this.removeAccurateIngredient.bind(null, ingredient.id)}
                        />
                        ))
                        : <p>Please start cooking the burger!</p>
                    }
                    <Ingredient type={this.state.menu.breadBottom.type} />
                </div>
                <Controller
                    menu={Object.keys(this.state.menu).filter(key => this.state.menu[key].canAdd)
                        .map(key => ({...this.state.menu[key], menuName: key}))}
                    add={this.addIngredient}
                    remove={this.removeIngredient}
                />
            </>
        );
    }
}

export default Builder;
