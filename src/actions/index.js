export const SET_BG_SPEED = 'SET_BG_SPEED';
export const INCREASE_BG_SPEED_BY1 = 'INCREASE_BG_SPEED_BY1';

export const INCREASE_DISTANCE_BY_CLICK = 'INCREASE_DISTANCE_BY1';

export const ROCKET_CLICKED = 'ROCKET_CLICKED';

export const TOGGLE_REFILL = 'TOGGLE_REFILL';
export const REFILL_BG_SPEED = 'REFILL_BG_SPEED';
export const RESTORE_BG_SPEED = 'RESTORE_BG_SPEED';

export const STOP_FLYING = 'STOP_FLYING';
export const START_FLYING = 'START_FLYING';

export const TOGGLE_PERK_AVAILABLE = 'TOGGLE_PERK_AVAILABLE';
export const APPLY_PERK = 'APPLY_PERK';

export function refillBGSpeed() {
  return {
    type: REFILL_BG_SPEED
  };
}

export function restoreBGSpeed() {
  return {
    type: RESTORE_BG_SPEED
  }
}

export function setBGSpeed(new_speed) {
  return {
    type: SET_BG_SPEED,
    payload: new_speed
  };
}

export function increaseBGSpeedBy1() {
  return {
    type: INCREASE_BG_SPEED_BY1
  };
}

export function increaseDistanceByClick() {
  return {
    type: INCREASE_DISTANCE_BY_CLICK
  };
}

export function toggleRefill() {
  return {
    type: TOGGLE_REFILL
  };
}

export function stopFlying() {
  return {
    type: STOP_FLYING
  };
}
export function startFlying() {
  return {
    type: START_FLYING
  }
}

// -- -- -- ROCKET -- -- -- //
export function rocketClicked() {
  return {
    type: ROCKET_CLICKED
  }
}

// -- -- -- PERKS -- -- -- //
export function togglePerkAvailable(perkID, available) {
  return {
    type: TOGGLE_PERK_AVAILABLE,
    payload: [perkID, available]
  }
}
export function deletePerkFromUI(perkID) {

}
export function applyPerk(perkID) {
  return {
    type: APPLY_PERK,
    payload: perkID
  }
}

// -- -- -- PERK ACTIONS -- -- -- //
// -- -- -- -- --- -- -- -- -- -- //
export const AUTO_FLY = 'AUTO_FLY';

export function autoFly() {
  return {
    type: AUTO_FLY
  };
}