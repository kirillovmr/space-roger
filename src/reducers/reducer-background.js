import {INCREASE_SPEED, INCREASE_SPEED_BY1} from '../actions';

const initialState = {
  speed: 5
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREASE_SPEED_BY1:
      return {...state, speed: state.speed + 1};
    case INCREASE_SPEED:
      return {...state, speed: action.payload};
    default:
      return state;
  };
}