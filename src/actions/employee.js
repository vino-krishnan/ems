import { getManagerInfo, getprofile } from '../services/employeeService';


export const fetchProfile = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await getprofile(token);
    dispatch({
      type: 'FETCH_PROFILE_INFO_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: "FETCH_PROFILE_INFO_FAILURE",
      payload: error.message
    });
  }
};


export const fetchManager = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const res = await getManagerInfo(token);

    dispatch({
      type: 'FETCH_MANAGER_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_MANAGER_FAILURE',
      payload: error.message,
    });
  }
};
