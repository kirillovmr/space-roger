export function hasPerk(perkID, perks) {
  if (perks.indexOf(perkID) !== -1) {
    return true;
  }
  return false;
}