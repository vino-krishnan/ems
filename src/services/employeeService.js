import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employee';

export const getprofile = async (token) => {
  return await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getManagerInfo = async (token) => {
  return await axios.get(`${API_URL}/manager`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

