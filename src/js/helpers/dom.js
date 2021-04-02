// HELPERS - DOM
// ––––––––––––––––––––––

/**
 * Get HTML element
 */
export const htmlElement = document.documentElement

/**
 * Get Body element
 */
export const bodyElement = document.body

/**
 * Create a div element with class
 *
 * @param {string} className
 * @returns {htmlElement}
 */
export const createDivWithClass = className => {
  const div = document.createElement('div')
  div.className = className

  return div
}

/**
 * Create a div element with id
 *
 * @param {string} idName
 * @returns {htmlElement}
 */
export const createDivWithId = idName => {
  const div = document.createElement('div')
  div.id = idName

  return div
}

/**
 * Insert Node before an other
 *
 * @param {Node} newNode
 * @param {Node} referenceNode
 */
export const insertBefore = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode)
}

/**
 * Insert Node after an other
 *
 * @param {Node} newNode
 * @param {Node} referenceNode
 */
export const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

/**
 * Append a Dom element and return a promise when done
 *
 * @param {Node} element
 * @param {Node} parent (default = document body)
 * @returns {Promise}
 */
export const appendElementPromise = (element, parent = bodyElement) => {
  return new Promise(resolve => {
    const observer = new MutationObserver(mutations => {
      const firstMutation = mutations[0]
      const node = firstMutation.addedNodes[0]

      if (node === element) {
        observer.disconnect()

        resolve(element)
      }
    })

    // Init observer
    observer.observe(parent, { childList: true, subtree: true })

    // Append element to parent
    parent.appendChild(element)
  })
}

/**
 * Remove a Dom element and return a promise when done
 *
 * @param {Node} element
 * @param {Node} parent
 * @returns {Promise}
 */
export const removeElementPromise = (element, parent = element.parentNode) => {
  if (!parent) throw new Error('The node must already be attached')

  return new Promise(resolve => {
    const observer = new MutationObserver(mutations => {
      const firstMutation = mutations[0]
      const node = firstMutation.removedNodes[0]

      if (node === element) {
        observer.disconnect()

        resolve(element)
      }
    })

    // Init observer
    observer.observe(parent, { childList: true, subtree: true })

    // Remove element
    element.remove()
  })
}
