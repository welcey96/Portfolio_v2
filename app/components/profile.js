import Component from '@ember/component';
import { gsap } from "gsap/all";

export default class ProfileComponent extends Component{
    didInsertElement() {
        super.didInsertElement();
        const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '#profile-section',
              start: 'top top+=20%',
              end: 'bottom bottom-=10%',
              toggleActions: 'play reverse play reverse',
              markers: true
            }
          })

          tl.to('body', { backgroundColor: '#131313' })
          .to('.text-reveal', { color: 'white' }, 0)
    }
}