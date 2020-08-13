import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    READ_ORDERS_START,
    READ_ORDERS_SUCCESS,
    READ_ORDERS_FAIL,
    SET_ORDERS_STATUS,
} from "./types";

import {selectOrdersPerPage} from "./selectors";

function createOrderStart(){
    return {
        type: CREATE_ORDER_START,
    };
}

function createOrderSuccess(){
    return {
        type: CREATE_ORDER_SUCCESS,
    };
}

function createOrderFail(error){
    return {
        type: CREATE_ORDER_FAIL,
        error,
    };
}

export function createOrder(axios, order){
    return dispatch => {
        dispatch(createOrderStart());
        return axios.post("/orders/", order)
            .then(() => {
                return dispatch(createOrderSuccess());
            })
            .catch(error => {
                dispatch(createOrderFail(error.message));
                return Promise.reject(error);
            });
    };
}

function readOrdersStart(page, status){
    return {
        type: READ_ORDERS_START,
        payload: {page, status},
    };
}

function readOrdersSuccess(response) {
    const orders = response.data;
    const length = response.headers["x-total-count"];
    return {
        type: READ_ORDERS_SUCCESS,
        payload: {
            orders,
            length,
        },
    };
}

function readOrdersFail(error) {
    return {
        type: READ_ORDERS_FAIL,
        error,
    };
}

export function readOrders(axios, params) {
    return (dispatch, getState) => {
        const {page, status, ...other} = params;
        const store = getState();
        const _limit = selectOrdersPerPage(store);
        dispatch(readOrdersStart(page));
        dispatch(setOrdersStatus(status));
        const searchQueryParams = {...other, _limit, _page: page};
        if (status) searchQueryParams.status = status;
        return axios.get("/orders/", {params: searchQueryParams})
            .then(res => {
                dispatch(readOrdersSuccess(res));
                //return res;
            })
            .catch(error => {
                dispatch(readOrdersFail(error.message));
                //return Promise.reject(error);
            });
    };
}

function setOrdersStatus(status) {
    return {
        type: SET_ORDERS_STATUS,
        payload: {status},
    }
}

