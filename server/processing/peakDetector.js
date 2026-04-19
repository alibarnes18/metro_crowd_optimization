/**
 * Cari saata görə pik dövrü aşkarlayır
 * @returns {{ isPeak: boolean, peakType: string|null }}
 */
function detectPeakHour() {
  const hour = new Date().getHours();
  const windows = [
    { start: 7,  end: 9,  label: "Səhər Piki" },
    { start: 12, end: 13, label: "Nahar Piki" },
    { start: 17, end: 20, label: "Axşam Piki" },
  ];
  for (const w of windows) {
    if (hour >= w.start && hour < w.end) {
      return { isPeak: true, peakType: w.label };
    }
  }
  return { isPeak: false, peakType: null };
}

module.exports = { detectPeakHour };
