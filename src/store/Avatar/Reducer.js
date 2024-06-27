const initialState = {
    avatarImage: null,
    isAvatarImageSet: false,
    avatars: [],
    isLoading: false,
    error: null,
};

const avatarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AVATAR_IMAGE':
            return {
                ...state,
                isAvatarImageSet: true,
                avatarImage: action.payload,
            };
        case 'FETCH_AVATARS_SUCCESS':
            return {
                ...state,
                avatars: action.payload,
                isLoading: false,
            };
        case 'FETCH_AVATARS_ERROR':
        case 'AVATAR_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        case 'FETCH_AVATARS_REQUEST':
            return {
                ...state,
                isLoading: true,
            };
        default:
            return state;
    }
};

export default avatarReducer;
