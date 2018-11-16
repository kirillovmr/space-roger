import { combineReducers } from 'redux';
import BackgroundReducer from './reducer-background';
import RocketReducer from './reducer-rocket';

const rootReducer = combineReducers({
  background: BackgroundReducer,
  rocket: RocketReducer
});

export default rootReducer;
