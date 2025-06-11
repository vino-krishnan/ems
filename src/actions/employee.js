import { getManagerInfo, getprofile } from '../services/employeeService';

// export const FETCH_MANAGER_INFO_SUCCESS = 'FETCH_MANAGER_INFO_SUCCESS';
// export const FETCH_MANAGER_INFO_FAILURE = 'FETCH_MANAGER_INFO_FAILURE';

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

// export const FETCH_MANAGER_SUCCESS = 'FETCH_MANAGER_SUCCESS';
// export const FETCH_MANAGER_FAILURE = 'FETCH_MANAGER_FAILURE';

// import { getManagerInfo } from '../services/employeeService';

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
