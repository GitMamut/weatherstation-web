import { createStore, applyMiddleware, compose} from "redux";
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer, { AppState } from "./rootReducer";
import { Actions } from "../constants/action-types";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,  
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, Actions>))
    );

export default store;
