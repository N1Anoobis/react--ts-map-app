import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { intelReducer } from './intelReducer';

export const rootReducer = combineReducers({
    posts: postReducer,
    intel: intelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
