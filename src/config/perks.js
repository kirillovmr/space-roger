export const perks = {
  autofly: {
    name: 'Auto Fly',
    icon: 'autofly.svg',
    display: 5,
    requirements: {
      distance: 10
    },
    apply: {
      speed: 1
    }
  },
  autofuel: {
    name: 'Auto Buy Fuel',
    icon: 'autofuel.svg',
    display: 12,
    requirements: {
      distance: 20
    },
    apply: {}
  }
};

// func: x = requirements.distance | y = level |
export const upgrades = {
  powerclick: {
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
  },
  engine: {
    name: 'Engine',
    icon: 'engine.svg',
    level: 1,
    display: 100,
    requirements: {
      distance: 150,
      // perks: ['autofly']
    },
    apply: {
      speed: 1.6,
    },
    func: {
      requirements: {
        distance: 'Math.round(Math.pow(2.7, y+5))',
      },
      apply: {
        speed: '2*x',
      }
    }
  },
  tank: {
    name: 'Tank',
    icon: 'tank.svg',
    level: 1,
    display: 300,
    requirements: {
      distance: 500,
      perks: ['autofuel']
    },
    apply: {
      fuelMax: 1.8,
    },
    func: {
      requirements: {
        distance: 'Math.round(Math.pow(2.7, y+6))',
      },
      apply: {
        fuelMax: '2*x*1.1'
      }
    }
  }
};