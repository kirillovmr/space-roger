import { combineReducers } from 'redux';
import BackgroundReducer from './reducer-background';

const rootReducer = combineReducers({
  background: BackgroundReducer
});

export default rootReducer;
