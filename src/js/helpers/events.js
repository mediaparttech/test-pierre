// HELPERS - EVENTS
// ––––––––––––––––––––––

import { isFunction } from './types'
import throttle from 'raf-schd'

/**
 * On windows resize
 *
 * @param {function} callback
 */
export const onWindowResize = callback => {
  // Check if the callback is a function
  if (!isFunction(callback)) {
    console.error('the callback is not a function')

    return
  }

  const throttled = throttle(callback)

  window.addEventListener('resize', throttled)
}

/**
 * On scroll
 *
 * @param {function} callback
 * @param {Element} element
 */
export const onScroll = (callback, element = document) => {
  // Check if the callback is a function
  if (!isFunction(callback)) {
    console.error('the callback is not a function')

    return
  }

  const throttled = throttle(callback)

  element.addEventListener('scroll', throttled)
}

/**
 * On escape key up
 *
 * @param {function} callback
 */
export const onEscUp = callback => {
  // Check if the callback is a function
  if (!isFunction(callback)) {
    console.error('the callback is not a function')

    return
  }

  document.addEventListener('keyup', event => {
    if (event.keyCode === 27) callback()
  })
}

/**
 * On document ready
 *
 * @param {function} callback
 */
export const onDocumentReady = () => {
  return new Promise(resolve => {
    // Resolve if document is already ready
    if (document.readyState === 'interactive') resolve()

    // Define on ready callback
    const onready = event => {
      // Remove event listener
      document.removeEventListener('DOMContentLoaded', onready)

      // Resolve Promise
      resolve()
    }

    // Add loaded event listener on document
    document.addEventListener('DOMContentLoaded', onready)
  })
}

/**
 * On content loaded
 *
 * @param {function} callback
 */
export const onContentLoaded = () => {
  return new Promise(resolve => {
    // Resolve if content is already loaded
    if (document.readyState === 'complete') resolve()

    // Define on load callback
    const onload = () => {
      // Remove events listener
      window.removeEventListener('load', onload)

      // Resolve Promise
      resolve()
    }

    // Add loaded event listener on windows
    window.addEventListener('load', onload)
  })
}

/**
 * Detect print request
 *
 * @param {function} callback
 */
export const onPrintRequest = callback => {
  // Check if the callback is a function
  if (!isFunction(callback)) {
    console.error('the callback is not a function')

    return
  }

  if ('onbeforeprint' in window) {
    window.addEventListener('beforeprint', callback)
  } else if (window.matchMedia) {
    window.matchMedia('print').addListener(mediaQueryList => {
      if (mediaQueryList.matches) callback()
    })
  }
}
