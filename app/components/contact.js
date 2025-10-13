import Component from '@ember/component';
import { gsap } from 'gsap';
import Utils from '../utils/util';

export default class ContactComponent extends Component {
  didInsertElement() {
    super.didInsertElement();
    const scrollTriggerConfig = {
      trigger: '#contact-section',
      start: 'top top+=20%',
      toggleActions: 'play none play reverse',
    };

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    tl.fromTo(
      'body',
      { backgroundColor: '#252422ff' },
      {
        backgroundColor: '#f2f2f2',
      },
    ).fromTo(
      '#contact-section .text-reveal p',
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power4.out',
        stagger: { each: 0.07, from: 'start' },
      },
    );

    const $ = new Utils();
    const links = $._qsa('#contact-section .hover-text');
    console.log(links);
    links.forEach((link) => {
      const topText = link.querySelector('#contact-section .hover-text .top');
      const bottomText = link.querySelector(
        '#contact-section .hover-text .bottom',
      );

      link.addEventListener('mouseenter', () => {
        gsap.to(topText, { y: '-120%', duration: 0.4, ease: 'power2.out' });
        gsap.to(bottomText, { y: '-120%', duration: 0.4, ease: 'power2.out' });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(topText, { y: '0%', duration: 0.4, ease: 'power2.in' });
        gsap.to(bottomText, { y: '0%', duration: 0.4, ease: 'power2.in' });
      });
    });
  }
}
