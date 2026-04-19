const STATUS_COLORS = { OVERCROWDED: '#ef4444', MODERATE: '#f59e0b', NORMAL: '#22c55e' };

export default function HeatmapView({ stations }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 24px' }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 16 }}>İstilik Xəritəsi</p>

      <div style={{ background: '#f9fafb', borderRadius: 8, border: '1px solid #f3f4f6', padding: 12 }}>
        <svg viewBox="0 0 100 80" style={{ width: '100%', minHeight: 160 }}>
          <line x1="0" y1="40" x2="100" y2="40" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="50" y1="0"  x2="50"  y2="80" stroke="#e5e7eb" strokeWidth="0.5" />

          {stations.map(s => {
            const r = 2.5 + Math.min(s.congestion, 1.2) * 2;
            const color = STATUS_COLORS[s.status];
            return (
              <g key={s.id}>
                <circle cx={s.location.x} cy={s.location.y} r={r + 2} fill={color} opacity={0.1} />
                <circle cx={s.location.x} cy={s.location.y} r={r}   fill={color} opacity={0.75} />
                <text
                  x={s.location.x}
                  y={s.location.y + r + 4}
                  textAnchor="middle"
                  fontSize="2.6"
                  fill="#9ca3af"
                >
                  {s.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
        {[['#22c55e', 'Normal'], ['#f59e0b', 'Orta'], ['#ef4444', 'Kritik']].map(([color, label]) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7280' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
