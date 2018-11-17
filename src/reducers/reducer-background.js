import {SET_BG_SPEED, INCREASE_BG_SPEED_BY1, 
  REFILL_BG_SPEED, RESTORE_BG_SPEED} from '../actions';

const initialState = {
  speed: 5,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREASE_BG_SPEED_BY1:
      return {...state, speed: state.speed + 1};
    case SET_BG_SPEED:
      return {...state, speed: action.payload};
    case REFILL_BG_SPEED:
      return {...state, speed: .3};
    default:
      return state;
  };
}