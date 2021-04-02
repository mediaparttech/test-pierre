// APP
// ––––––––––––––––––––––

import { isFunction } from '../helpers/types'
import { onContentLoaded } from '../helpers/events'
import contentLoaded from './callbacks/contentLoaded'
import documentReady from './callbacks/documentReady'

/**
 * @class App
 * @description App bootstrap
 *
 * @param {Function} afterReady - after document ready callback
 * @param {Function} afterLoaded - after content loaded callback
 * @param {Boolean} delayAfterLoaded - delay afterLoaded event to launch it manually
 */
class App {
  constructor(param) {
    const defaults = {
      afterReady: null,
      afterLoaded: null,
      delayAfterLoaded: false,
    }

    this.config = { ...defaults, ...param }

    this.alreadyLoaded = false

    this.init()
  }

  onContentLoaded() {
    if (this.alreadyLoaded) return

    this.alreadyLoaded = true

    contentLoaded()

    if (isFunction(this.config.afterLoaded)) this.config.afterLoaded()
  }

  init() {
    documentReady()

    if (isFunction(this.config.afterReady)) this.config.afterReady()

    if (this.config.delayAfterLoaded) return

    onContentLoaded()
      .then(() => this.onContentLoaded())
      .catch(error => alert(error.message))
  }
}

export default param => new App(param)
