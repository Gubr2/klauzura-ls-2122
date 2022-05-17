import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class WebGL {
  constructor(options) {
    // Base

    this.container = options.dom

    this.scene = new THREE.Scene()

    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 1

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.ReinhardToneMapping

    this.container.appendChild(this.renderer.domElement)

    // Controls

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // Time

    this.time = 0

    // Loading Manager
    this.manager = new THREE.LoadingManager()

    // Empty Variables
    this.house_1

    // Functions
    this.resize()
    this.setupResize()
    this.addObjects()
    this.render()
    this.loadingManager()
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
    // GLTF
    this.loader = new GLTFLoader(this.manager)

    this.loader.load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/gltf/house_1.gltf', (gltf) => {
      this.house_1 = gltf.scene

      this.texture = new THREE.TextureLoader().load('textures/Color_1-min.png')
      this.house_1.traverse((o) => {
        console.log(o)
        if (o.isMesh) {
          o.material.map = this.texture
        }
      })

      this.scene.add(this.house_1)
    })

    // LIGHTS
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
    this.scene.add(this.light)
  }

  loadingManager() {
    this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
      // console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }

    this.manager.onLoad = function () {
      // console.log(this.house_1)
    }

    this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
    }

    this.manager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }
  }

  render() {
    this.time += 0.05
    window.requestAnimationFrame(this.render.bind(this))

    this.renderer.render(this.scene, this.camera)
  }
}
