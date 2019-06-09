import * as providerSaga from './redux-store/sagas';
import combineSagas from './redux-utils/combineSagas';

export default combineSagas(providerSaga);
