import { combineReducers } from "redux";
import UIReducer from "./UIReducer";

const rootReducer = combineReducers({
    ui: UIReducer
})

export default rootReducer;