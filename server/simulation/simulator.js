/**
 * @param {import('../../shared/types').Station} station
 * @param {boolean} isPeak
 * @returns {number}
 */
function simulatePassengerCount(station, isPeak) {
  const targetRatio = isPeak
    ? randomBetween(0.60, 0.98)
    : randomBetween(0.15, 0.55);

  const baseLoad = station.capacity * targetRatio;
  const noise    = station.capacity * randomBetween(-0.05, 0.08);

  // Hamarlaşdırma — ani sıçramanın qarşısını al
  const smoothed = (station.passengerCount || baseLoad) * 0.65 + (baseLoad + noise) * 0.35;

  return Math.max(0, Math.min(Math.round(station.capacity * 1.15), Math.round(smoothed)));
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = { simulatePassengerCount };
