export default function SimulationControls({ running, onToggle, speed, onSpeedChange }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Simulasiya</span>

      <button
        onClick={onToggle}
        style={{
          fontSize: 12,
          fontWeight: 600,
          padding: '6px 16px',
          borderRadius: 6,
          border: '1px solid',
          cursor: 'pointer',
          borderColor: running ? '#fde68a' : '#bbf7d0',
          background: running ? '#fefce8' : '#f0fdf4',
          color: running ? '#92400e' : '#14532d',
        }}
      >
        {running ? '⏸ Dayan' : '▶ Başlat'}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#9ca3af' }}>Sürət:</span>
        {[1, 2, 5].map(s => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            style={{
              width: 34,
              height: 28,
              borderRadius: 6,
              border: '1px solid',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
              borderColor: speed === s ? '#3b82f6' : '#e5e7eb',
              background: speed === s ? '#eff6ff' : '#fff',
              color: speed === s ? '#1d4ed8' : '#6b7280',
            }}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
