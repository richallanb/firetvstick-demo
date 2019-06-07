import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga  from "./rootSaga";
import middleware from "./shows/middleware";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(logger, middleware, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

export default store;
