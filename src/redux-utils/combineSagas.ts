import { all } from "redux-saga/effects";

export default (...sagas) => {
  let functionList = [];
  sagas.forEach(sagaFunctions => {
    functionList = [...functionList, ...Object.values(sagaFunctions)];
  });
  return function*() {
    yield all(functionList.map(saga => saga()));
  };
};
