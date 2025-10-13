import Component from '@ember/component';
import { gsap } from 'gsap';
import Utils from '../utils/util';

export default class Projects2Component extends Component {
  didInsertElement() {
    super.didInsertElement();

    const isMobile = document.documentElement.clientWidth <= 1024;
    const $ = new Utils();
    const images = gsap.utils.toArray('.panel2');

    const scrollTriggerConfig = {
      trigger: '#projects-section2',
      start: 'top top+=5%',
      end: 'bottom bottom-=10%',
      toggleActions: 'play none play reverse',
      // markers: true,
    };

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    tl.to('body', {
      backgroundColor: '#f2f2f2',
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

    if (!isMobile) {
      const wrapper = $._qs('.horizontal-wrapper2');
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
  }
}
