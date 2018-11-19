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
      },
      id: 'autofly'
  },
  autofuel: {
      name: 'Auto Buy Fuel',
      icon: 'autofuel.svg',
      display: 12,
      requirements: {
        distance: 20
      },
      apply: {},
      id: 'autofuel'
  }
};
