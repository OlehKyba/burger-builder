import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
} from "./types";

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
