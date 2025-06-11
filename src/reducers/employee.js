// // import {
// //   FETCH_MANAGER_INFO_SUCCESS,
// //   FETCH_MANAGER_INFO_FAILURE
// // } from '../actions/employeeActions';

// const initialState = {
//   profileInfo: null,
//   error: null
// };

// const employeeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'FETCH_PROFILE_INFO_SUCCESS':
//       return {
//         ...state,
//         profileInfo: action.payload,
//         error: null
//       };
//     case 'FETCH_PROFILE_INFO_FAILURE':
//       return {
//         ...state,
//         profileInfo: null,
//         error: action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default employeeReducer;




const initialState = {
  profileInfo: null,
  managerInfo: null,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE_INFO_SUCCESS':
      return {
        ...state,
        profileInfo: action.payload,
        error: null
      };
    case 'FETCH_PROFILE_INFO_FAILURE':
      return {
        ...state,
        profileInfo: null,
        error: action.payload
      };
    case 'FETCH_MANAGER_SUCCESS':
      return { ...state, managerInfo: action.payload };
    case 'FETCH_MANAGER_FAILURE':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default employeeReducer;
