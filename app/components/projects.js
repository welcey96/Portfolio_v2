import Component from '@ember/component';
import { gsap } from 'gsap';
import Utils from '../utils/util';

export default class ProjectsComponent extends Component {
  didInsertElement() {
    super.didInsertElement();

    const isMobile = document.documentElement.clientWidth <= 1025;
    const $ = new Utils();

    if (!isMobile) {
      const wrapper = $._qs('.horizontal-wrapper');
      const images = gsap.utils.toArray('.panel');
      const progressBar = $._qs('.scroll-progress-inner');

      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '#projects-section',
          start: 'top top',
          end: () => '+=' + (wrapper.scrollWidth - window.innerWidth),
          scrub: true,
          pin: true,
          //   markers: true,
          onUpdate: (self) => {
            const progress = self.progress * 100; // 0–100%
            gsap.to(progressBar, { width: progress + '%' });
          },
        },
      });

      // tilt images
      function updateTilt() {
        const viewportCenter = window.innerWidth / 2;
        images.forEach((img) => {
          const rect = img.getBoundingClientRect();
          const imgCenter = rect.left + rect.width / 2;
          const distance = imgCenter - viewportCenter;

          const maxTilt = 8.5;
          const tilt = (distance / viewportCenter) * maxTilt;

          img.style.transform = `translate3d(0,0,0) rotate(${tilt}deg) scale(0.95)`;
        });
      }

      window.addEventListener('scroll', updateTilt);
      window.addEventListener('resize', updateTilt);
      updateTilt();

      const img = gsap.utils.toArray('.gif-preview');
      img.forEach((v, i) => {
        let original = v.src;
        let gif = v.dataset.gif;

        v.addEventListener('mouseenter', () => (v.src = gif));
        v.addEventListener('mouseleave', () => (v.src = original));
      });
    }

    gsap.from('#projects-section .text-reveal', {
      scrollTrigger: {
        trigger: '#projects-section',
        start: 'top top+=15%',
        toggleActions: 'play none play reverse',
        // markers: true,
      },
      yPercent: 200,
      rotateZ: 10,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.3,
    });
  }
}
