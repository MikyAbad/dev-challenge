const { StompService } = require('../Services/Stomp.service') 

const FX_REPO_CONSTANTS = {
  EVENT: {
    CONNECTED: 'CONNECTED',
    CONNECT_FAILED: 'CONNECT_FAILED',
  },
  DESTINATION: {
    RATE: '/fx/prices',
  },
} 

class FxStompRepo extends StompService {
  constructor() {
    super({
      events: {
        connection_success: FX_REPO_CONSTANTS.EVENT.CONNECTED,
        connection_failed: FX_REPO_CONSTANTS.EVENT.CONNECT_FAILED,
      },
    }) 
  }
}

module.exports = {
  FxStompRepo,
  FX_REPO_CONSTANTS,
} 
