import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import axios from "../../utils/axios/builder";

import Controller from "./Controller";
import Dish from "./Dish";
import OnErrorModal from "./OnErrorModal";

import withErrorHandler from "../../hoc/withErrorHandler";

import OrderSummary from "../../components/OrderSummary";
import Modal from "../../components/UI/Modal";
import ModalBody from "../../components/UI/Modal/ModalBody";
import ModalFooter from "../../components/UI/Modal/ModalFooter";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";

class Builder extends Component{

    state = {
        ingredients: [],
        menu: {},
        price: 0,
        isMenuFetching: true,
        isMenuFetchingFailed: false,
        isCheckoutFetching: false,
        isShowSummary: false,
    }

    checkoutHandler = () => {
        const params = Object.keys(this.state.menu)
            .filter(key => this.state.menu[key].canAdd && this.state.menu[key].count > 0)
            .reduce((accumulator, key) => {
                accumulator[key] = this.state.menu[key].count;
                return accumulator;
            }, {price: this.state.price});

        const search = "?" + Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join("&");
        this.props.history.push({pathname: "/checkout", search});
        this.setState({isCheckoutFetching: false, isShowSummary: false});
        /**
        const ingredients = Object.keys(this.state.menu)
            .filter(key => this.state.menu[key].count > 0)
            .map(key => ({
                type: this.state.menu[key].type,
                count: this.state.menu[key].count,
                menuName: key
            }));

        const order = {
            ingredients,
            price: this.state.price,
            customer: {
                name: "Oleh Kyba",
                address: {
                    street: "Test",
                    zipCode: "12345",
                    country: "Ukraine",
                },
                deliveryType: "fastest",
            }
        };
        this.setState({isCheckoutFetching: true});
        const onAnyResponse = () => this.setState({isCheckoutFetching: false, isShowSummary: false});
        axios.post("/orders/", order)
            .then(onAnyResponse, onAnyResponse);
         **/

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
               this.setState({price, menu, isMenuFetching: false});
            })
            .catch(() => this.setState({isMenuFetching: false, isMenuFetchingFailed: true}));
    }

    render() {
        const menuArray = Object.keys(this.state.menu)
            .filter(key => this.state.menu[key].canAdd)
            .map(key => ({...this.state.menu[key], menuName: key}));
        return (
            <>
                <Modal
                    isShow={this.state.isShowSummary}
                    onCancel={this.checkoutCancelHandler}
                >
                    <Spinner isSpin={this.state.isCheckoutFetching}>
                        <ModalBody>
                            <OrderSummary menu={menuArray} price={this.state.price}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button width={'60px'} onClick={this.checkoutHandler}>Yes</Button>
                            <Button width={'60px'} onClick={this.checkoutCancelHandler} invert>No</Button>
                        </ModalFooter>
                    </Spinner>
                </Modal>
                <Dish
                    ingredients={this.state.ingredients}
                    menu={this.state.menu}
                    onIngredientClick={this.removeAccurateIngredient}
                />
                {
                    this.state.isMenuFetchingFailed ?
                        <p>Sorry, we have an error!</p> :
                        <Spinner isSpin={this.state.isMenuFetching}>
                            <Controller
                                price={this.state.price}
                                menu={menuArray}
                                add={this.addIngredient}
                                remove={this.removeIngredient}
                                onCheckout={this.openCheckoutModal}
                            />
                        </Spinner>
                }
            </>
        );
    }
}

export default withErrorHandler(OnErrorModal, withRouter(Builder), axios);
