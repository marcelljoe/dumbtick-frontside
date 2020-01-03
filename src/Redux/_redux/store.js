import { createStore, combineReducers, applyMiddleware } from "redux";
import HomeReducers from "../_reducers/HomeReducers";
import EventsByCategoryReducers from "../_reducers/EventsByCategoryReducers";
import EventDetailReducers from "../_reducers/EventDetailReducers";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

const middlewares = [logger, promiseMiddleware];

const reducers = combineReducers({
  HomeReducers,
  EventsByCategoryReducers,
  EventDetailReducers
});

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
