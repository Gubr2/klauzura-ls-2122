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
    // this.renderer.toneMapping = THREE.ReinhardToneMapping

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
    // ---> Main Group
    this.group_1 = new THREE.Group()
    this.group_2 = new THREE.Group()

    this.scene.add(this.group_1)
    this.scene.add(this.group_2)

    // GLTF
    this.loader = new GLTFLoader(this.manager)

    // 0.83809

    this.loader.load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/gltf/house_1.gltf', (gltf) => {
      this.house_1 = gltf.scene

      for (let index = 0; index < 5; index++) {
        this.clone = this.house_1.clone()

        this.clone.rotation.y = Math.PI
        this.clone.position.x = index * 2

        this.group_1.add(this.clone)
      }
    })

    this.loader.load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/gltf/house_2.gltf', (gltf) => {
      this.house_2 = gltf.scene

      for (let index = 0; index < 5; index++) {
        this.clone = this.house_2.clone()

        this.clone.rotation.y = Math.PI
        this.clone.position.x = index * 2 + 1

        this.group_2.add(this.clone)
      }
    })

    // this.loader.load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/gltf/house_1.gltf', (gltf) => {
    //   this.house_1 = gltf.scene
    //   // this.texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/textures/Color_1-min.png')
    //   // this.texture.flipY = false
    //   // this.house_1.traverse((o) => {
    //   //   console.log(o)
    //   //   if (o.isMesh) {
    //   //     o.material.map = this.texture
    //   //     o.material = new THREE.MeshNormalMaterial()
    //   //   }
    //   // })
    //   this.group.add(this.house_1)

    //   this.house_1.traverse((o) => {
    //     console.log(o)
    //     // if (o.isMesh) {
    //     //   o.material.map = this.texture
    //     //   o.material = new THREE.MeshNormalMaterial()
    //     // }
    //   })
    // })

    // LIGHTS
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
    this.scene.add(this.light)

    // AFTER LOAD
    this.manager.onLoad = () => {
      this.groupSize = new THREE.Box3().setFromObject(this.group_1).getSize(new THREE.Vector3())

      this.group_1.position.x = -this.groupSize.x / 2
      this.group_2.position.x = -this.groupSize.x / 2
    }
  }

  render() {
    this.time += 0.05
    window.requestAnimationFrame(this.render.bind(this))

    this.renderer.render(this.scene, this.camera)
  }
}
