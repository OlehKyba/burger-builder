import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import axios from "../../utils/axios/builder";

import {
    selectOrders,
    selectMaxPage,
    selectCurrentPage,
    isOrdersReading,
    selectReadOrdersError,
    readOrders,
} from "../../store/orders";

import classes from "./Orders.module.css";

import withErrorHandler from "../../hoc/withErrorHandler";

import Order from "./Order";
import OnErrorModal from "../OnErrorModal";
import Spinner from "../../components/UI/Spinner";
import Result from "../../components/UI/Result";
import Pagination from "../../components/UI/Pagination";

class Orders extends Component {

    onPageChangeHandler = page => {
        this.props.history.push(this.props.match.url + `?page=${page}`);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            const params = Object.fromEntries(new URLSearchParams(this.props.location.search));
            const page = Number.parseInt(params.page) || 1;
            this.props.readOrders(axios, {page});
        }
    }

    componentDidMount() {
        const params = Object.fromEntries(new URLSearchParams(this.props.location.search));
        const page = Number.parseInt(params.page) || 1;
        this.props.readOrders(axios, {page});
    }

    render() {
        const orders = (
            <Spinner isSpin={this.props.isLoading}>
                <div className={classes.Container}>
                    <section className={classes.ContainerBody}>
                        {this.props.orders.map(order => {
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
                    <div className={classes.ContainerFooter}>
                        <Pagination
                            maxPage={this.props.maxPage}
                            currentPage={this.props.currentPage}
                            onPageChange={this.onPageChangeHandler}
                        />
                    </div>
                </div>
            </Spinner>
        );

        const error = (
            <div className={classes.ContainerBody}>
                <Result status={"error"}>
                    <h3>Error!</h3>
                    <p>{this.props.error}</p>
                </Result>
            </div>
        );

        return this.props.error ? error : orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: selectOrders(state),
        isLoading: isOrdersReading(state),
        error: selectReadOrdersError(state),
        currentPage: selectCurrentPage(state),
        maxPage: selectMaxPage(state),
    };
};

const mapDispatchToProps = {
    readOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withErrorHandler(
        OnErrorModal,
        withRouter(Orders),
        axios
    )
);
