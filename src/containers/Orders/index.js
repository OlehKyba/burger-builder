import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import axios from "../../utils/axios/builder";

import classes from "./Orders.module.css";

import Order from "./Order";
import Spinner from "../../components/UI/Spinner";

class Orders extends Component {

    state = {
        orders: [],
        isLoading: true,
    };

    componentDidMount() {
        axios.get("/orders/", {params: {_page: 1}})
            .then(res => {
                this.setState({orders: res.data, isLoading: false});
            })
    }

    render() {
        return (
            <Spinner isSpin={this.state.isLoading}>
                <section className={classes.Container}>
                    {this.state.orders.map(order => {
                        return (
                            <Order
                                key={order.id}
                                ingredients={order.ingredients}
                                customer={order.customer}
                                price={order.price}
                            />
                        );
                    })}
                </section>
            </Spinner>
        );
    }
}

export default withRouter(Orders);
