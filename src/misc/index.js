import _ from 'lodash';

export function hasPerk(perkID, perks) {
  if (perks.indexOf(perkID) !== -1) {
    return true;
  }
  return false;
}

// Calculating perk for given level
export function calcPerkForNextLevel(perk, currentLevel, priceOnly = false) {
  console.log('Input', perk);
  let newPerk = {...perk};
  _.mapKeys(perk.func, (payload, key) => {
    _.mapKeys(payload, (value, param) => {
      const formula = value;
      const x = perk[key][param];
      const y = currentLevel;
      const valueFormula = formula.replace(/x/g, x);
      const newValue = eval(valueFormula);

      newPerk[key][param] = newValue;
      // console.log(key, param, value, x, valueFormula, newValue);
    });
  })
  newPerk.level = currentLevel + 1;
  console.log('Output', newPerk);
  return newPerk;
}

/**
 * powerclick: {
    name: 'Power Click',
    icon: 'powerclick.svg',
    level: 1,
    display: 5,
    requirements: {
      distance: 10,
      // perks: ['autofly'],
      // upgrades: { testName: 1, testName2: 3 }
    },
    apply: {
      clickMultiplier: 2,
    },
    func: {
      requirements: {
        distance: 'x*x',
      },
      apply: {
        clickMultiplier: '2*x',
      }
    }
  }
 */