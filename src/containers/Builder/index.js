import React, {Component} from "react";

import axios from "../../utils/axios/builder";

import Controller from "./Controller";
import Dish from "./Dish";
import OrderSummary from "./OrderSummary";
import Modal from "../../components/UI/Modal";

class Builder extends Component{

    state = {
        ingredients: [],
        menu: {},
        price: 0,
        isFetching: true,
        isShowSummary: false,
    }

    checkoutHandler = () => {
      alert("Checkout success!");
      this.setState({isShowSummary: false});
    };

    checkoutCancelHandler = () => {
        this.setState({isShowSummary: false});
    };

    openCheckoutModal = () => {
        this.setState({isShowSummary: true});
    };


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


    componentDidMount() {
        axios.get("/menu/")
            .then(res => {
               const menu = res.data;
               const price = Object.keys(menu)
                   .filter(key => menu[key].count > 0)
                   .map(key => menu[key].price * menu[key].count)
                   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
               this.setState({price, menu, isFetching: false});
            });
    }

    render() {
        const menuArray = Object.keys(this.state.menu)
            .filter(key => this.state.menu[key].canAdd)
            .map(key => ({...this.state.menu[key], menuName: key}));
        return (
            <>
                <Modal
                    isShow={this.state.isShowSummary}
                    onSubmit={this.checkoutHandler}
                    onCancel={this.checkoutCancelHandler}
                >
                    <OrderSummary menu={menuArray}/>
                </Modal>
                <Dish
                    ingredients={this.state.ingredients}
                    menu={this.state.menu}
                    onIngredientClick={this.removeAccurateIngredient}
                />
                <Controller
                    isFetching={this.state.isFetching}
                    price={this.state.price}
                    menu={menuArray}
                    add={this.addIngredient}
                    remove={this.removeIngredient}
                    onCheckout={this.openCheckoutModal}
                />
            </>
        );
    }
}

export default Builder;
