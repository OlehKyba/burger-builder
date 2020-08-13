
export function selectOrders(state){
    return state.orders.orders;
}

export function isCreateOrderLoading(state){
    return state.orders.loading.createOrder;
}

export function selectCreateOrderError(state){
    return state.orders.errors.createOrder;
}

export function isOrdersReading(state){
    return state.orders.loading.readOrders;
}

export function selectReadOrdersError(state){
    return state.orders.errors.readOrders;
}

export function selectMaxPage(state){
    return state.orders.maxPage;
}

export function selectOrdersPerPage(state){
    return state.orders.ordersPerPage;
}

export function selectCurrentPage(state){
    return state.orders.currentPage;
}
