const { Client } = require('discord.js')

/**
 * A lockable client that can interact with the Discord API.
 * @extends {Client}
 */
class LockableClient extends Client {
  constructor(options) {
    super(options)
    this.locked = false
  }
  lock() {
    this.setLocked(true)
  }
  unlock() {
    this.setLocked(false)
  }
  setLocked(locked) {
    return this.locked = locked
  }
  isLocked() {
    return this.locked
  }
}

module.exports = {LockableClient};