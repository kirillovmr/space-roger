export const SET_BG_SPEED = 'SET_BG_SPEED';
export const INCREASE_BG_SPEED_BY1 = 'INCREASE_BG_SPEED_BY1';

export const INCREASE_DISTANCE_BY_CLICK = 'INCREASE_DISTANCE_BY1';

export const TOGGLE_REFILL = 'TOGGLE_REFILL';
export const REFILL_BG_SPEED = 'REFILL_BG_SPEED';
export const RESTORE_BG_SPEED = 'RESTORE_BG_SPEED';

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