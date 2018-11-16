export const INCREASE_SPEED = 'INCREASE_SPEED';
export const INCREASE_SPEED_BY1 = 'INCREASE_SPEED_BY1';

export function increaseSpeed(new_speed) {
  return {
    type: INCREASE_SPEED,
    payload: new_speed
  };
}

export function increaseSpeedBy1() {
  return {
    type: INCREASE_SPEED_BY1
  };
}