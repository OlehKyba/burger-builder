import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
} from "./types";

const createOrderStart = store => {
    return {
        ...store,
        loading: {
            ...store.loading,
            createOrder: true,
        },
        errors: {
            ...store.errors,
            createOrder: null,
        },
    };
};

const createOrderSuccess = store => {
    return {
        ...store,
        loading: {
            ...store.loading,
            createOrder: false,
        },
    }
};

const createOrderFail = (store, action) => {
    const error = action.error;
    return {
        ...store,
        loading: {
            ...store.loading,
            createOrder: false,
        },
        errors: {
            ...store.errors,
            createOrder: error,
        }
    }
};

const initialStore = {
    orders: [],
    loading: {
        createOrder: false,
    },
    errors: {
        createOrder: null,
    }
};

const ordersReducer = (store = initialStore, action) => {
    switch (action.type){
        case CREATE_ORDER_START:
            return createOrderStart(store);
        case CREATE_ORDER_SUCCESS:
            return createOrderSuccess(store);
        case CREATE_ORDER_FAIL:
            return createOrderFail(store, action);
        default:
            return store;
    }
};

export default ordersReducer;
