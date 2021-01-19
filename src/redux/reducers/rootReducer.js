import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import UIReducer from "./UIReducer";

const rootReducer = combineReducers({
    calendar: calendarReducer,
    ui: UIReducer
})

export default rootReducer;