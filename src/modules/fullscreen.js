export default class Fullscreen {
  constructor() {
    this.elem = document.documentElement

    this.button = document.querySelector('.ui__bottom__fullscreen--btn')
    this.buttonFlag = true
    this.buttonHandler()
  }

  buttonHandler() {
    this.button.addEventListener('click', () => {
      if (this.buttonFlag) {
        this.openFullscreen()
      } else {
        this.closeFullscreen()
      }
    })
  }

  /* View in fullscreen */
  openFullscreen() {
    this.buttonFlag = false
    // this.button.style.visibility = 'hidden'
    this.button.innerHTML = 'fullscreen_exit'

    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen()
    } else if (this.elem.webkitRequestFullscreen) {
      /* Safari */
      this.elem.webkitRequestFullscreen()
    } else if (this.elem.msRequestFullscreen) {
      /* IE11 */
      this.elem.msRequestFullscreen()
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    this.buttonFlag = true

    this.button.innerHTML = 'fullscreen'

    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen()
    }
  }
}
