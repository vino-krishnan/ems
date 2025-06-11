// src/services/managerService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // change to your backend URL

export const getEmployees = async (token) => {
    return await axios.get(`${API_BASE_URL}/manager/employees`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteEmployeeApi = async (id, token) => {
    return await axios.delete(`${API_BASE_URL}/manager/employee/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateEmployeeById = async (id, data, token) => {
    return await axios.put(`${API_BASE_URL}/manager/employee/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const addNewEmployee = async ( data, token) => {
    return await axios.post(`${API_BASE_URL}/manager/employee/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}