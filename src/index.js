import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';
import reducers from './reducers';

const logger = store => next => action => {
  switch(action.type) {
    case 'START_FLYING':
    case 'STOP_FLYING':
    case 'ROCKET_CLICKED':
      return next(action);
  };
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

console.log(store.getState());

store.subscribe(() => {
  // console.log(store.getState().ui.upgrades);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
