
export function selectOrders(state){
    return state.orders.orders;
}

export function isCreateOrderLoading(state){
    return state.orders.loading.createOrder;
}

export function selectCreateOrderError(state){
    return state.orders.errors.createOrder;
}
