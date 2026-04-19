import { useState, useEffect } from 'react';
import { useWebSocket }   from './hooks/useWebSocket';
import Header             from './components/Header';
import StationCard        from './components/StationCard';
import HeatmapView        from './components/HeatmapView';
import AlertsPanel        from './components/AlertsPanel';
import SuggestionPanel    from './components/SuggestionPanel';
import BarChartView       from './components/BarChartView';
import SimulationControls from './components/SimulationControls';
import './App.css';

export default function App() {
  const { stations, alerts, suggestions, stats, connected, sendMessage } = useWebSocket();
  const [running, setRunning] = useState(true);
  const [speed, setSpeed]     = useState(1);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (stations.length > 0) setLastUpdated(new Date());
  }, [stations]);

  function handleToggle() {
    const next = !running;
    setRunning(next);
    sendMessage({ action: next ? 'RESUME' : 'PAUSE' });
  }

  function handleSpeed(s) {
    setSpeed(s);
    sendMessage({ action: 'SPEED', speed: s });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fb' }}>
      <Header connected={connected} stats={stats} lastUpdated={lastUpdated} />

      <main className="container">

        {/* Row 1: Alerts + Suggestions */}
        <div className="grid-2">
          <AlertsPanel alerts={alerts} />
          <SuggestionPanel suggestions={suggestions} />
        </div>

        {/* Row 2: Chart + Map */}
        <div className="grid-2">
          <BarChartView stations={stations} />
          <HeatmapView  stations={stations} />
        </div>

        {/* Row 3: Station Cards */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 24px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 16 }}>Stansiyalar</p>
          <div className="grid-stations">
            {stations.map(s => <StationCard key={s.id} station={s} />)}
          </div>
        </div>

        {/* Row 4: Controls */}
        <SimulationControls running={running} onToggle={handleToggle} speed={speed} onSpeedChange={handleSpeed} />

        <p style={{ textAlign: 'center', fontSize: 11, color: '#d1d5db', paddingBottom: 16 }}>
          © 2026 MSAOS — Bakı Metropoliteni
        </p>
      </main>
    </div>
  );
}
