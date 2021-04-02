import App from '../App'
import '../../scss/main.scss'

const contentBodyLeftStickyHandler = () => {
  const contentHeading = document.querySelector('[data-content-heading]')
  const contentBodyLeftSticky = document.querySelector('[data-content-body-left-sticky]')

  if (!contentHeading || !contentBodyLeftSticky) return

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) contentBodyLeftSticky.classList.remove('is-visible')
      else contentBodyLeftSticky.classList.add('is-visible')
    })
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  observer.observe(contentHeading)
}

// APP
// ––––––––––––––––––––––

App({
  afterReady: () => {
    contentBodyLeftStickyHandler()
  },
})
