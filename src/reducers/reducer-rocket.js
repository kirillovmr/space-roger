import {ROCKET_CLICKED, TOGGLE_REFILL,
  STOP_FLYING, START_FLYING, APPLY_PERK, APPLY_UPGRADE, AUTO_FLY } from '../actions';

import rates from '../config/rates';
import {perks as allPerks, upgrades as allUpgrades} from '../config/perks';
import {calcPerkForLevel} from '../misc';

const initialState = {
  clicks: 0,
  distance: 0,
  fuel: 1,
  fuelMax: 1,
  speed: 0,
  clickMultiplier: 100,
  refilling: false,
  flying: false,
  perks: [],
  // upgrades: {},
  upgrades: {},
  previous: {},
};

export default function(state = initialState, action) {
  let clicks, distance, fuel, needFuel;

  switch (action.type) {
    case ROCKET_CLICKED:
      needFuel = state.clickMultiplier * rates.fuel;

      // If no fuel
      if (state.fuel <= 0) return state;
    
      // If fuel not enough for full click
      if (state.fuel < needFuel) {

        // Calculating distance for all our fuel
        clicks = state.clicks + 1;
        distance = (state.distance + state.fuel / rates.fuel);
        fuel = 0;

        return {
          ...state, clicks, distance, fuel,
          previous: {...state.previous, distance: state.distance, fuel: state.fuel}
        };
      };

      clicks = state.clicks + 1;
      distance = state.distance + state.clickMultiplier;
      fuel = (state.fuel - needFuel);

      return {
        ...state, clicks, distance, fuel, 
        previous: {...state.previous, distance: state.distance, fuel: state.fuel}
      };

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
          return {
            ...state, distance, fuel, refilling: !state.refilling,
            previous: {...state.previous, distance: state.distance, fuel: state.fuel}
          };

        } else {
          // Filling not full tank
          const fuel = state.fuel + state.distance * fuelPriceByOneDistance;
          const distance = 0;
          return {
            ...state, distance, fuel, refilling: !state.refilling,
            previous: {...state.previous, distance: state.distance, fuel: state.fuel}
          };
        }
      } else {
        // Start refilling
        return {...state, refilling: !state.refilling};
      }

    case STOP_FLYING:
      return {...state, flying: false};
      
    case START_FLYING:
      return {...state, flying: true};
    
    case APPLY_UPGRADE:
      // const currentLevel = state.upgrades[action.payload] || 1;
      // console.log('Current level:', currentLevel);
      // console.log('Next level upgrade:', calcPerkForLevel(allUpgrades[action.payload], currentLevel + 1));
      // Calculating next level perk
    case APPLY_PERK:
      const perkID = action.payload;
      const newState = {...state};

      const perkUpgrade = allPerks[perkID] || allUpgrades[perkID];

      _.mapKeys(perkUpgrade.apply, (applyValue, applyProp) => {
        newState[applyProp] = applyValue;
        if (applyProp === 'speed') {
          newState.previous.speed = state.speed;
        }
      });
      return {...newState, perks: [...state.perks, perkID]};

    case AUTO_FLY:
      needFuel = state.speed * rates.fuel * rates.autoflyMultiplier;

      // If no fuel
      if (state.fuel <= 0) return state;

      // If not enough fuel
      if (state.fuel < needFuel) {

        // Calculating distance for all our fuel
        distance = (state.distance + state.fuel / rates.fuel);
        fuel = 0;
        return {
          ...state, distance, fuel,
          previous: {...state.previous, distance: state.distance, fuel: state.fuel}
        };
      }

      // If enough fuel
      distance = state.distance + state.speed + rates.autoflyMultiplier;
      fuel = (state.fuel - needFuel);

      return {
        ...state, distance, fuel, 
        previous: {...state.previous, distance: state.distance, fuel: state.fuel}
      };
      
    default:
      return state;
  };
}