import { combineReducers } from 'redux';
import BackgroundReducer from './reducer-background';
import RocketReducer from './reducer-rocket';
import MiddleUIReducer from './reducer-middle-ui';

const rootReducer = combineReducers({
  background: BackgroundReducer,
  rocket: RocketReducer,
  ui: MiddleUIReducer,
});

export default rootReducer;
