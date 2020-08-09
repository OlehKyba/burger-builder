import {
    ADD_INGREDIENT,
    REMOVE_LAST_INGREDIENT,
    REMOVE_INGREDIENT_BY_ID,
    SET_MENU,
    MENU_FETCH_ERROR,
} from "./types";

class Ingredient {
    constructor(menuName) {
        this.menuName = menuName;
        this.id = Ingredient.generateIngredientId(menuName);
    }

    static generateIngredientId = ingredientType => {
        const suffix = new Date().getTime();
        return `${ingredientType}_${suffix}`;
    };

    static getMenuNameFromId = ingredientId => ingredientId.split('_')[0];
}

const removeStrategies = {
    [REMOVE_LAST_INGREDIENT]: {
        selectFromMenu: (action, menu) => {
            const {menuName} = action.payload;
            return [menu[menuName], menuName];
        },
        ingredientsThunk: (action, ingredients) => {
            const {menuName} = action.payload;
            const newIngredients = [...ingredients];
            const pattern = new RegExp('^' + menuName);
            const index = newIngredients.length - 1 - [...newIngredients].reverse().findIndex(item => pattern.test(item.id));
            newIngredients.splice(index, 1);
            return newIngredients;
        },
    }
    ,
    [REMOVE_INGREDIENT_BY_ID]: {
        selectFromMenu: (action, menu) => {
            const ingredientId = action.payload.id;
            const menuName = Ingredient.getMenuNameFromId(ingredientId);
            return [menu[menuName], menuName];
        },

        ingredientsThunk: (action, ingredients) => {
            const ingredientId = action.payload.id;
            const newIngredients = [...ingredients];
            const index = newIngredients.findIndex(item => item.id === ingredientId);
            newIngredients.splice(index, 1);
            return newIngredients;
        },
    },
};

const removeIngredient = (store, action, removeStrategy) => {
    const strategy = removeStrategies[removeStrategy];
    const [ingredientData, menuName] = strategy.selectFromMenu(action, store.menu);
    if (ingredientData.canRemove) {
        const ingredients = strategy.ingredientsThunk(action, store.ingredients);
        return {
            ...store,
            menu: {
                ...store.menu,
                [menuName]: {
                    ...store.menu[menuName],
                    count: ingredientData.count - 1,
                    canRemove: ingredientData.count - 1 > 0,
                },
            },
            ingredients,
            price: store.price - ingredientData.price,
        };
    }
    return store;
};

const addIngredient = (store, action) => {
    const {menuName} = action.payload;
    const ingredientData = store.menu[menuName];
    if (ingredientData.canAdd) {
        const ingredient = new Ingredient(menuName);
        return {
            ...store,
            menu: {
                ...store.menu,
                [menuName]: {
                    ...store.menu[menuName],
                    count: ingredientData.count + 1,
                    canRemove: ingredientData.count + 1 > 0,
                },
            },
            ingredients: [
                ...store.ingredients,
                ingredient
            ],
            price: store.price + ingredientData.price,
        };
    }
    return store;
};

const setMenu = (store, action) => {
    const {menu} = action.payload;
    const ingredientsNotZeroKeys = Object.keys(menu).filter(key => menu[key].count > 0);

    const ingredients = ingredientsNotZeroKeys
        .filter(key => menu[key].canAdd)
        .map(key => new Ingredient(key));

    const price = ingredientsNotZeroKeys
        .map(key => menu[key].price * menu[key].count)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return {
        ...store,
        menu,
        ingredients,
        price,
        errors: {
            ...store.errors,
            menu: null,
        },
    };
};

const onMenuFetchError = (store, action) => {
    const error = action.error;
    return {
        ...store,
        errors: {
            ...store.errors,
            menu: error,
        },
    }
};

const initialStore = {
    menu: {},
    ingredients: [],
    price: 0,
    errors: {},
};

const ingredientsReducer = (store = initialStore, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return addIngredient(store, action);
        case REMOVE_LAST_INGREDIENT:
            return removeIngredient(store, action, REMOVE_LAST_INGREDIENT);
        case REMOVE_INGREDIENT_BY_ID:
            return removeIngredient(store, action, REMOVE_INGREDIENT_BY_ID);
        case SET_MENU:
            return setMenu(store, action);
        case MENU_FETCH_ERROR:
            return onMenuFetchError(store, action);
        default:
            return store;
    }
};

export default ingredientsReducer;
