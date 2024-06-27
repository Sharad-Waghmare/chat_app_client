import axios from 'axios';
import { getMesssageRoute, sendMessageRoute } from '../../utils/APIRoutes';
// import { getMesssageRoute, sendMessageRoute } from '../utils/APIRoutes';

export const fetchMessages = (from, to) => async (dispatch) => {
  try {
    const response = await axios.post(getMesssageRoute, { from, to });
    dispatch({ type: 'FETCH_MESSAGES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_MESSAGES_ERROR', payload: error.response.data });
  }
};

export const sendMessage = (messageData) => async (dispatch) => {
  try {
    const response = await axios.post(sendMessageRoute, messageData);
    dispatch({ type: 'SEND_MESSAGE_SUCCESS', payload: response.data });
    dispatch({ type: 'ADD_MESSAGE', payload: { fromSelf: true, message: messageData.message } });
  } catch (error) {
    dispatch({ type: 'SEND_MESSAGE_ERROR', payload: error.response.data });
  }
};

export const receiveMessage = (message) => (dispatch) => {
  dispatch({ type: 'ADD_MESSAGE', payload: { fromSelf: false, message } });
};
