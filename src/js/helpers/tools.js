// HELPERS - TOOLs
// ––––––––––––––––––––––

import { htmlElement } from './dom'

/**
 * Get element scrollbar width
 */
export const scrollbarWidth = window.innerWidth - htmlElement.clientWidth

/**
 * Prevent scrolling
 */
export const preventScrolling = () => htmlElement.classList.add('no-scroll')

/**
 * Enable scrolling
 */
export const enableScrolling = () => htmlElement.classList.remove('no-scroll')

/**
 * Reset scroll position
 */
export const resetScrollPosition = () => window.scrollTo(0, 0)

/**
 * Redirect to homepage
 *
 * @param {number} delay
 */
export const redirectToHomepage = (delay = 0) => setTimeout(() => (window.location.href = '/'), delay)

/**
 * Shuffle Array
 *
 * @param {array} array
 */
export const shuffleArray = array => array.sort(() => Math.random() - 0.5)

/**
 * Check if video is playing
 *
 * @param {Node} video
 * @returns {Promise}
 */
export const videoPlaying = video => {
  return new Promise(resolve => {
    if (!video.paused) resolve(video)
  })
}

/**
 * Get document lang
 */
export const lang = htmlElement.lang

/**
 * Get domain URL
 */
export const domainURL = location.host

/**
 * Load script from source
 *
 * @param {URL} scriptSource
 * @returns {Promise}
 */
export const loadScript = scriptSource => {
  // Return a promise to load the script
  return new Promise((resolve, reject) => {
    // Get document head or first script as anchor
    const head = document.head || document.getElementsByTagName('head')[0]

    // Create a new script
    const scriptElement = document.createElement('script')

    // Define events callbacks
    const loadCallback = () => {
      // Remove events listener
      scriptElement.removeEventListener('load', loadCallback)
      scriptElement.removeEventListener('error', errorCallback)

      // Resolve Promise
      resolve()
    }

    const errorCallback = () => {
      // Remove events listener
      scriptElement.removeEventListener('load', loadCallback)
      scriptElement.removeEventListener('error', errorCallback)

      // Reject Promise
      reject(new Error(`Failed to load ${scriptSource}`))
    }

    // Listen to load and error events on script element
    scriptElement.addEventListener('load', loadCallback)
    scriptElement.addEventListener('error', errorCallback)

    // Define script properties
    scriptElement.charset = 'utf-8'
    scriptElement.src = scriptSource
    scriptElement.async = true

    // Append script element to head
    head.appendChild(scriptElement)
  })
}

/**
 * Method to fetch image from source
 *
 * @param {URL} imgSource
 * @returns {Promise}
 */
export const fetchImage = (imgSource, image = new Image()) => {
  // Return a promise to fetch the image
  return new Promise((resolve, reject) => {
    // Define events callbacks
    const loadCallback = () => {
      // Remove events listener
      image.removeEventListener('load', loadCallback)
      image.removeEventListener('error', errorCallback)

      // Resolve Promise
      resolve(image)
    }

    const errorCallback = () => {
      // Remove events listener
      image.removeEventListener('load', loadCallback)
      image.removeEventListener('error', errorCallback)

      // Reject Promise
      reject(new Error(`Failed to load image ${imgSource}`))
    }

    // Listen to load and error events on image
    image.addEventListener('load', loadCallback)
    image.addEventListener('error', errorCallback)

    // Set image source
    image.src = imgSource
  })
}
