import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';

const STATUS_COLORS = { OVERCROWDED: '#ef4444', MODERATE: '#f59e0b', NORMAL: '#22c55e' };

export default function BarChartView({ stations }) {
  const data = stations.map(s => ({
    name:    s.name.split(' ')[0],
    value:   Math.round(s.congestion * 100),
    status:  s.status,
  }));

  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 24px' }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 16 }}>Stansiya Yüklənməsi</p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 11 }} unit="%" axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: '#f9fafb' }}
            contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
            formatter={val => [`${val}%`, 'Doluluq']}
          />
          <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" opacity={0.3} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
            {data.map((entry, i) => (
              <Cell key={i} fill={STATUS_COLORS[entry.status]} fillOpacity={0.7} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
