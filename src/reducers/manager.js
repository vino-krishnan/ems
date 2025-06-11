// src/reducers/manager.js
// import { FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_ERROR } from '../actions/manager';

const initialState = {
    employees: [],
    error: null,
    deleteEmp: null
};

const managerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_EMPLOYEES_SUCCESS":
            return { ...state, employees: action.payload };
        case "FETCH_EMPLOYEES_ERROR":
            return { ...state, error: action.payload };
        case "DELETE_EMPLOYEES_SUCCESS":
            return { ...state, deleteEmp: action.payload };
        case "DELETE_EMPLOYEES_ERROR":
            return { ...state, error: action.payload };
        case 'UPDATE_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employees: {
                    ...state.employees,
                    employees: state.employees.employees.map(emp =>
                        emp.user_id === action.payload.user_id ? action.payload : emp
                    )
                },
                error: null
            };

        case 'UPDATE_EMPLOYEE_FAIL':
            return {
                ...state,
                error: action.payload
            };
        case 'ADD_EMPLOYEE_SUCCESS':
            return {
                ...state,
                employees: {
                    ...state.employees,
                    employees: [...state.employees.employees, action.payload]  // Add new employee to list
                },
                error: null
            };
        case 'ADD_EMPLOYEE_FAIL':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default managerReducer;
