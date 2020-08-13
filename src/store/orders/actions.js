import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    READ_ORDERS_START,
    READ_ORDERS_SUCCESS,
    READ_ORDERS_FAIL,
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

function readOrdersStart(page){
    return {
        type: READ_ORDERS_START,
        payload: {page},
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
        const _limit = selectOrdersPerPage(getState());
        dispatch(readOrdersStart(params.page));
        return axios.get("/orders/", {params: {...params, _limit, _page: params.page}})
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
