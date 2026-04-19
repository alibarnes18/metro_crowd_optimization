import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = 'ws://localhost:3001';

export function useWebSocket() {
  const [stations,    setStations]    = useState([]);
  const [alerts,      setAlerts]      = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [stats,       setStats]       = useState(null);
  const [connected,   setConnected]   = useState(false);
  const wsRef = useRef(null);

  const sendMessage = useCallback((msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    function connect() {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen    = () => setConnected(true);
      ws.onclose   = () => { setConnected(false); setTimeout(connect, 2000); };
      ws.onerror   = () => ws.close();

      ws.onmessage = (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload.type === "STATION_UPDATE") {
            setStations(payload.data        || []);
            setAlerts(payload.alerts         || []);
            setSuggestions(payload.suggestions || []);
            setStats(payload.stats           || null);
          }
        } catch (_) {}
      };
    }

    connect();
    return () => wsRef.current?.close();
  }, []);

  return { stations, alerts, suggestions, stats, connected, sendMessage };
}
