const initialState = {
    messages: [],
    isLoading: false,
    error: null,
  };
  
  const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_MESSAGES_SUCCESS':
        return {
          ...state,
          messages: action.payload,
          isLoading: false,
        };
      case 'FETCH_MESSAGES_ERROR':
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case 'SEND_MESSAGE_SUCCESS':
        return {
          ...state,
          isLoading: false,
        };
      case 'SEND_MESSAGE_ERROR':
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };
      case 'ADD_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default messageReducer;
  