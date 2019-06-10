import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import middleware from "./redux-store/middleware";

const navMiddleware = createReactNavigationReduxMiddleware(
  state => state.navigation
);
const sagaMiddleware = createSagaMiddleware();
let store;
export const buildStore = navigation => {
  store = createStore(
    rootReducer(navigation),
    applyMiddleware(logger, middleware, navMiddleware, sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require("./rootReducer").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
