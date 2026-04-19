/**
 * Stansiyanın izdiham dəyərini hesablayır
 * @param {number} passengerCount
 * @param {number} capacity
 * @returns {number} 0.0 – 1.5 arasında dəyər
 */
function calculateCongestion(passengerCount, capacity) {
  if (!capacity || capacity === 0) return 0;
  return parseFloat((passengerCount / capacity).toFixed(3));
}

module.exports = { calculateCongestion };
