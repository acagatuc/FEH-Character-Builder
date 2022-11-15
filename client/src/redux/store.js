import { createStore } from "redux";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState } from "./localStorage";
const persistedState = loadState();

export const store = createStore(rootReducer, persistedState, composeWithDevTools());
