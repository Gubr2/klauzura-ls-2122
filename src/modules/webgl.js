import * as THREE from 'three'
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from '../../node_modules/three/examples/jsm/loaders/DRACOLoader'

export default class WebGL {
  constructor(options) {
    this.container = options.dom

    this.scene = new THREE.Scene()

    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      outputEncoding: THREE.sRGBEncoding,
    })
    this.container.appendChild(this.renderer.domElement)

    this.time = 0

    this.resize()
    this.setupResize()
    this.addObjects()
    this.render()
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  addObjects() {
    const loader = new GLTFLoader()

    loader.load(
      'house_1',
      (gltf) => {
        console.log(gltf)
        // this.scene.add(gltf.scene.children[0])
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )
  }

  render() {
    this.time += 0.05
    window.requestAnimationFrame(this.render.bind(this))

    this.renderer.render(this.scene, this.camera)
  }
}
