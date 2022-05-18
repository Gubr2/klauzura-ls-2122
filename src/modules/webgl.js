import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Group } from 'three'
import Stats from 'stats.js'
import gsap from 'gsap'

export default class WebGL {
  constructor(options) {
    //
    // SETTINGS
    //

    // ---> Houses

    this.vDist = 0.83809
    this.hCount = 3
    this.vCount = 7

    this.target = new THREE.Vector3()

    // ---> Fog
    this.fogColor = 0xf5eedf

    ///////////////////////////////////////////////

    //
    // STATS
    //

    this.stats = new Stats()
    this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom)

    ///////////////////////////////////////////////

    //
    // THREE
    //

    // Base

    this.container = options.dom

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.Fog(this.fogColor, 4, 8)

    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight

    this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 4
    this.camera.position.y = 4
    this.camera.position.x = 2

    this.renderer = new THREE.WebGLRenderer({
      // alpha: true,
      antialias: true,
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    // this.renderer.toneMapping = THREE.ReinhardToneMapping

    this.container.appendChild(this.renderer.domElement)

    // Controls

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // Time

    this.time = 0

    // Loading Manager
    this.manager = new THREE.LoadingManager()

    // Flags
    this.loadedForAnimation = false

    // Empty Variables
    this.lightObject
    this.mouseX

    // Functions
    this.resize()
    this.setupResize()
    this.mouseMovement()
    this.promises()
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

  mouseMovement() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX / this.width
    })
  }

  addHouses() {
    return new Promise((resolve) => {
      // GROUPS
      this.group_main = new THREE.Group()

      this.scene.add(this.group_main)

      // GLTF
      this.loader = new GLTFLoader(this.manager)

      this.loader.load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/gltf/house_1.gltf', (gltf) => {
        this.house_1 = gltf.scene

        for (let i = 0; i < this.vCount; i++) {
          for (let y = 0; y < this.hCount; y++) {
            this.clone = this.house_1.clone()

            this.clone.rotation.y = Math.PI

            this.clone.position.x = i % 2 == 0 ? y * 2 + 1 : y * 2
            this.clone.position.z = i * this.vDist

            this.group_main.add(this.clone)
          }
        }
      })

      this.loader.load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/gltf/house_2.gltf', (gltf) => {
        this.house_2 = gltf.scene

        for (let i = 0; i < this.vCount; i++) {
          for (let y = 0; y < this.hCount; y++) {
            this.clone = this.house_2.clone()

            this.clone.rotation.y = Math.PI

            this.clone.position.x = i % 2 == 0 ? y * 2 + 2 : y * 2 + 1
            this.clone.position.z = i * this.vDist

            this.group_main.add(this.clone)
          }
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
        this.groupSize = new THREE.Box3().setFromObject(this.group_main).getSize(new THREE.Vector3())

        this.group_main.position.x = -this.groupSize.x / 2
        this.group_main.position.z = -this.groupSize.z / 2

        resolve()
      }
    })
  }

  addLightObject() {
    return new Promise((resolve) => {
      this.lightObject = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 5), new THREE.MeshStandardMaterial({ color: 0xffffff }))

      this.lightObject.position.y = 0.1

      this.scene.add(this.lightObject)

      resolve()
    })
  }

  promises() {
    Promise.all([this.addHouses(), this.addLightObject()]).then(() => {
      console.log('resolved')
      this.loadedForAnimation = true
    })
  }

  render() {
    this.stats.begin()

    this.time += 0.05
    window.requestAnimationFrame(this.render.bind(this))

    this.group_main.position.z += 0.005

    if (this.loadedForAnimation) {
      this.scene.children[0].children.forEach((house) => {
        if (house.getWorldPosition(this.target).z > 2.5) {
          house.position.z -= this.vDist * this.vCount
        }
      })

      this.lightObject.position.y += Math.sin(this.time) * 0.0015
      this.lightObject.position.x = (this.mouseX - 0.5) * 0.05

      console.log(this.lightObject.position.x)
    }

    this.camera.lookAt(0, 0, 0)

    this.renderer.render(this.scene, this.camera)

    this.stats.end()
  }
}
