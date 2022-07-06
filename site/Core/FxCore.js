const Publisher = require('../Services/Publisher.service') 
const { FxStompRepo, FX_REPO_CONSTANTS } = require('./FxRepo') 
const {
  FX_CORE_MAX_RATES,
} = require('../App/app.config.js') 

class FxCore extends Publisher {
  constructor() {
    super() 
    this.fxRates = {} 
    this.repo = new FxStompRepo() 
    this.repo.connect() 
    this.repo.once(this.repo.config.events.connection_success, () => {
      this.repo.subscribe(FX_REPO_CONSTANTS.DESTINATION.RATE) 
    }) 
    this.repo.on(FX_REPO_CONSTANTS.DESTINATION.RATE, (fx) => {
      this.updateFx(fx.name, fx) 
      this.dispatch('data', this.fxRates) 
    }) 
  }

  updateFx(fxName, fx) {
    const timestamp = Number(new Date()) 
    const newFxRate = Object.assign(
      {
        timestamp,
        avg: (fx.bestBid + fx.bestAsk) / 2,
      },
      fx
    ) 
    const fxData = this.fxRates[fxName] 
    if (!fxData) {
      this.fxRates[fxName] = [newFxRate] 
      return 
    }
    fxData.unshift(newFxRate) 
    if (fxData.length > FX_CORE_MAX_RATES) {
      fxData.length = FX_CORE_MAX_RATES 
    }
  }
}

module.exports = FxCore 