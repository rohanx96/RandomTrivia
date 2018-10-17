//@flow
import persistedReducer from "./reducers";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import Reactotron from './../../ReactotronConfig'

const enhancer = applyMiddleware(thunkMiddleware);

export const store = Reactotron.createStore(persistedReducer, {}, enhancer);

export const persistor = persistStore(store);
