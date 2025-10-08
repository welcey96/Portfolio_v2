import Component from '@ember/component';
import { gsap } from 'gsap';
import Utils from '../utils/util';

export default class Projects2Component extends Component {
  didInsertElement() {
    super.didInsertElement();
    const isMobile = document.documentElement.clientWidth <= 768;
    const $ = new Utils();
    const images = gsap.utils.toArray('.panel2');

    if (!isMobile) {
      const wrapper = $._qs('.horizontal-wrapper2');

      gsap.from('body', {
        backgroundColor: '#252422ff',
      });
      gsap.to('body', {
        backgroundColor: '#fff',
        scrollTrigger: {
          trigger: '#projects-section2',
          toggleActions: 'play none play reverse',
        },
      });
      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '#projects-section2',
          start: 'top top',
          end: () => '+=' + (wrapper.scrollWidth - window.innerWidth),
          scrub: true,
          pin: true,
        },
      });
    }
    gsap.from('#projects-section2 .text-reveal', {
      scrollTrigger: {
        trigger: '#projects-section2',
        start: 'top top',
        toggleActions: 'play none play reverse',
      },
      yPercent: 200,
      rotateZ: 10,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.3,
    });
    const bg2 = [
      'rgb(20, 45, 70)',
      'linear-gradient(90deg, rgb(255, 166, 46) 0%, rgb(234, 77, 44) 100%)',
      'linear-gradient(90deg, rgb(0, 0, 102) 0%, rgb(102, 153, 255) 100%)',
      'linear-gradient(90deg, rgb(241, 70, 88) 0%, rgb(220, 37, 55) 100%)',
    ];

    images.forEach((t, i) => {
      const index = i % bg2.length;
      t.style.background = bg2[index];
    });
  }
}
