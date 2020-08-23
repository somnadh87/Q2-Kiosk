import { all } from 'redux-saga/effects'

import kioskSaga from './kiosk/saga';

export default function* rootSaga() {
    yield all([
        kioskSaga()
    ])
}