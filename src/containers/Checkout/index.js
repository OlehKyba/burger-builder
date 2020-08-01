import React, {Component} from "react";
import {Switch, Route, withRouter} from "react-router-dom";

import classes from "./Checkout.module.css";

import ContactData from "./ContactData";

import Card from "../../components/UI/Card";
import OrderSummary from "../../components/OrderSummary";

class Checkout extends Component {

    state = {
        ingredients: [],
        price: 0,
    };

    onCheckoutCancel = event => {
        event.preventDefault();
        this.props.history.goBack();
    };

    componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const newState = {ingredients: [], price: 0};

        for (const [key, value] of searchParams){
            if (key === 'price')
                newState.price = +value;
            else
                newState.ingredients.push({type: key, count: +value});
        }

        this.setState(newState);
    }

    render() {
        console.log(this.props.history)
        return (
            <section className={classes.Container}>
                <Card>
                    <OrderSummary menu={this.state.ingredients} price={this.state.price}/>
                </Card>
                <Switch>
                    <Route
                        exact
                        path={this.props.match.url + "/"}
                        render={props => (
                            <ContactData
                                {...props}
                                onCancel={this.onCheckoutCancel}
                                ingredients={this.state.ingredients}
                                price={this.state.price}
                            />)}
                    />
                    <Route path={this.props.match.url + "/:status"} render={props => <p>{props.match.params.status}</p>}/>
                </Switch>
            </section>
        );
    }
}

export default withRouter(Checkout);
