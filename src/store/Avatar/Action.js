import axios from 'axios';
import { avatarRoute } from '../../utils/APIRoutes';
// import { avatarRoute } from '../utils/APIRoutes';

export const setAvatarImage = (userId, imageData) => async (dispatch) => {
    try {
        const res = await axios.post(`${avatarRoute}/${userId}`, { image: imageData });
        dispatch({ type: 'SET_AVATAR_IMAGE', payload: res.data.image });
    } catch (error) {
        dispatch({ type: 'AVATAR_ERROR', payload: error.response.data });
    }
};

export const fetchAvatars = () => async (dispatch) => {
    const api = 'https://api.multiavatar.com/518';
    try {
        const avatars = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = Buffer(image.data);
            avatars.push(buffer.toString('base64'));
        }
        dispatch({ type: 'FETCH_AVATARS_SUCCESS', payload: avatars });
    } catch (error) {
        dispatch({ type: 'FETCH_AVATARS_ERROR', payload: error.response.data });
    }
};
