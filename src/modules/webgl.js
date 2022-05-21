import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import Stats from 'stats.js'
import gsap from 'gsap'

export default class WebGL {
  constructor(options) {
    //
    // SETTINGS
    //

    // ---> Global
    this.globalSpeed = 0.0035

    // ---> Houses
    this.vDist = 0.83809
    this.hCount = 4
    this.vCount = 8

    this.target = new THREE.Vector3()

    // ---> Fog
    this.fogColor = 0xf5eedf

    // ---> Light Object
    this.lightObjectV = 0.2
    this.lightObjectGrow = 0.025

    // ---> Video
    this.video = document.querySelector('video')
    this.video.playbackRate = 2

    // ---> Particles
    this.particlesCount = 30
    this.particlesMinSize = 0.01
    this.particlesMaxSize = 0.01

    // ---> Hover
    this.hoverCount = 5
    this.hoverSize = 0.1
    this.hoverUnhideFactor = 4
    this.hoverLineHeight = 0.5

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
    this.scene.fog = new THREE.Fog(this.fogColor, 4, 9)

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

    // Composer
    this.composer = new EffectComposer(this.renderer)
    this.composer.setSize(this.width, this.height)

    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    this.unrealBloomPass = new UnrealBloomPass()
    this.unrealBloomPass.strength = 2
    this.unrealBloomPass.threshold = 0.99
    this.unrealBloomPass.radius = 1
    this.composer.addPass(this.unrealBloomPass)

    // Time

    this.time = 0

    // Loading Manager
    this.manager = new THREE.LoadingManager()

    // Flags
    this.loadedForAnimation = false
    this.hoverFlag = true
    this.mouseFlag = true

    // Empty Variables
    this.lightSource
    this.lightObject
    this.mouseX
    this.distance

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
    this.composer.setSize(this.width, this.height)
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
      this.group_houses = new THREE.Group()
      this.group_houses.name = 'group_houses'

      this.scene.add(this.group_houses)

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

            this.group_houses.add(this.clone)
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

            this.group_houses.add(this.clone)
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
        this.groupSize = new THREE.Box3().setFromObject(this.group_houses).getSize(new THREE.Vector3())

        this.group_houses.position.x = -this.groupSize.x / 2
        this.group_houses.position.z = -this.groupSize.z / 2

        resolve()
      }
    })
  }

  addLightObject() {
    return new Promise((resolve) => {
      this.lightSource = new THREE.PointLight(0xffffff, 2, 1)

      this.lightObject = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 10, 5),
        new THREE.MeshStandardMaterial({
          //
          color: 0xffffff,
          emissive: 0xffffff,
          emissiveIntensity: 1,
        })
      )

      this.lightObject.position.y = this.lightObjectV
      this.lightSource.position.y = this.lightObjectV

      this.scene.add(this.lightSource)
      this.scene.add(this.lightObject)

      resolve()
    })
  }

  addHoverParticles() {
    return new Promise((resolve) => {
      this.group_particles = new THREE.Group()
      this.group_particles.name = 'group_paricles'

      this.group_particles.position.y = this.lightObjectV

      this.scene.add(this.group_particles)

      for (let i = 0; i < this.particlesCount; i++) {
        this.particle = new THREE.Mesh(new THREE.BoxGeometry(this.particlesSize, this.particlesSize, this.particlesSize), new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0 }))
        this.group_particles.add(this.particle)

        this.particle.position.x = this.randomGenerator(-0.2, 0.2)
        this.particle.position.z = this.randomGenerator(-0.2, 0.2)
        this.particle.position.y = -this.lightObjectV

        this.size = 0
        this.particle.scale.set(this.size, this.size, this.size)
      }

      resolve()
    })
  }

  addHoverObjects() {
    return new Promise((resolve) => {
      this.group_hover = new THREE.Group()
      this.group_hover.name = 'group_hover'

      this.group_hover.position.z = -this.vDist * 2

      this.scene.add(this.group_hover)

      for (let i = 0; i < this.hoverCount; i++) {
        this.hoverObject = new THREE.Mesh(new THREE.PlaneGeometry(this.hoverSize, this.hoverSize), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, visible: false, transparent: true, opacity: 1 }))
        this.group_hover.add(this.hoverObject)

        this.positionH = this.randomGenerator(-1, 1)

        this.hoverObject.position.z = -i * this.vDist + this.vDist / 3 - this.hoverSize / 2
        this.hoverObject.position.x = this.positionH
        this.hoverObject.rotation.x = Math.PI / -2
        this.hoverObject.position.y = 0.1

        this.texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/Gubr2/klauzura-ls-2122/main/src/textures/line_alpha.png')

        this.line = new THREE.Mesh(new THREE.PlaneGeometry(0.005, this.hoverLineHeight), new THREE.MeshBasicMaterial({ color: 0xffffff, visible: true, transparent: true, opacity: 0 }))
        this.group_hover.add(this.line)

        this.line.position.z = -i * this.vDist + this.vDist / 3 - this.hoverSize / 2
        this.line.position.x = this.positionH
        this.line.position.y = this.hoverLineHeight / 2
      }

      resolve()
    })
  }

  randomGenerator(min, max) {
    return Math.random() * (max - min) + min
  }

  promises() {
    Promise.all([
      //
      this.addHouses(),
      this.addLightObject(),
      this.addHoverParticles(),
      this.addHoverObjects(),
    ]).then(() => {
      console.log('resolved')
      this.loadedForAnimation = true
    })
  }

  //
  //  RENDER FUNCTIONS
  //

  refreshHousePosition() {
    this.scene.getObjectByName('group_houses').children.forEach((house) => {
      if (house.getWorldPosition(this.target).z > 2.5) {
        house.position.z -= this.vDist * this.vCount
      }
    })
  }

  hoverOnObjects() {
    this.scene.getObjectByName('group_hover').children.forEach((hoverObject, index) => {
      // [] --- Refresh Object Position
      if (hoverObject.getWorldPosition(this.target).z > 2) {
        hoverObject.position.z -= this.vDist * this.hoverCount
      }

      // [] --- Move Particles
      if (hoverObject.getWorldPosition(this.target).z >= -this.vDist / 2 && hoverObject.getWorldPosition(this.target).z < this.vDist / 2) {
        this.group_particles.position.x = hoverObject.position.x
        this.group_particles.position.z += this.globalSpeed
      }

      // [] --- Reset Particles
      if (hoverObject.getWorldPosition(this.target).z >= -this.vDist / 2 && hoverObject.getWorldPosition(this.target).z < -this.vDist / 2.25) {
        this.group_particles.position.z = -this.vDist / 2
      }

      // [] --- Unhide Object
      if (
        hoverObject.getWorldPosition(this.target).z <= this.lightObject.position.z + this.hoverSize * this.hoverUnhideFactor &&
        hoverObject.getWorldPosition(this.target).z >= this.lightObject.position.z + -this.hoverSize * this.hoverUnhideFactor &&
        hoverObject.getWorldPosition(this.target).x <= this.lightObject.position.x + this.hoverSize * this.hoverUnhideFactor &&
        hoverObject.getWorldPosition(this.target).x >= this.lightObject.position.x + -this.hoverSize * this.hoverUnhideFactor
        //
      ) {
        gsap.to(hoverObject.material, {
          opacity: 0.25,
          duration: 1,
        })
      } else {
        gsap.to(hoverObject.material, {
          opacity: 0,
          duration: 1,
        })
      }

      // [] --- Reveal Object
      if (
        hoverObject.getWorldPosition(this.target).z <= this.lightObject.position.z + this.hoverSize &&
        hoverObject.getWorldPosition(this.target).z >= this.lightObject.position.z + -this.hoverSize &&
        hoverObject.getWorldPosition(this.target).x <= this.lightObject.position.x + this.hoverSize &&
        hoverObject.getWorldPosition(this.target).x >= this.lightObject.position.x + -this.hoverSize
        //
      ) {
        this.group_particles.children.forEach((particle, index) => {
          setTimeout(() => {
            particle.position.x *= 0.95
            particle.position.z *= 0.95
            particle.position.y *= 0.95

            this.particlesSize = this.randomGenerator(0.005, 0.01)

            gsap.to(particle.scale, {
              x: this.particlesSize,
              y: this.particlesSize,
              z: this.particlesSize,
              duration: 1,
            })
          }, index * 20)

          gsap.to(hoverObject.material, {
            opacity: 1,
            duration: 1,
          })
        })

        // Slow Down
        this.hoverAnimations(hoverObject)
      }
    })
  }

  hoverAnimations(hoverObject) {
    //
    // SLOW DOWN
    //

    // ---> Global
    this.globalSpeed *= 0.95

    // ---> Video
    this.video.playbackRate = 0

    // ---> Camera
    gsap.to(this.camera, {
      zoom: 1.05,
      duration: 5,
      ease: 'power3',
    })
    this.camera.updateProjectionMatrix()

    ///////////////////////////////

    // ---> Light
    this.hDistance = this.lightObject.position.x - hoverObject.getWorldPosition(this.target).x
    this.vDistance = this.lightObject.position.z - hoverObject.getWorldPosition(this.target).z

    this.lightObjectGrow *= 0.95

    this.lightSource.position.x -= this.hDistance / 50
    this.lightObject.position.x -= this.hDistance / 50

    gsap.to(this.lightObject.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      delay: 0.5,
      duration: 2,
      ease: 'power2',
    })

    this.group_particles.position.z *= 0.95

    this.mouseFlag = false
  }

  //
  // RENDER
  //

  render() {
    this.stats.begin()

    this.time += 0.05
    window.requestAnimationFrame(this.render.bind(this))

    this.group_houses.position.z += this.globalSpeed
    this.group_hover.position.z += this.globalSpeed

    if (this.loadedForAnimation) {
      this.refreshHousePosition()

      // ---> Hover Object & Particles
      this.hoverOnObjects()

      // ---> Move Hover Particles

      this.mouseXConverted = (this.mouseX - 0.5) * 1.5

      this.lightSource.position.y += Math.sin(this.time) * 0.0015
      this.lightObject.position.y += Math.sin(this.time) * 0.0015
      this.group_particles.position.y += Math.sin(this.time) * 0.0015
      // this.lightSource.position.x += this.mouseXConverted / 10
      // this.lightObject.position.x += this.mouseXConverted / 10

      if (this.mouseFlag) {
        this.distance = this.lightObject.position.x - this.mouseXConverted * 1.5

        this.lightSource.position.x -= this.distance / 50
        this.lightObject.position.x -= this.distance / 50
      }

      this.camera.lookAt(0, 0, 0)

      this.composer.render()
    }

    this.stats.end()
  }
}
