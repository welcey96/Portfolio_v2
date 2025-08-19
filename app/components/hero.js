import Component from '@ember/component';
import { gsap } from "gsap/all";

export default class HeroComponent extends Component {
    didInsertElement() {
        super.didInsertElement();
        gsap.fromTo(
            '#hero-section .text-reveal',
            { yPercent: "200", rotateZ: 10, opacity: 0 },
            { 
                yPercent: "0", rotateZ: 0, opacity: 1, duration: 1, ease: "power4",
                stagger: 0.3
            }
          );
    }
}