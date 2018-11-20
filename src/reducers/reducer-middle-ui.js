import _ from 'lodash';

import {TOGGLE_PERK_AVAILABLE, APPLY_PERK, APPLY_UPGRADE} from '../actions';
import {upgrades as allUpgrades} from '../config/perks';
import {calcPerkForNextLevel} from '../misc';

const initialState = {
  perks: {
    /* autofly: false */
    /* true | false - availability */
  },
  upgrades: {
    /* powerclick: { unlocked: true, level: 1 } */
    // engine: {
    //   unlocked: false,
    //   level: 1,
    //   price: 100
    //   requirements: { }
    // }
  }
};

export default function(state = initialState, action) {
  let newState;
  switch(action.type) {

    case TOGGLE_PERK_AVAILABLE:
      const type = action.payload[0];
      const perkID = action.payload[1];
      const available = action.payload[2];
      newState = {...state};
      switch (type) {
        case 'perks':
          newState.perks[perkID] = available;
        break;
        case 'upgrades':
          if (newState.upgrades[perkID]) {
            newState.upgrades[perkID].unlocked = available;
          } else {
            newState.upgrades[perkID] = {
              unlocked: available,
              level: 1,
              requirements: {...allUpgrades[perkID].requirements}
            };
          }
        break;
      }
      return newState;

    case APPLY_PERK:
      return {...state, perks: _.omit(state.perks, [action.payload])};

    case APPLY_UPGRADE:
      newState = {...state};
      // Recalculate 
      const upgradeID = action.payload;
      const currentLevel = state.upgrades[upgradeID].level || 1;
      const nextLevelUpgrade = calcPerkForNextLevel(allUpgrades[upgradeID], currentLevel)
      // console.log('Next level req:', nextLevelUpgrade.requirements);

      newState.upgrades[upgradeID].level = nextLevelUpgrade.level;
      newState.upgrades[upgradeID].requirements = nextLevelUpgrade.requirements;
      // console.log(upgradeID, currentLevel, nextLevelUpgrade);

      return newState;

    default: 
      return state;
  };
}