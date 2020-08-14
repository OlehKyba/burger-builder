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
    selectStatus,
} from "../../store/orders";

import classes from "./Orders.module.css";

import withErrorHandler from "../../hoc/withErrorHandler";

import Order from "./Order";
import OnErrorModal from "../OnErrorModal";
import Spinner from "../../components/UI/Spinner";
import Result from "../../components/UI/Result";
import Pagination from "../../components/UI/Pagination";
import Select from "../../components/UI/Select";
import Option from "../../components/UI/Select/Option";

class Orders extends Component {

    onPageChangeHandler = page => {
        const statusSuffix = this.props.status ? `&status=${this.props.status}` : '';
        this.props.history.push(this.props.match.url + `?page=${page}` + statusSuffix);
    };


    onStatusFilterChangeHandler = event => {
        const status = event.target.value;
        const statusSuffix = status ? `&status=${status}` : '';
        this.props.history.push(this.props.match.url + '?page=1' + statusSuffix);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            const params = Object.fromEntries(new URLSearchParams(this.props.location.search));
            const page = Number.parseInt(params.page) || 1;
            this.props.readOrders(axios, {page, status: params.status || ''});
        }
    }

    componentDidMount() {
        const params = Object.fromEntries(new URLSearchParams(this.props.location.search));
        const page = Number.parseInt(params.page) || 1;
        this.props.readOrders(axios, {page, status: params.status || ''});
    }

    render() {
        const orders = this.props.orders.map(order => {
            return (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    customer={order.customer}
                    price={order.price}
                />
                );
        });

        const error = (
            <div className={classes.ContainerBody}>
                <Result status={"error"}>
                    <h3>Error!</h3>
                    <p>{this.props.error}</p>
                </Result>
            </div>
        );

        return (
            <>
                <Spinner isSpin={this.props.isLoading}>
                    <div className={classes.Container}>
                        <div className={classes.ContainerHeader}>
                            <Select field={{
                                value: this.props.status,
                                onChange: this.onStatusFilterChangeHandler,
                            }}>
                                <Option value={''}>All</Option>
                                <Option value={'ready'}>Ready</Option>
                                <Option value={'cooking'}>Cooking</Option>
                            </Select>
                        </div>
                        <section className={classes.ContainerBody}>
                            {this.props.error ? error : orders}
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
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: selectOrders(state),
        isLoading: isOrdersReading(state),
        error: selectReadOrdersError(state),
        currentPage: selectCurrentPage(state),
        maxPage: selectMaxPage(state),
        status: selectStatus(state),
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
