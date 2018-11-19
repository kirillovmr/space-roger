import _ from 'lodash';

import {TOGGLE_PERK_AVAILABLE, APPLY_PERK} from '../actions';

const initialState = {
  // True - available, False - locked
  perks: {
    // autofly: false
  }
};

export default function(state = initialState, action) {
  switch(action.type) {

    case TOGGLE_PERK_AVAILABLE:
      const perkID = action.payload[0];
      const available = action.payload[1];
      let newState = {...state};
      newState.perks[perkID] = available;
      return newState;

    case APPLY_PERK: {
      return {...state, perks: _.omit(state.perks, [action.payload])}
      // return state;
    }

    default: 
      return state;
  };
}