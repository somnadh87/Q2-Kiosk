import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import createEncryptor from 'redux-persist-transform-encrypt';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const encryptor = createEncryptor({
    secretKey: 'Gr3@tW@t3rS@lt@1B2c3D4e5F6g7H8',
    onError: function (error) {
        // Handle the error.
    }
});
const persistedReducer = persistReducer({
    key: window['SessionKey'] ? window['SessionKey'] : 'root',
    storage,
    stateReconciler: hardSet,
    transforms: [encryptor],
    whitelist: []
}, rootReducer)
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
export let persistStoreData = () => {
    let persistor = persistStore(store)
    return { store, persistor }
}
//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;