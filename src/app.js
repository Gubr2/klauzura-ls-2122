import WebGL from './modules/webgl'
import Fullscreen from './modules/fullscreen'
import TextSeparate from './modules/separate'

const webgl = new WebGL({
  dom: document.querySelector('.webgl'),
})
const fullscreen = new Fullscreen()
const separate = new TextSeparate()

separate.separate('[data-separate]')
