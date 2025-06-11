import axios from 'axios';

const API_URL = 'https://ems-backend-production-378d.up.railway.app/api/employee';

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

