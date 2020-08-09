import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import classes from "./Builder.module.css";

import axios from "../../utils/axios/builder";

import {
    selectMenu,
    selectIngredients,
    selectPrice,
    selectMenuError,
    isMenuFetching,
    addIngredient,
    removeLastIngredient,
    removeIngredientById,
    fetchMenu,
} from "../../store/ingredients";

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
        isShowSummary: false,
    }

    checkoutHandler = () => {
        this.props.history.push("/checkout");
        this.setState({isShowSummary: false});
    };

    checkoutCancelHandler = () => {
        this.setState({isShowSummary: false});
    };

    openCheckoutModal = () => {
        this.setState({isShowSummary: true});
    };


    componentDidMount() {
        if (Object.keys(this.props.menu).length < 1)
            this.props.fetchMenu(axios);
    }

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
                    <ModalBody>
                        <OrderSummary menu={menuArray} price={this.props.price}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button width={'60px'} onClick={this.checkoutHandler}>Yes</Button>
                        <Button width={'60px'} onClick={this.checkoutCancelHandler} invert>No</Button>
                    </ModalFooter>
                </Modal>
                <Dish
                    ingredients={this.props.ingredients}
                    menu={this.props.menu}
                    onIngredientClick={this.props.removeIngredientById}
                />
                {
                    this.props.error ?
                        <div className={classes.ErrorContainer}>
                            <Result status={"error"}>
                                <h3>Error!</h3>
                                <p>{this.props.error}</p>
                            </Result>
                        </div>:
                        <Spinner isSpin={this.props.isMenuFetching}>
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
    error: selectMenuError(state),
    isMenuFetching: isMenuFetching(state),
});

const mapDispatchToProps = {
    addIngredient,
    removeLastIngredient,
    removeIngredientById,
    fetchMenu,
};


export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(
        OnErrorModal,
        withRouter(Builder),
        axios
    )
);
