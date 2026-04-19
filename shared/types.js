// JSDoc ilə tip tərifləri

/**
 * @typedef {Object} Station
 * @property {string} id
 * @property {string} name
 * @property {string} line
 * @property {number} capacity
 * @property {number} passengerCount
 * @property {number} congestion        - 0.0 ilə 1.2 arasında
 * @property {"NORMAL"|"MODERATE"|"OVERCROWDED"} status
 * @property {Date} lastUpdated
 * @property {{x: number, y: number}} location
 * @property {HistoryPoint[]} history
 */

/**
 * @typedef {Object} HistoryPoint
 * @property {Date} timestamp
 * @property {number} passengerCount
 * @property {number} congestion
 */

/**
 * @typedef {Object} Suggestion
 * @property {string} id
 * @property {string} stationId
 * @property {"HIGH"|"MEDIUM"|"LOW"} priority
 * @property {"FREQUENCY"|"DWELL_TIME"|"EFFICIENCY"|"MONITORING"|"PREDICTIVE"} type
 * @property {string} message
 * @property {string} detail
 * @property {string} icon
 * @property {Date} timestamp
 */

/**
 * @typedef {Object} Alert
 * @property {string} id
 * @property {string} stationId
 * @property {string} stationName
 * @property {"CRITICAL"|"WARNING"} level
 * @property {string} message
 * @property {Date} timestamp
 */

module.exports = {};
