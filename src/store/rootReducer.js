import { combineReducers } from "redux";
import userReducer from "./User/Reducer";
import messageReducer from "./Message/Reducer";
import avatarReducer from "./Avatar/Reducer";



const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    avatar: avatarReducer,

})

export default rootReducer;