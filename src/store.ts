import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga  from "./rootSaga";
import middleware from "./redux-store/middleware";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(logger, middleware, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require('./rootReducer').default;
    store.replaceReducer(nextRootReducer)
  })
}

export default store;
