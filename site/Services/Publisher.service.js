class Publisher {
  constructor() {
    this.eventMap = new Map() 
  }

  __getEventQueue(eventName) {
    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, []) 
    }
    return this.eventMap.get(eventName) 
  }

  dispatch(eventName, data) {
    const queue = this.eventMap.get(eventName) 
    if (!queue) return 
    queue.forEach((listener) => {
      if (typeof listener.run === 'function') {
        listener.run(data) 
      }
      if (listener.runsOnce) {
        queue.splice(queue.indexOf(listener), 1) 
      }
    }) 
  }

  on(eventName, callback) {
    const queue = this.__getEventQueue(eventName) 
    queue.push({
      run: callback,
      runsOnce: false,
    }) 
  }

  once(eventName, callback) {
    const queue = this.__getEventQueue(eventName) 
    queue.push({
      run: callback,
      runsOnce: true,
    }) 
  }

  destroy(eventName) {
    this.eventMap.delete(eventName) 
  }
}

module.exports = Publisher 