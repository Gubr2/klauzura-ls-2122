import gsap from 'gsap'

export default class UI {
  constructor() {
    this.storyContainer = document.querySelector('.ui__story--container')
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
          autoAlpha: 0,
          y: 'random(2%, -2%)',
        },
        {
          duration: 3,
          ease: 'power3.out',
          autoAlpha: 1,
          y: '0%',
          stagger: {
            amount: 0.5,
            axis: 'x',
          },
        }
      )

      this.tl.to('.ui__intro__text--1 span span', {
        autoAlpha: 0,
        ease: 'power3.out',
        duration: 1.5,
        delay: 1,
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
            amount: 0.5,
            axis: 'x',
          },
          onStart: () => {
            gsap.to('.ui__intro__text--icon', {
              autoAlpha: 1,
              duration: 2,
            })
            setTimeout(() => {
              resolve()
              document.addEventListener('mousemove', (e) => {
                gsap.to('.ui__intro__text--3 span span', {
                  autoAlpha: 0,
                  ease: 'power3.out',
                  duration: 1.5,
                  delay: 1,
                })
                gsap.to('.ui__intro__text--icon', {
                  autoAlpha: 0,
                  ease: 'power3.out',
                  duration: 1.5,
                  delay: 1,
                })
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
      },
      {
        delay: 0.25,
        duration: 3,
        ease: 'power3.out',
        autoAlpha: 1,
        stagger: 0.025,
      }
    )

    gsap.fromTo(
      '.ui__story--number',
      {
        autoAlpha: 0,
      },
      {
        duration: 3,
        delay: 0.5,
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
        delay: 0.75,
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
        delay: 1,
        ease: 'power3.out',
        autoAlpha: 1,
        onComplete: () => {
          document.querySelector('.ui__story--btn').style.transition = '1s ease-in-out'
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
}
