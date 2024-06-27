const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('chat-app-user', JSON.stringify(action.payload.user));
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            localStorage.removeItem('chat-app-user');
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
