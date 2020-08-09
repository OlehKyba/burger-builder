import {combineReducers} from "redux";
import ingredientsReducer from "./ingredients/reducers";

const rootReducer = combineReducers({
        builder: ingredientsReducer,
    }
);

export default rootReducer;
