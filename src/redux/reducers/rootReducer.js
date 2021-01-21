import { combineReducers } from "redux";
import authReducer from "./authReducer";
import calendarReducer from "./calendarReducer";
import UIReducer from "./UIReducer";

const rootReducer = combineReducers({
    calendar: calendarReducer,
    ui: UIReducer,
    auth: authReducer
})

export default rootReducer;