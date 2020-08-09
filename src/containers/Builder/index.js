import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import classes from "./Builder.module.css";

import axios from "../../utils/axios/builder";

import {
    addIngredient,
    removeLastIngredient,
    removeIngredientById,
} from "../../store/ingredients/actions";
import {
    selectMenu,
    selectIngredients,
    selectPrice,
} from "../../store/ingredients/selectors";

import Controller from "./Controller";
import Dish from "./Dish";
import OnErrorModal from "../OnErrorModal";

import withErrorHandler from "../../hoc/withErrorHandler";

import OrderSummary from "../../components/OrderSummary";
import Modal from "../../components/UI/Modal";
import ModalBody from "../../components/UI/Modal/ModalBody";
import ModalFooter from "../../components/UI/Modal/ModalFooter";
import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import Result from "../../components/UI/Result";

class Builder extends Component{

    state = {
        error: null,
        isMenuFetching: false,
        isCheckoutFetching: false,
        isShowSummary: false,
    }

    checkoutHandler = () => {
        this.props.history.push("/checkout");
        this.setState({isCheckoutFetching: false, isShowSummary: false});
    };

    checkoutCancelHandler = () => {
        this.setState({isShowSummary: false});
    };

    openCheckoutModal = () => {
        this.setState({isShowSummary: true});
    };

    /**
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
            .catch(error => this.setState({isMenuFetching: false, error: error.message}));
    }
     **/

    render() {
        const menuArray = Object.keys(this.props.menu)
            .filter(key => this.props.menu[key].canAdd)
            .map(key => ({...this.props.menu[key], menuName: key}));
        return (
            <>
                <Modal
                    isShow={this.state.isShowSummary}
                    onCancel={this.checkoutCancelHandler}
                >
                    <Spinner isSpin={this.state.isCheckoutFetching}>
                        <ModalBody>
                            <OrderSummary menu={menuArray} price={this.props.price}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button width={'60px'} onClick={this.checkoutHandler}>Yes</Button>
                            <Button width={'60px'} onClick={this.checkoutCancelHandler} invert>No</Button>
                        </ModalFooter>
                    </Spinner>
                </Modal>
                <Dish
                    ingredients={this.props.ingredients}
                    menu={this.props.menu}
                    onIngredientClick={this.props.removeIngredientById}
                />
                {
                    this.state.error ?
                        <div className={classes.ErrorContainer}>
                            <Result status={"error"}>
                                <h3>Error!</h3>
                                <p>{this.state.error}</p>
                            </Result>
                        </div>:
                        <Spinner isSpin={this.state.isMenuFetching}>
                            <Controller
                                price={this.props.price}
                                menu={menuArray}
                                add={this.props.addIngredient}
                                remove={this.props.removeLastIngredient}
                                onCheckout={this.openCheckoutModal}
                            />
                        </Spinner>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: selectIngredients(state),
    menu: selectMenu(state),
    price: selectPrice(state),
});

const mapDispatchToProps = {
    addIngredient,
    removeLastIngredient,
    removeIngredientById,
};


export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(
        OnErrorModal,
        withRouter(Builder),
        axios
    )
);
