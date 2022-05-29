import gsap from 'gsap'

export default class UI {
  constructor() {
    this.introAnimations()
    this.reveal()
  }

  introAnimations() {
    gsap.fromTo(
      '.ui__intro__title span',
      {
        autoAlpha: 0.25,
        y: 'random(5%, -5%)',
      },
      {
        delay: 0.5,
        duration: 2,
        ease: 'power3.out',
        autoAlpha: 1,
        y: '0%',
        stagger: {
          from: 'center',
          amount: 0.5,
          axis: 'x',
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

    gsap.to('.ui__top [data-reveal="ui"]', {
      autoAlpha: 0,
      stagger: 0.5,
      duration: 1,
      ease: 'power3.out',
    })
  }

  recolorIcons() {
    gsap.to('[data-reveal="ui"]', {
      color: '#fff',
      delay: 0.5,
      duration: 1.5,
    })
  }
}
