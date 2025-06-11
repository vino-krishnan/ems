// src/actions/manager.js
import axios from 'axios';
import { addNewEmployee, deleteEmployeeApi, getEmployees, updateEmployeeById } from '../services/managerService';



export const fetchEmployees = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await getEmployees(token);
        dispatch({ type: "FETCH_EMPLOYEES_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "FETCH_EMPLOYEES_ERROR", payload: error.message });
    }
};

export const deleteEmployee = (user_id) => async (dispatch) => {
    console.log(user_id, "in actionnnnn");
    try {
        const token = localStorage.getItem('token');
        const response = await deleteEmployeeApi(user_id, token);
        dispatch({ type: "DELETE_EMPLOYEES_SUCCESS", payload: response.data });

    } catch (error) {
        dispatch({ type: "DELETE_EMPLOYEES_ERROR", payload: error.message });

    }
}

export const updateEmployee = (id, employeeData) => async (dispatch) => {
    try {
        // const res = await axios.put(`/api/manager/employee/${employeeData.user_id}`, employeeData);
        const token = localStorage.getItem('token');
        const response = await updateEmployeeById(id, employeeData, token);
        dispatch({ type: 'UPDATE_EMPLOYEE_SUCCESS', payload: response.data });
        // dispatch({ type: 'UPDATE_EMPLOYEE_SUCCESS', payload: updatedEmployee });
    } catch (error) {
        dispatch({ type: 'UPDATE_EMPLOYEE_FAIL', payload: error.message });
    }
};

// export const addEmployee = (employeeData) => async (dispatch) => {

//     try {
//         const token = localStorage.getItem('token');
//          const id = localStorage.getItem('id');
//         console.log(employeeData);
//         const response = await addNewEmployee(employeeData, token);
//         dispatch({ type: 'ADD_EMPLOYEE_SUCCESS', payload: response.data });
//     } catch (error) {
//         dispatch({ type: 'ADD_EMPLOYEE_FAIL', payload: error.message });
//     }
// };

export const addEmployee = (employeeData) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id'); // this is the manager's user id

        // Add user_id to employeeData
        const updatedData = {
            ...employeeData,
            manager_id: id
        };

        console.log(updatedData);

        const response = await addNewEmployee(updatedData, token);
        dispatch({ type: 'ADD_EMPLOYEE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'ADD_EMPLOYEE_FAIL', payload: error.message });
    }
};
