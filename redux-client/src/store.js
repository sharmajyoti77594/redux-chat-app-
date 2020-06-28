import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import textChangeReducer from "./reducers/auth";
import notifications from "./reducers/notifications";
import userInfoReducer from "./reducers/chat-room";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    textChangeReducer,
    notifications,
    userInfoReducer,
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;