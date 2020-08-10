import React, {Component} from "react";
import {connect} from "react-redux";
import {Switch, Route, withRouter} from "react-router-dom";

import classes from "./Checkout.module.css";

import axios from "../../utils/axios/builder";

import {
    selectIngredients,
    selectMenu,
    selectPrice,
    resetIngredients,
} from "../../store/ingredients";

import {
    isCreateOrderLoading,
    selectCreateOrderError,
    createOrder,
} from "../../store/orders";

import ContactData from "./ContactData";
import Card from "../../components/UI/Card";
import OrderSummary from "../../components/OrderSummary";
import Result from "../../components/UI/Result";
import Spinner from "../../components/UI/Spinner";

class Checkout extends Component {

    state = {
        name: '',
        email: '',
        address: '',
        phoneNumber: '',
        deliveryType: 'cheapest',
    };

    onCheckoutCancel = event => {
        event.preventDefault();
        this.props.history.goBack();
    };

    onCheckoutSubmit = customer => {
        const ingredients = Object.keys(this.props.menu)
            .filter(key => this.props.menu[key].canAdd && this.props.menu[key].count > 0)
            .map(key => ({type: key, count: this.props.menu[key].count}));

        const order = {
            price: this.props.price,
            ingredients,
            customer,
        };
        this.props.createOrder(axios, order)
            .then(() => {
                this.props.resetIngredients();
                const path = this.props.match.url + '/success';
                this.props.history.replace(path);
            })
            .catch(() => {
                const path = this.props.match.url + '/error';
                this.props.history.push(path);
            });
    };

    render() {
        const menuArray = Object.keys(this.props.menu)
            .filter(key => this.props.menu[key].canAdd && this.props.menu[key].count > 0)
            .map(key => ({...this.props.menu[key], menuName: key}));

        const path = this.props.location.pathname.split('/');
        const isShowSummary = path[path.length - 1] !== 'success'
        return (
            <section className={classes.Container}>
                {isShowSummary &&
                <Card>
                    <OrderSummary
                        menu={menuArray}
                        price={this.props.price}
                    />
                </Card>}
                <Switch>
                    <Route
                        exact
                        path={this.props.match.url + "/"}
                        render={() => (
                            <Spinner isSpin={this.props.isCreateOrderLoading}>
                                <ContactData
                                    initialValues={{
                                        name: this.state.name,
                                        email: this.state.email,
                                        phoneNumber: this.state.phoneNumber,
                                        address: this.state.address,
                                        deliveryType: this.state.deliveryType,
                                    }}
                                    onSubmit={this.onCheckoutSubmit}
                                    onCancel={this.onCheckoutCancel}
                                />
                            </Spinner>
                        )}
                    />
                    <Route
                        path={this.props.match.url + "/success"}
                        render={() => (
                            <div style={{height: "100%", display:"flex", justifyContent: "center", alignItems: "center"}}>
                            <Result
                                status={"success"}
                            >
                                <h2>Success!</h2>
                                <p>Thank you for your choice!</p>
                            </Result>
                            </div>)}
                    />
                    <Route
                        path={this.props.match.url + "/error"}
                        render={() => {
                            return (
                                <div style={{height: "100%", display:"flex", justifyContent: "center", alignItems: "center"}}>
                                    <Result
                                        status={"error"}
                                    >
                                        <h4>Error!</h4>
                                        <p>{this.props.createOrderError}</p>
                                    </Result>
                                </div>
                            );
                        }}
                    />
                </Switch>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: selectIngredients(state),
    menu: selectMenu(state),
    price: selectPrice(state),
    isCreateOrderLoading: isCreateOrderLoading(state),
    createOrderError: selectCreateOrderError(state),
});

const mapDispatchToProps = {
    createOrder,
    resetIngredients,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
