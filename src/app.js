import WebGL from './modules/webgl'
import Fullscreen from './modules/fullscreen'

const webgl = new WebGL({
  dom: document.querySelector('.webgl'),
})
const fullscreen = new Fullscreen()
