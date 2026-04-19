/**
 * @param {import('../../shared/types').HistoryPoint[]} history
 * @param {number} windowSize
 * @returns {{ predictedCongestion: number|null, trend: "rising"|"stable"|"falling" }}
 */
function predictNextCongestion(history, windowSize = 5) {
  if (!history || history.length < 2) {
    return { predictedCongestion: null, trend: "stable" };
  }

  const recent = history.slice(-windowSize);
  const avg = recent.reduce((s, p) => s + p.congestion, 0) / recent.length;

  const mid = Math.floor(recent.length / 2);
  const firstHalf  = recent.slice(0, mid);
  const secondHalf = recent.slice(mid);

  const avgFirst  = firstHalf.reduce((s, p)  => s + p.congestion, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((s, p) => s + p.congestion, 0) / secondHalf.length;

  const delta = avgSecond - avgFirst;

  let trend;
  if (delta > 0.05)       trend = "rising";
  else if (delta < -0.05) trend = "falling";
  else                    trend = "stable";

  const predictedCongestion = Math.max(0, parseFloat((avg + delta * 0.5).toFixed(3)));

  return { predictedCongestion, trend };
}

module.exports = { predictNextCongestion };
