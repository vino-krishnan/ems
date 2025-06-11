
import axios from 'axios';

const API_BASE_URL = 'https://ems-backend-production-378d.up.railway.app/api';

export const loginApi = async (credentials) => {
    console.log(credentials,"serviceeeee");
    
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    console.log(response.data);
    
    return response.data; // contains { user, token, role }
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
export const logoutApi = async () => {
    return await fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
};