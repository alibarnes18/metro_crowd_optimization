export default function AlertsPanel({ alerts }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Xəbərdarlıqlar</p>
        {alerts.length > 0 && (
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#ef4444', padding: '2px 8px', borderRadius: 20 }}>
            {alerts.length}
          </span>
        )}
      </div>

      {alerts.length === 0 ? (
        <p style={{ fontSize: 12, color: '#9ca3af' }}>Aktiv xəbərdarlıq yoxdur.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {alerts.map(alert => (
            <div
              key={alert.id}
              style={{
                display: 'flex',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                background: alert.level === 'CRITICAL' ? '#fef2f2' : '#fffbeb',
                border: `1px solid ${alert.level === 'CRITICAL' ? '#fecaca' : '#fde68a'}`,
              }}
            >
              <div style={{ width: 3, borderRadius: 4, background: alert.level === 'CRITICAL' ? '#ef4444' : '#f59e0b', flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>{alert.stationName}</p>
                <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
