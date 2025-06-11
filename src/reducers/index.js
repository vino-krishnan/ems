import { combineReducers } from "redux";
// import counterReducer from "./counter";
import authReducer from './loginpage';
import employeeReducer from "./employee";
import managerReducer from './manager'

const rootReducer = combineReducers({
     auth: authReducer, employee: employeeReducer, manager: managerReducer,
})

export default rootReducer