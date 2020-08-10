import {
    ADD_INGREDIENT,
    REMOVE_LAST_INGREDIENT,
    REMOVE_INGREDIENT_BY_ID,
    SET_MENU,
    MENU_FETCH_ERROR,
    RESET_INGREDIENTS,
} from "./types";

export function addIngredient(menuName){
    return {
        type: ADD_INGREDIENT,
        payload: {menuName},
    };
}

export function removeLastIngredient(menuName){
    return {
        type: REMOVE_LAST_INGREDIENT,
        payload: {menuName},
    };
}

export function removeIngredientById(id){
    return {
        type: REMOVE_INGREDIENT_BY_ID,
        payload: {id},
    };
}

export function resetIngredients(){
    return {
        type: RESET_INGREDIENTS,
    };
}


export function setMenu(menu){
    return {
        type: SET_MENU,
        payload: {menu},
    }
}

export function menuFetchError(error){
    return {
        type: MENU_FETCH_ERROR,
        error,
    }
}

export function fetchMenu(axios){
    return dispatch => {
        return axios.get("/menu/")
            .then(res => {
                const menu = res.data;
                dispatch(setMenu(menu));
            })
            .catch(error => dispatch(menuFetchError(error.message)));
    };
}
