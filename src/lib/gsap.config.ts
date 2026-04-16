import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  start: 'top 85%',
})

export { gsap, ScrollTrigger }
