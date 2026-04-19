const express    = require('express');
const cors       = require('cors');
const { WebSocketServer, WebSocket } = require('ws');
const http       = require('http');

const seedData   = require('./data/stations.seed');
const { simulatePassengerCount } = require('./simulation/simulator');
const { calculateCongestion }    = require('./processing/congestionCalc');
const { resolveStatus }          = require('./processing/statusResolver');
const { predictNextCongestion }  = require('./processing/predictor');
const { detectPeakHour }         = require('./processing/peakDetector');
const { generateSuggestions }    = require('./engine/optimizer');

const app    = express();
const server = http.createServer(app);
const wss    = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

// ─── In-Memory State ──────────────────────────────────────────────────────────
let stations = seedData.map(s => ({
  ...s,
  passengerCount: Math.round(s.capacity * 0.4),
  congestion:     0.4,
  status:         "NORMAL",
  lastUpdated:    new Date(),
  history:        [],
}));

let simulationRunning = true;
let simulationSpeed   = 3000; // ms

// ─── Processing Helper ────────────────────────────────────────────────────────
function processStations() {
  const { isPeak } = detectPeakHour();

  stations = stations.map(station => {
    const newCount   = simulatePassengerCount(station, isPeak);
    const congestion = calculateCongestion(newCount, station.capacity);
    const status     = resolveStatus(congestion);

    const newPoint = {
      timestamp:      new Date(),
      passengerCount: newCount,
      congestion,
    };

    const history = [...station.history, newPoint].slice(-10);

    return { ...station, passengerCount: newCount, congestion, status, history, lastUpdated: new Date() };
  });
}

function getAlerts() {
  return stations
    .filter(s => s.status === "OVERCROWDED" || (predictNextCongestion(s.history).trend === "rising" && s.congestion > 0.6))
    .map(s => ({
      id:          `alert_${s.id}`,
      stationId:   s.id,
      stationName: s.name,
      level:       s.status === "OVERCROWDED" ? "CRITICAL" : "WARNING",
      message:     s.status === "OVERCROWDED"
        ? `İzdiham həddini aşdı: ${Math.round(s.congestion * 100)}%`
        : `Artım tendensiyası aşkarlandı: ${Math.round(s.congestion * 100)}%`,
      timestamp: new Date(),
    }));
}

function getSuggestions() {
  return stations.flatMap(s => {
    const prediction = predictNextCongestion(s.history);
    return generateSuggestions(s, prediction);
  });
}

function getStats() {
  const { isPeak, peakType } = detectPeakHour();
  const overcrowded = stations.filter(s => s.status === "OVERCROWDED").length;
  const moderate    = stations.filter(s => s.status === "MODERATE").length;
  const avg         = stations.reduce((sum, s) => sum + s.congestion, 0) / stations.length;
  return {
    totalStations:      stations.length,
    overcrowded,
    moderate,
    normal:             stations.length - overcrowded - moderate,
    averageCongestion:  parseFloat(avg.toFixed(3)),
    isPeakHour:         isPeak,
    peakType,
    lastUpdated:        new Date(),
  };
}

// ─── REST Routes ──────────────────────────────────────────────────────────────
app.get('/stations',        (req, res) => res.json(stations));
app.get('/stations/:id',    (req, res) => {
  const s = stations.find(s => s.id === req.params.id);
  s ? res.json(s) : res.status(404).json({ error: "Tapılmadı" });
});
app.get('/alerts',          (req, res) => res.json(getAlerts()));
app.get('/suggestions',     (req, res) => {
  let result = getSuggestions();
  if (req.query.priority) result = result.filter(s => s.priority === req.query.priority);
  if (req.query.stationId) result = result.filter(s => s.stationId === req.query.stationId);
  res.json(result);
});
app.get('/stats',           (req, res) => res.json(getStats()));
app.post('/simulation/speed', (req, res) => {
  const { speed } = req.body; // 1 | 2 | 5
  const map = { 1: 3000, 2: 1500, 5: 600 };
  if (map[speed]) { simulationSpeed = map[speed]; }
  res.json({ speed, interval: simulationSpeed });
});

// ─── WebSocket Push ───────────────────────────────────────────────────────────
let simInterval = null;

function startSimulation() {
  if (simInterval) clearInterval(simInterval);
  simInterval = setInterval(() => {
    if (!simulationRunning) return;
    processStations();
    const payload = JSON.stringify({
      type:        "STATION_UPDATE",
      data:        stations,
      alerts:      getAlerts(),
      suggestions: getSuggestions(),
      stats:       getStats(),
      timestamp:   new Date().toISOString(),
    });
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(payload);
    });
  }, simulationSpeed);
}

wss.on('connection', (ws) => {
  console.log('🔌 Yeni WebSocket bağlantısı');
  // Dərhal cari vəziyyəti göndər
  ws.send(JSON.stringify({
    type:        "STATION_UPDATE",
    data:        stations,
    alerts:      getAlerts(),
    suggestions: getSuggestions(),
    stats:       getStats(),
    timestamp:   new Date().toISOString(),
  }));

  ws.on('message', (msg) => {
    try {
      const { action, speed } = JSON.parse(msg);
      if (action === "PAUSE")  simulationRunning = false;
      if (action === "RESUME") { simulationRunning = true; }
      if (action === "SPEED" && speed) {
        const map = { 1: 3000, 2: 1500, 5: 600 };
        if (map[speed]) {
          simulationSpeed = map[speed];
          startSimulation();
        }
      }
    } catch (e) {}
  });
});

// ─── Başlat ───────────────────────────────────────────────────────────────────
processStations(); // İlk dəfə simulasiya et
startSimulation();

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚇 MSAOS Server: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
});
