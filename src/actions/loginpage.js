import { loginApi, logoutApi } from '../services/loginService';

export const loginUser = (credentials) => {
    return async (dispatch) => {
        try {
            const data = await loginApi(credentials);
            console.log(data, "actionnnnnn");

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: data.user.username,
                    token: data.token,
                    role: data.user.role,
                },
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            localStorage.setItem("id", data.user.id)

        } catch (error) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error,
            });
        }
    };
};
export const logout = () => {
    return async (dispatch) => {
        const data = await logoutApi();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');

        dispatch({ type: 'LOGOUT' });
    };
};