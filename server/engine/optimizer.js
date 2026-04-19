const { resolveStatus } = require('../processing/statusResolver');

/**
 * @param {import('../../shared/types').Station} station
 * @param {{ predictedCongestion: number, trend: string }} prediction
 * @returns {import('../../shared/types').Suggestion[]}
 */
function generateSuggestions(station, prediction) {
  const suggestions = [];
  const { congestion, status, name, line, id } = station;
  const { predictedCongestion, trend } = prediction;
  const now = new Date();

  const make = (priority, type, icon, message, detail) => ({
    id: `sug_${id}_${type}_${now.getTime()}`,
    stationId: id,
    priority,
    type,
    icon,
    message,
    detail,
    timestamp: now,
  });

  if (status === "OVERCROWDED") {
    suggestions.push(make(
      "HIGH", "FREQUENCY", "🚆",
      `${name} stansiyasında ${line} xəttinin qatar tezliyini artırın`,
      `Cari izdiham: ${Math.round(congestion * 100)}%. Tövsiyə olunan interval: 2 dəqiqə.`
    ));
    suggestions.push(make(
      "MEDIUM", "DWELL_TIME", "⏱️",
      `${name} stansiyasında dayanma müddətini 15 saniyə uzadın`,
      "Qapı açılma vaxtını artırmaq platform axınını yaxşılaşdırır."
    ));
  }

  if (status === "MODERATE") {
    suggestions.push(make(
      "LOW", "MONITORING", "👁️",
      `${name} stansiyasını diqqətlə izləyin`,
      `İzdiham ${Math.round(congestion * 100)}% — artım tendensiyası ola bilər.`
    ));
  }

  if (congestion < 0.3) {
    suggestions.push(make(
      "LOW", "EFFICIENCY", "💡",
      `${name} stansiyasında qatar tezliyini azaldın`,
      "Aşağı dolulıq: enerji qənaəti üçün intervalı artırmaq tövsiyə olunur."
    ));
  }

  if (trend === "rising" && predictedCongestion > 0.75 && status !== "OVERCROWDED") {
    suggestions.push(make(
      "HIGH", "PREDICTIVE", "⚠️",
      `⚠️ ${name} stansiyasında 10 dəqiqə ərzində izdiham gözlənilir`,
      `Proqnoz: ${Math.round(predictedCongestion * 100)}%. Hazırlıq tədbirləri görün.`
    ));
  }

  return suggestions;
}

module.exports = { generateSuggestions };
