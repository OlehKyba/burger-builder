
export function selectIngredients(state){
    return state.builder.ingredients;
}

export function selectMenu(state){
    return state.builder.menu;
}

export function selectPrice(state){
    return state.builder.price;
}

export function selectMenuError(state){
    return state.builder.errors.menu;
}

export function isMenuFetching(state){
    return Object.keys(state.builder.menu).length < 1 || state.builder.errors.menu;
}
