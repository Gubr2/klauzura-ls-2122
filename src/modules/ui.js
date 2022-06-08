import gsap from 'gsap'
import Texts from './texts'

export default class UI {
  constructor() {
    this.texts = new Texts()

    this.storyContainer = document.querySelector('.ui__story--container')

    this.btnAbout = document.querySelector('.ui__top__btn--about')
    this.btnAllStories = document.querySelector('.ui__top__btn--allstories')
    this.btnClose = document.querySelector('.menu--close')

    this.about = document.querySelector('.about')
    this.allStories = document.querySelector('.allstories')
    this.menuOverlay = document.querySelector('.menu__overlay')
    this.uiIntro = document.querySelector('.ui__intro')
    this.uiRead = document.querySelector('.ui__read')
    this.uiSidebar = document.querySelector('.ui__sidebar')

    this.menuAboutHandler()
    this.menuAllStoriesHandler()
    this.closeButtonHandler()
    this.generateAllStories()

    this.menuAboutFlag = true
    this.menuAllStoriesFlag = true
    this.menuOverlayFlag = true
    this.mousemoveFlag = true
  }

  //
  // INTRO
  //

  introAnimations() {
    gsap.fromTo(
      '.ui__intro__title span',
      {
        autoAlpha: 0.25,
        y: 'random(2.5%, -2.5%)',
      },
      {
        delay: 0.5,
        duration: 3,
        ease: 'power3.out',
        autoAlpha: 1,
        y: '0%',
        stagger: {
          from: 'center',
          amount: 0.5,
          axis: 'x',
        },
        onStart: () => {
          document.querySelector('.ui__intro__title').style.display = 'flex'
        },
      }
    )

    gsap.fromTo(
      '.ui__intro--btn',
      {
        autoAlpha: 0,
        scale: 0.8,
      },
      {
        delay: 1.5,
        duration: 2,
        ease: 'power3.out',
        autoAlpha: 1,
        scale: 1,
        onComplete: () => {
          document.querySelector('.ui__intro--btn').style.transition = '1s ease-in-out'
        },
      }
    )

    gsap.fromTo(
      '.ui__intro__symbol--line',
      {
        scaleY: 0,
        y: '-20%',
      },
      {
        delay: 0.5,
        scaleY: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'expo.out',
        transformOrigin: 'top',
        onStart: () => {
          document.querySelector('.ui__intro__symbol').style.display = 'flex'
        },
      }
    )

    gsap.fromTo(
      '.ui__intro__symbol--circle',
      {
        y: '-200%',
        // scaleY: 1.5,
      },
      {
        delay: 0.5,
        y: 0,
        // scaleY: 1,
        duration: 1,
        ease: 'expo.out',
        transformOrigin: 'top',
      }
    )

    gsap.fromTo(
      '.ui__intro__symbol',
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        delay: 0.5,
        duration: 2,
        ease: 'expo.out',
        transformOrigin: 'top',
      }
    )
  }

  //
  // REVEAL
  //

  reveal() {
    gsap.fromTo(
      '[data-reveal="ui"]',
      {
        autoAlpha: 0,
        y: '-20%',
      },
      {
        autoAlpha: 1,
        y: '0%',
        duration: 1.5,
        stagger: 0.1,
        delay: 1,
        onComplete: () => {
          document.querySelectorAll('[data-reveal="ui"]').forEach((element) => {
            element.style.transition = '0.5s'
          })
        },
      }
    )
  }

  //
  // INTRO HIDE
  //

  introHide() {
    gsap.to('.ui__intro__title span', {
      duration: 2,
      ease: 'power3.out',
      autoAlpha: 0,
      y: 'random(5%, -5%)',
      stagger: {
        from: 'center',
        amount: 0.5,
        axis: 'x',
      },
    })

    gsap.to('.ui__intro__symbol', {
      autoAlpha: 0,
      duration: 2,
      ease: 'expo.out',
      transformOrigin: 'top',
    })

    gsap.to('.ui__intro--btn', {
      duration: 1,
      ease: 'power3.out',
      autoAlpha: 0,
      scale: 0.8,
    })

    gsap.to('.ui__top__item', {
      autoAlpha: 0.75,
      duration: 2,
      ease: 'expo.out',
    })
  }

  //
  // RECOLOR ICONS
  //

  recolorIcons() {
    gsap.to('[data-reveal="ui"]', {
      color: '#fff',
      delay: 0.5,
      duration: 1.5,
    })
  }

  //
  // INTRO TEXT
  //

  introText() {
    return new Promise((resolve) => {
      this.tl = gsap.timeline()

      this.tl.fromTo(
        '.ui__intro__text--1 span span',
        {
          autoAlpha: 0.25,
          y: 'random(2%, -2%)',
        },
        {
          duration: 3,
          ease: 'power3.out',
          autoAlpha: 0.75,
          y: '0%',
          stagger: {
            amount: 1,
            from: 'center',
          },
          onStart: () => {
            gsap.fromTo(
              '.ui__intro__text--2 span span',
              {
                autoAlpha: 0.25,
                y: 'random(2%, -2%)',
              },
              {
                duration: 3,
                ease: 'power3.out',
                autoAlpha: 1,
                y: '0%',
                stagger: {
                  amount: 1,
                  from: 'center',
                },
              }
            )
          },
        }
      )

      this.tl.to('.ui__intro__text--1 span span', {
        autoAlpha: 0,
        y: 'random(2%, -2%)',
        ease: 'power3.out',
        duration: 1.5,
        delay: 1,
        stagger: {
          amount: 1,
          from: 'center',
        },
        onStart: () => {
          gsap.to('.ui__intro__text--2 span span', {
            autoAlpha: 0,
            y: 'random(2%, -2%)',
            ease: 'power3.out',
            duration: 1.5,
            delay: 0.25,
            stagger: {
              amount: 1,
              from: 'center',
            },
            onComplete: () => {
              resolve()
            },
          })

          gsap.to('.lds-ring', {
            autoAlpha: 0,
            duration: 1,
          })
        },
        onComplete: () => {
          resolve()
        },
      })

      // this.tl.fromTo(
      //   '.ui__intro__text--2 span span',
      //   {
      //     autoAlpha: 0,
      //     y: 'random(2%, -2%)',
      //   },
      //   {
      //     duration: 3,
      //     ease: 'power3.out',
      //     autoAlpha: 1,
      //     y: '0%',
      //     stagger: {
      //       amount: 0.5,
      //       axis: 'x',
      //     },
      //   }
      // )

      // this.tl.to('.ui__intro__text--2 span span', {
      //   autoAlpha: 0,
      //   ease: 'power3.out',
      //   duration: 1.5,
      //   delay: 1,
      //   onStart: () => {
      //     gsap.to('.ui__intro__text--icon', {
      //       delay: 2,
      //       autoAlpha: 1,
      //       duration: 2,
      //     })
      //   },
      // })
    })
  }

  mouseText() {
    return new Promise((resolve) => {
      gsap.fromTo(
        '.ui__intro__text--3 span span',
        {
          autoAlpha: 0,
          y: 'random(2%, -2%)',
        },
        {
          delay: 2,
          duration: 3,
          ease: 'power3.out',
          autoAlpha: 1,
          y: '0%',
          stagger: {
            amount: 1,
            from: 'center',
          },
          onStart: () => {
            gsap.to('.ui__intro__text--icon', {
              autoAlpha: 1,
              duration: 2,
            })
            setTimeout(() => {
              resolve()
              document.addEventListener('mousemove', (e) => {
                if (this.mousemoveFlag) {
                  gsap.to('.ui__intro__text--3 span span', {
                    autoAlpha: 0,
                    y: 'random(2%, -2%)',
                    ease: 'power3.out',
                    duration: 1.5,
                    delay: 1,
                    stagger: {
                      amount: 1,
                      from: 'center',
                    },
                  })
                  gsap.to('.ui__intro__text--icon', {
                    autoAlpha: 0,
                    ease: 'power3.out',
                    duration: 1.5,
                    delay: 1,
                  })
                  gsap.to('.ui__sidebar', {
                    duration: 1,
                    ease: 'power3.out',
                    autoAlpha: 1,
                  })
                  this.mousemoveFlag = false
                }
              })
            }, 2000)
          },
        }
      )
    })
  }

  //
  // READ
  //

  read() {
    document.querySelector('.ui__read').style.display = 'block'

    gsap.to('.ui__read--btn', {
      autoAlpha: 1,
      duration: 2,
      onComplete: () => {
        document.querySelector('.ui__read--btn').style.transition = '1s ease-in-out'
      },
    })

    gsap.to('.ui__read--continue', {
      autoAlpha: 1,
      delay: 0.25,
      duration: 2,
      onComplete: () => {
        document.querySelector('.ui__read--continue').style.transition = '1s ease-in-out'
      },
    })
  }

  hideRead() {
    gsap.to('.ui__read--btn', {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power3.out',
      onStart: () => {
        document.querySelector('.ui__read--btn').style.transition = 'inherit'
      },
    })

    gsap.to('.ui__read--continue', {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power3.out',
      onStart: () => {
        document.querySelector('.ui__read--continue').style.transition = 'inherit'
      },
      onComplete: () => {
        document.querySelector('.ui__read').style.display = 'none'
      },
    })

    gsap.to('.ui__top [data-reveal="ui"]', {
      autoAlpha: 1,
      stagger: 0.5,
      duration: 1,
      ease: 'power3.out',
    })
  }

  // STORY

  revealStory() {
    this.storyContainer.style.display = 'block'
    this.storyContainer.style.visibility = 'visible'
    this.storyContainer.style.opacity = '1'

    this.storyContainer.scrollTo(0, 0)

    gsap.fromTo(
      '.ui__story--title span',
      {
        autoAlpha: 0,
        y: 'random(2%, -2%)',
      },
      {
        delay: 1.25,
        duration: 3,
        y: 0,
        ease: 'power3.out',
        autoAlpha: 1,
        stagger: {
          from: 'center',
          amount: 0.75,
          axis: 'x',
        },
      }
    )

    gsap.fromTo(
      '.ui__story--number',
      {
        autoAlpha: 0,
      },
      {
        duration: 3,
        delay: 1.5,
        ease: 'power3.out',
        autoAlpha: 0.5,
      }
    )

    gsap.fromTo(
      '.ui__story--body',
      {
        autoAlpha: 0,
      },
      {
        duration: 3,
        delay: 2,
        ease: 'power3.out',
        autoAlpha: 1,
      }
    )

    gsap.fromTo(
      '.ui__story--btn',
      {
        autoAlpha: 0,
      },
      {
        duration: 3,
        delay: 3,
        ease: 'power3.out',
        autoAlpha: 1,
        onComplete: () => {
          document.querySelector('.ui__story--btn').style.transition = '1s ease-in-out'
        },
      }
    )

    gsap.fromTo(
      '.ui__story--close',
      {
        autoAlpha: 0,
      },
      {
        duration: 3,
        delay: 1,
        ease: 'power3.out',
        autoAlpha: 1,
        onComplete: () => {
          document.querySelector('.ui__story--close').style.transition = '1s ease-in-out'
        },
      }
    )

    gsap.to('.ui__top [data-reveal="ui"]', {
      autoAlpha: 0,
      stagger: 0.5,
      duration: 1,
      ease: 'power3.out',
    })
  }

  hideStory() {
    gsap.to('.ui__story--container', {
      autoAlpha: 0,
      duration: 1.5,
      ease: 'power3.out',
      onComplete: () => {
        document.querySelector('.ui__story--btn').style.transition = 'inherit'
      },
    })
  }

  //
  // MENU
  //

  // GENERATE ALL STORIES ITEMS

  generateAllStories() {
    this.texts.collection.forEach((item, index) => {
      this.allStories.insertAdjacentHTML(
        'beforeend',
        `
        <div class="allstories__item">
          <div class="allstories__item__number">0${index + 1}</div>
          <div class="allstories__item__title">${item.upperText + item.bottomText}</div>
          <div class="allstories__item__hr"></div>
        </div>
        `
      )
    })
  }

  // HANDLERS

  // ---> About Handler

  menuAboutHandler() {
    this.btnAbout.addEventListener('click', () => {
      if (this.menuOverlayFlag) {
        this.menuOpen('about')
        this.menuOverlayFlag = false
        this.menuAboutFlag = false
      } else {
        if (this.menuAllStoriesFlag) {
          this.menuOverlayFlag = true
          this.menuClose()
          this.menuAboutFlag = true
          this.menuAllStoriesFlag = true
        } else {
          this.menuChange('about')
          this.menuAboutFlag = false
          this.menuAllStoriesFlag = true
        }
      }

      // console.log(`menuAboutFlag: ${this.menuAboutFlag},
      // menuAllStoriesFlag: ${this.menuAllStoriesFlag},
      // menuOverlayFlag: ${this.menuOverlayFlag}`)
    })
  }

  // ---> All Stories Handler

  menuAllStoriesHandler() {
    this.btnAllStories.addEventListener('click', () => {
      if (this.menuOverlayFlag) {
        this.menuOpen('allStories')
        this.menuOverlayFlag = false
        this.menuAllStoriesFlag = false
      } else {
        if (this.menuAboutFlag) {
          this.menuOverlayFlag = true
          this.menuClose()
          this.menuAllStoriesFlag = true
          this.menuAboutFlag = true
        } else {
          this.menuChange('allStories')
          this.menuAllStoriesFlag = false
          this.menuAboutFlag = true
        }
      }

      // console.log(`menuAboutFlag: ${this.menuAboutFlag},
      // menuAllStoriesFlag: ${this.menuAllStoriesFlag},
      // menuOverlayFlag: ${this.menuOverlayFlag}`)
    })
  }

  // ---> Close Button Handler

  closeButtonHandler() {
    this.btnClose.addEventListener('click', () => {
      this.menuOverlayFlag = true
      this.menuClose()
      this.menuAllStoriesFlag = true
      this.menuAboutFlag = true
    })
  }

  // FUNCTIONS

  menuOpen(state) {
    if (state == 'about') {
      this.openAnimation('#333230')
      this.changeUI('#fff')
    } else if (state == 'allStories') {
      this.openAnimation('#fff')
      this.changeUI('#333230')
    }
  }

  menuClose() {
    this.closeAnimation()
    this.changeUI('#fff')
    this.allStoriesRevealOut()
  }

  menuChange(state) {
    if (state == 'about') {
      this.changeAnimation('#333230')
      this.changeUI('#fff')
      this.allStoriesRevealOut()
    } else if (state == 'allStories') {
      this.changeAnimation('#fff')
      this.changeUI('#333230')
      this.allStoriesRevealIn()
    }
  }

  openAnimation(backgroundColor) {
    gsap.to(this.menuOverlay, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      onStart: () => {
        this.uiIntro.style.zIndex = '98'
        this.uiRead.style.zIndex = '98'
        this.menuOverlay.style.display = 'block'
        this.menuOverlay.style.backgroundColor = backgroundColor
      },
    })

    gsap.to(this.btnClose, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'power3.inOut',
      onStart: () => {
        this.btnClose.style.display = 'block'
      },
      onComplete: () => {
        this.btnClose.style.transition = '1s ease-in-out'
      },
    })

    gsap.to(this.uiSidebar, {
      autoAlpha: 0,
      duration: 1.5,
      ease: 'power3.inOut',
    })

    this.allStoriesRevealIn()
  }

  closeAnimation() {
    gsap.to(this.menuOverlay, {
      autoAlpha: 0,
      duration: 1.5,
      ease: 'power3.inOut',
      onComplete: () => {
        this.uiIntro.style.zIndex = '9999'
        this.uiRead.style.zIndex = '9999'
        this.menuOverlay.style.display = 'none'
      },
    })

    gsap.to(this.btnClose, {
      autoAlpha: 0,
      duration: 1.5,
      ease: 'power3.inOut',
      onStart: () => {
        this.btnClose.style.transition = 'inherit'
      },
      onComplete: () => {
        this.btnClose.style.display = 'none'
      },
    })

    gsap.to(this.uiSidebar, {
      autoAlpha: 1,
      duration: 1.5,
      ease: 'power3.inOut',
    })
  }

  changeAnimation(backgroundColor) {
    gsap.to(this.menuOverlay, {
      backgroundColor: backgroundColor,
      duration: 1.5,
      ease: 'power3.inOut',
    })
  }

  changeUI(color) {
    gsap.to('[data-reveal="ui"]', {
      color: color,
      duration: 1,
      ease: 'power3.inOut',
    })

    gsap.to('.menu--close__line', {
      backgroundColor: color,
      duration: 1,
      ease: 'power3.inOut',
    })
  }

  allStoriesRevealIn() {
    gsap.fromTo(
      '.allstories__item__number',
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 0.5,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.inOut',
        stagger: 0.1,
        onStart: () => {
          this.allStories.style.display = 'flex'
          document.querySelectorAll('.allstories__item').forEach((item) => {
            item.style.transition = '0.25s ease-in-out'
          })
        },
      }
    )

    gsap.fromTo(
      '.allstories__item__title',
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.inOut',
        stagger: 0.1,
      }
    )

    gsap.fromTo(
      '.allstories__item__hr',
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        transformOrigin: 'left',
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.inOut',
        stagger: 0.1,
      }
    )
  }

  allStoriesRevealOut() {
    gsap.to(this.allStories, {
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        this.allStories.style.display = 'none'
        this.allStories.style.opacity = 1
        this.allStories.style.visibility = 'visible'
        document.querySelectorAll('.allstories__item').forEach((item) => {
          item.style.transition = 'inherit'
        })
      },
    })
  }
}
