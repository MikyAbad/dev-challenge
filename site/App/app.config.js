global.DEBUG = false 
const STOMP_URL = 'ws://localhost:8011/stomp' 
const FX_CORE_MAX_RATES = 100 
const SPARKLINE_MAX_AGE_IN_MS = 30 * 1000 

module.exports = {
  STOMP_URL,
  FX_CORE_MAX_RATES,
  SPARKLINE_MAX_AGE_IN_MS,
} 