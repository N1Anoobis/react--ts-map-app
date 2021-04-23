import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
// import { xxx } from './xxx';

export const rootReducer = combineReducers({
    post: postReducer,
    // xx: xxx
});

export type RootState = ReturnType<typeof rootReducer>;