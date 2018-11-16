import {INCREASE_DISTANCE_BY_CLICK, TOGGLE_REFILL} from '../actions';
import rates from '../config/rates';

const initialState = {
  clicks: 0,
  distance: 0,
  fuel: 1,
  fuelMax: 1,
  speed: 0,
  clickMultiplier: 1,
  refilling: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREASE_DISTANCE_BY_CLICK:

      let clicks, distance, fuel;
      const needFuel = state.clickMultiplier * rates.fuel;
    
      // If fuel not enough for full click
      if (state.fuel < needFuel) {

        // If no fuel
        if (state.fuel <= 0) {
          return state;
        };

        // Calculating distance for all our fuel
        clicks = state.clicks + 1;
        distance = (state.distance + state.fuel / rates.fuel);
        fuel = 0

        return {...state, clicks, distance, fuel};
      };

      clicks = state.clicks + 1;
      distance = state.distance + state.clickMultiplier;
      fuel = (state.fuel - needFuel);

      return {...state, clicks, distance, fuel};

    case TOGGLE_REFILL:
      // If rocket is refilling - stop refilling
      if(state.refilling) {

        const freeSpaceInTank = state.fuelMax - state.fuel;
        const fuelPriceByOneDistance = rates.fuel * 2;
        const costToFillTank = freeSpaceInTank / fuelPriceByOneDistance;

        // If we have enough money for full tank
        if (costToFillTank <= state.distance) {
          const fuel = state.fuelMax;
          const distance = state.distance - costToFillTank;
          return {...state, distance, fuel, refilling: !state.refilling};

        } else {
          // Filling not full tank
          const fuel = state.fuel + state.distance * fuelPriceByOneDistance;
          const distance = 0;
          return {...state, distance, fuel, refilling: !state.refilling};
        }
      } else {
        // Start refilling
        return {...state, refilling: !state.refilling};
      }
      
      
    default:
      return state;
  };
}