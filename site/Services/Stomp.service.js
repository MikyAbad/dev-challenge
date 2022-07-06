const { STOMP_URL } = require('../App/app.config') 
const Publisher = require('./Publisher.service') 
const stompConfigObject = {
  events: {
    connection_success: '',
    connection_failed: '',
  },
} 

class StompService extends Publisher {
  constructor(config) {
    super() 
    this.config = Object.assign({}, stompConfigObject, config || {}) 
    this.client = Stomp.client(STOMP_URL) 
    this.client.debug = (msg) => global.DEBUG && console.info(msg) 
  }

  connect() {
    const successCallback = () =>
      this.dispatch(this.config.events.connection_success) 
    const errorCallback = () =>
      this.dispatch(this.config.events.connection_failed) 
    this.client.connect({}, successCallback, errorCallback) 
  }

  subscribe(destination) {
    this.client.subscribe(destination, (message) =>
      this.dispatch(destination, JSON.parse(message.body))
    ) 
  }

  unsubscribe(destination) {
    this.client.unsubscribe(destination) 
  }
}

module.exports = {
  StompService,
} 