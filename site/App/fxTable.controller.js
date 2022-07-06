const Table = require('./Components/Table') 
const FxCore = require('../Core/FxCore') 
const {
  SPARKLINE_MAX_AGE_IN_MS,
} = require('../App/app.config') 

const headers = [
  'FX',
  'Best Bid',
  'Best Ask',
  'Last Change Ask',
  'Last Change Bid',
  'Avg.',
] 

const sparkLineCache = {} 

const filterDataPointByAge = (latestRate) => (point) =>
  point.timestamp > latestRate.timestamp - SPARKLINE_MAX_AGE_IN_MS 

const getCachedSparkline = (sparkLineCache, fxName) => {
  if (!sparkLineCache[fxName]) {
    const sparkElement = document.createElement('span') 
    sparkLineCache[fxName] = {
      chart: new Sparkline(sparkElement),
      series: [],
      sparkElement,
    } 
  }
  return sparkLineCache[fxName] 
} 

const updateSparkline = (sparkline, latestRate) => {
  sparkline.series.push({
    avg: latestRate.avg,
    timestamp: latestRate.timestamp,
  }) 
  sparkline.series = sparkline.series.filter(filterDataPointByAge(latestRate)) 
  return sparkline 
} 

const parseDataToTable = (data, getCachedSparkline) => {
  return Object.values(data).map((fx) => {
    const latestRate = fx[0] 
    const sparkline = getCachedSparkline(sparkLineCache, latestRate.name) 
    updateSparkline(sparkline, latestRate) 
    sparkline.chart.draw(sparkline.series.map((point) => point.avg)) 
    return [
      latestRate.name,
      latestRate.bestBid,
      latestRate.bestAsk,
      latestRate.lastChangeAsk,
      latestRate.lastChangeBid,
      sparkline.sparkElement,
    ] 
  }) 
} 

const sortDataMatrixByLastChangedBidAmount = (data) =>
  data.sort((a, b) => Math.abs(b[4]) - Math.abs(a[4])) 

const renderTable = (data, render) => {
  const dataMatrix = parseDataToTable(data, getCachedSparkline) 
  sortDataMatrixByLastChangedBidAmount(dataMatrix) 
  const fxTable = new Table({
    headers,
    dataMatrix,
  }) 
  render(fxTable.render()) 
} 

const load = (render) => {
  const fx = new FxCore() 
  fx.on('data', (data) => {
    renderTable(data, render) 
  }) 
} 

module.exports = {
  load,
  filterDataPointByAge,
  getCachedSparkline,
  updateSparkline,
  parseDataToTable,
  sortDataMatrixByLastChangedBidAmount
} 
