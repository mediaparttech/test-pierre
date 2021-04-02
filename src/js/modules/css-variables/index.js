// CSS VARIABLES
// ––––––––––––––––––––––

import { scrollbarWidth } from '../../helpers/tools'
import { onWindowResize } from '../../helpers/events'

const setScrollbarWidth = () => document.documentElement.style.setProperty('--global-scrollbar-width', `${scrollbarWidth}px`)

export default () => {
  setScrollbarWidth()
  onWindowResize(setScrollbarWidth)
}
