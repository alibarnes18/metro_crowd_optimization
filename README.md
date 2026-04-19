# 🚇 Metro Crowd Optimization System (MCOS)

![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

**MSAOS (Metro Sərnişin Axını Optimallaşdırma Sistemi)** is a real-time monitoring and optimization dashboard for metro stations. It uses simulated data to provide operators with insights into passenger flow, congestion detection, and AI-driven optimization tokens.

## ✨ Features

- **Real-Time Monitoring**: Live passenger counts and congestion levels via WebSockets.
- **Predictive Analytics**: Trend detection and future congestion forecasts.
- **Smart Heatmaps**: SVG-based visual flow analysis.
- **Automated Alerts**: Instant notifications for overcrowded stations.
- **Optimization Engine**: Intelligent suggestions for train intervals and dwell times.
- **Simulation Control**: Flexible engine for testing various scenarios (Peak hours, etc.).

## 🏗️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Node.js, Express, WebSocket (ws).
- **Design**: Premium glassmorphism UI with custom typography.

## 🚀 Quick Start

### 1. Backend
```bash
cd server
npm install
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
npm run dev
```

## 🛠️ Configuration

- **Server Port**: 3001 (configurable via environment variables)
- **Client Port**: 5173
- **Simulation Speed**: 1x, 2x, 5x controllable from UI.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---

Built for **Baku Metro** optimization research.
