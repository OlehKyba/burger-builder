import {
    CREATE_ORDER_START,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    READ_ORDERS_START,
    READ_ORDERS_SUCCESS,
    READ_ORDERS_FAIL,
    SET_ORDERS_STATUS,
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

const readOrdersStart = (store, action) => {
    const {page} = action.payload;
    return {
        ...store,
        loading: {
            ...store.loading,
            readOrders: true,
        },
        errors: {
            ...store.errors,
            readOrders: null,
        },
        currentPage: page,
    };
};

const readOrdersSuccess = (store, action) => {
    const {orders, length} = action.payload;
    const {ordersPerPage} = store;
    const maxPage = Math.ceil(length / ordersPerPage);
    return {
        ...store,
        loading: {
            ...store.loading,
            readOrders: false,
        },
        orders,
        maxPage,
    }
};

const readOrdersFail = (store, action) => {
    const error = action.error;
    return {
        ...store,
        loading: {
            ...store.loading,
            readOrders: false,
        },
        errors: {
            ...store.errors,
            readOrders: error,
        }
    }
};

const setOrdersStatus = (store, action) => {
    return {
        ...store,
        status: action.payload.status,
    };
};

const initialStore = {
    orders: [],
    currentPage: 1,
    status: '',
    ordersPerPage: 5,
    maxPage: undefined,
    loading: {
        createOrder: false,
        readOrders: false,
    },
    errors: {
        createOrder: null,
        readOrders: null,
    },
};

const ordersReducer = (store = initialStore, action) => {
    switch (action.type){
        case CREATE_ORDER_START:
            return createOrderStart(store);
        case CREATE_ORDER_SUCCESS:
            return createOrderSuccess(store);
        case CREATE_ORDER_FAIL:
            return createOrderFail(store, action);
        case READ_ORDERS_START:
            return readOrdersStart(store, action);
        case READ_ORDERS_SUCCESS:
            return readOrdersSuccess(store, action);
        case READ_ORDERS_FAIL:
            return readOrdersFail(store, action);
        case SET_ORDERS_STATUS:
            return setOrdersStatus(store, action);
        default:
            return store;
    }
};

export default ordersReducer;
