// import axios from 'axios';

// export const loginApi = async (credentials) => {
//     return await axios.post('http://localhost:5000/api/auth/login', credentials);
// };
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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
