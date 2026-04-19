/**
 * İzdiham dəyərinə görə status qaytarır
 * @param {number} congestion
 * @returns {"NORMAL"|"MODERATE"|"OVERCROWDED"}
 */
function resolveStatus(congestion) {
  if (congestion > 0.8) return "OVERCROWDED";
  if (congestion > 0.5) return "MODERATE";
  return "NORMAL";
}

const STATUS_COLORS = {
  OVERCROWDED: "#ef4444",
  MODERATE:    "#f59e0b",
  NORMAL:      "#22c55e",
};

const STATUS_LABELS = {
  OVERCROWDED: "Həddindən Artıq",
  MODERATE:    "Orta",
  NORMAL:      "Normal",
};

module.exports = { resolveStatus, STATUS_COLORS, STATUS_LABELS };
