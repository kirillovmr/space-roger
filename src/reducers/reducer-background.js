import {SET_BG_SPEED, 
  REFILL_BG_SPEED, ROCKET_CLICKED} from '../actions';

const initialState = {
  speed: 5,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROCKET_CLICKED:
      return {...state, speed: state.speed + 1};
    case SET_BG_SPEED:
      return {...state, speed: action.payload};
    case REFILL_BG_SPEED:
      return {...state, speed: .3};
    default:
      return state;
  };
}