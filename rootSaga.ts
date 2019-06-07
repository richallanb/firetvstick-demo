import { all } from 'redux-saga/effects';
import * as providerSaga from './provider/sagas';
import combineSagas from './redux-utils/combineSagas';

export default combineSagas(providerSaga);
