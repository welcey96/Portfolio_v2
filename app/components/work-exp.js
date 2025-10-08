import Component from '@ember/component';
import { gsap } from 'gsap';

export default class WorkExpComponent extends Component {
  didInsertElement() {
    super.didInsertElement();
    gsap.to('body', {
      backgroundColor: '#252422ff',
      scrollTrigger: {
        trigger: '#exp-section',
        toggleActions: 'play none play reverse',
      },
    });
  }
}
