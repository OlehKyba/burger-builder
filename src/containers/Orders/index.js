import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import axios from "../../utils/axios/builder";

import classes from "./Orders.module.css";

import withErrorHandler from "../../hoc/withErrorHandler";

import Order from "./Order";
import OnErrorModal from "../OnErrorModal";
import Spinner from "../../components/UI/Spinner";
import Result from "../../components/UI/Result";

class Orders extends Component {

    state = {
        orders: [],
        isLoading: true,
        error: null,
    };

    componentDidMount() {
        axios.get("/orders/", {params: {_page: 1}})
            .then(res => {
                this.setState({orders: res.data, isLoading: false});
            }, error => {
                this.setState({isLoading: false, error: error.message});
            })
            .catch(error => {
                this.setState({isLoading: false, error: error.message});
            });
    }

    render() {
        const orders = (
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

        const error = (
            <div className={classes.ErrorContainer}>
                <Result status={"error"}>
                    <h3>Error!</h3>
                    <p>{this.state.error}</p>
                </Result>
            </div>
        );

        return this.state.error ? error : orders;
    }
}

export default withErrorHandler(OnErrorModal, withRouter(Orders), axios);
