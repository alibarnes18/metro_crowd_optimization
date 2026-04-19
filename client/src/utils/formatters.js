export function formatPercent(congestion) {
  return `${Math.round(congestion * 100)}%`;
}

export function formatCount(count) {
  return count?.toLocaleString('az-AZ') ?? '—';
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('az-AZ', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}
