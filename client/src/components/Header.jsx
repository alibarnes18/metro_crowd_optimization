import { formatTime } from '../utils/formatters';

export default function Header({ connected, stats, lastUpdated }) {
  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', background: '#fff', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 28, height: 28, background: '#111827', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 14 }}>🚇</span>
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#111827', letterSpacing: '-0.01em' }}>MSAOS</span>
          <span style={{ marginLeft: 8, fontSize: 12, color: '#9ca3af' }}>Metro Dashboard</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {stats?.isPeakHour && (
          <span style={{ fontSize: 12, fontWeight: 500, color: '#b45309', background: '#fef3c7', padding: '3px 10px', borderRadius: 20, border: '1px solid #fde68a' }}>
            ⚡ {stats.peakType}
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: connected ? '#22c55e' : '#ef4444' }} />
          <span style={{ fontSize: 12, color: '#6b7280' }}>{connected ? 'Bağlı' : 'Offline'}</span>
        </div>
        {lastUpdated && (
          <span style={{ fontSize: 11, color: '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(lastUpdated)}
          </span>
        )}
      </div>
    </header>
  );
}
