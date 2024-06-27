import axios from 'axios';
import { loginRoute, registerRoute } from '../../utils/APIRoutes';

export const login = (userData) => async (dispatch) => {
    dispatch({ type: 'USER_LOADING' });
    try {
        const res = await axios.post(loginRoute, userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
};

export const register = (userData) => async (dispatch) => {
    dispatch({ type: 'USER_LOADING' });
    try {
        const res = await axios.post(registerRoute, userData);
        
        dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
    }
};
