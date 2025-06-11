
import axios from 'axios';

const API_BASE_URL = 'https://ems-backend-production-378d.up.railway.app/api'; 

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


export const getMyProfile = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/manager/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data);
    
    return response.data;
};
