import { formatPercent, formatCount } from '../utils/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const STATUS = {
  OVERCROWDED: { label: 'Kritik',  accent: '#ef4444', light: '#fef2f2', bar: '#ef4444' },
  MODERATE:    { label: 'Orta',    accent: '#f59e0b', light: '#fffbeb', bar: '#f59e0b' },
  NORMAL:      { label: 'Normal',  accent: '#22c55e', light: '#f0fdf4', bar: '#22c55e' },
};

function getTrend(history) {
  if (!history || history.length < 2) return 'stable';
  const recent = history.slice(-5);
  const mid = Math.floor(recent.length / 2);
  const a = recent.slice(0, mid).reduce((s, p) => s + p.congestion, 0) / mid;
  const b = recent.slice(mid).reduce((s, p) => s + p.congestion, 0) / (recent.length - mid);
  return b - a > 0.05 ? 'rising' : b - a < -0.05 ? 'falling' : 'stable';
}

export default function StationCard({ station }) {
  const { name, line, capacity, passengerCount, congestion, status, history } = station;
  const s = STATUS[status];
  const pct = Math.min(Math.round(congestion * 100), 100);
  const trend = getTrend(history);
  const TrendIcon = trend === 'rising' ? TrendingUp : trend === 'falling' ? TrendingDown : Minus;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{name}</p>
          <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{line}</p>
        </div>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: s.accent,
          background: s.light,
          padding: '2px 8px',
          borderRadius: 20,
        }}>
          {s.label}
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 11, color: '#6b7280' }}>{formatCount(passengerCount)} / {formatCount(capacity)}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: s.accent }}>{formatPercent(congestion)}</span>
        </div>
        <div style={{ height: 4, background: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: s.bar, borderRadius: 4, transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* Trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <TrendIcon
          size={12}
          color={trend === 'rising' ? '#ef4444' : trend === 'falling' ? '#22c55e' : '#9ca3af'}
        />
        <span style={{ fontSize: 11, color: '#9ca3af' }}>
          {trend === 'rising' ? 'Artır' : trend === 'falling' ? 'Azalır' : 'Sabit'}
        </span>
      </div>
    </div>
  );
}
