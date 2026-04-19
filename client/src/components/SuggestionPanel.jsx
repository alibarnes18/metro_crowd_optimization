import { FastForward, Timer, Zap, Eye, SlidersHorizontal, Lightbulb } from 'lucide-react';

const TYPE_META = {
  FREQUENCY:  { Icon: FastForward,       color: '#3b82f6' },
  DWELL_TIME: { Icon: Timer,             color: '#8b5cf6' },
  EFFICIENCY: { Icon: Zap,               color: '#f59e0b' },
  MONITORING: { Icon: Eye,               color: '#06b6d4' },
  PREDICTIVE: { Icon: SlidersHorizontal, color: '#ef4444' },
};

const PRIORITY_COLOR = { HIGH: '#ef4444', MEDIUM: '#f59e0b', LOW: '#9ca3af' };

export default function SuggestionPanel({ suggestions }) {
  const sorted = [
    ...suggestions.filter(s => s.priority === 'HIGH'),
    ...suggestions.filter(s => s.priority !== 'HIGH'),
  ].slice(0, 5);

  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Tövsiyələr</p>
        {suggestions.length > 0 && (
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: '#3b82f6', padding: '2px 8px', borderRadius: 20 }}>
            {suggestions.length}
          </span>
        )}
      </div>

      {sorted.length === 0 ? (
        <p style={{ fontSize: 12, color: '#9ca3af' }}>Aktiv tövsiyə yoxdur.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sorted.map(s => {
            const meta = TYPE_META[s.type] || { Icon: Lightbulb, color: '#9ca3af' };
            return (
              <div key={s.id} style={{ display: 'flex', gap: 12, padding: '10px 12px', borderRadius: 8, background: '#f9fafb', border: '1px solid #f3f4f6' }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${meta.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <meta.Icon size={13} color={meta.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#111827', flex: 1, lineHeight: 1.4 }}>{s.message}</p>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: PRIORITY_COLOR[s.priority], marginTop: 3, flexShrink: 0 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#6b7280', marginTop: 2, lineHeight: 1.4 }}>{s.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
