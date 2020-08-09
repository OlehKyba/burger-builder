import {
    ADD_INGREDIENT,
    REMOVE_LAST_INGREDIENT,
    REMOVE_INGREDIENT_BY_ID,
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
