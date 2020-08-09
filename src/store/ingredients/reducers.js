import {
    ADD_INGREDIENT,
    REMOVE_LAST_INGREDIENT,
    REMOVE_INGREDIENT_BY_ID,
} from "./types";

const generateIngredientId = ingredientType => {
    const suffix = new Date().getTime();
    return `${ingredientType}_${suffix}`;
};

const getMenuNameFromId = ingredientId => ingredientId.split('_')[0];

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
            const menuName = getMenuNameFromId(ingredientId);
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

const initialStore = {
    menu: {
        breadTop: {
            price: 0.1,
            count: 1,
            type: "BreadTop",
            canAdd: false,
            canRemove: false,
        },
        breadBottom: {
            price: 0.1,
            count: 1,
            type: "BreadBottom",
            canAdd: false,
            canRemove: false,
        },
        salad: {
            price: 0.2,
            count: 0,
            type: "Salad",
            canAdd: true,
            canRemove: false,
        },
        cheese: {
            price: 0.3,
            count: 0,
            type: "Cheese",
            canAdd: true,
            canRemove: false,
        },
        bacon: {
            price: 0.45,
            count: 0,
            type: "Bacon",
            canAdd: true,
            canRemove: false,
        },
        onion: {
            price: 0.25,
            count: 0,
            type: "Onion",
            canAdd: true,
            canRemove: false,
        },
        tomato: {
            price: 0.35,
            count: 0,
            type: "Tomato",
            canAdd: true,
            canRemove: false,
        },
        meat: {
            price: 0.75,
            count: 0,
            type: "Meat",
            canAdd: true,
            canRemove: false,
        }
    },
    ingredients: [],
    price: 0.4,
};

const ingredientsReducer = (store = initialStore, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
        {
            const {menuName} = action.payload;
            const ingredientData = store.menu[menuName];
            if (ingredientData.canAdd) {
                const ingredient = {menuName, id: generateIngredientId(menuName)};
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
        }
        case REMOVE_LAST_INGREDIENT:
            return removeIngredient(store, action, REMOVE_LAST_INGREDIENT);
        case REMOVE_INGREDIENT_BY_ID:
            return removeIngredient(store, action, REMOVE_INGREDIENT_BY_ID);
        default:
            return {
                ...store,
            };
    }
};

export default ingredientsReducer;
