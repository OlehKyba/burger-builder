import {combineReducers} from "redux";
import ingredientsReducer from "./ingredients/reducers";
import ordersReducer from "./orders/reducers";

const rootReducer = combineReducers({
        builder: ingredientsReducer,
        orders: ordersReducer,
    }
);

export default rootReducer;
