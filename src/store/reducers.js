import { combineReducers } from 'redux';
import kioskReducer from './kiosk/reducer';
const appReducer = combineReducers({
    kioskReducer
});
const rootReducer = (state, action) => {
    return appReducer(state, action)
}
export default rootReducer;