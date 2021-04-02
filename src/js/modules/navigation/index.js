// NAVIGATION
// ––––––––––––––––––––––

import { onScroll, onWindowResize, onEscUp } from '../../helpers/events'
import { preventScrolling, enableScrolling } from '../../helpers/tools'

export default () => {
  const nav = document.querySelector('[data-nav]')

  class Toggle {
    constructor(toggleSelector, activeClass) {
      this.activeState = false
      this.toggleSelector = toggleSelector
      this.activeClass = activeClass

      this.init()
    }

    hide() {
      enableScrolling()
      this.activeState = false
      nav.classList.remove(this.activeClass)
    }

    show() {
      preventScrolling()
      this.activeState = true
      nav.classList.add(this.activeClass)
    }

    init() {
      const toggleButton = nav.querySelector(this.toggleSelector)

      if (!toggleButton) return

      nav.querySelector(this.toggleSelector).addEventListener('click', event => {
        if (this.activeState) this.hide()
        else this.show()
      })

      onEscUp(() => {
        if (this.activeState) this.hide()
      })

      onWindowResize(() => {
        if (this.activeState) this.hide()
      })
    }
  }

  const hideOnScroll = () => {
    const htmlElement = document.documentElement

    let scrollTop = htmlElement.scrollTop

    const toggleNavVisibility = () => {
      if (htmlElement.scrollTop > scrollTop && htmlElement.scrollTop > nav.offsetHeight) nav.classList.add('is-hidding')
      else if (htmlElement.scrollTop < scrollTop) nav.classList.remove('is-hidding')

      scrollTop = htmlElement.scrollTop
    }

    onScroll(toggleNavVisibility)
  }

  const userToggle = new Toggle('[data-nav-user-toggle]', 'nav--user-active')
  const searchToggle = new Toggle('[data-nav-search-toggle]', 'nav--search-active')
  const burgerToggle = new Toggle('[data-nav-burger-toggle]', 'nav--burger-active')

  document.querySelector('[data-nav-search-close]').addEventListener('click', event => {
    searchToggle.hide()
  })

  document.querySelector('.nav-overlay').addEventListener('click', event => {
    userToggle.hide()
    searchToggle.hide()
    burgerToggle.hide()
  })

  hideOnScroll()
}
