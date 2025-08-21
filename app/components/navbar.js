import Lenis from '@studio-freight/lenis';
import Component from '@ember/component';
import Utils from '../utils/util';

export default class NavbarComponent extends Component {
  didInsertElement() {
    super.didInsertElement(...arguments);
    const $ = new Utils();
    const lenis = new Lenis();
    const navLinks = $._qsa('#navbar .menu a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetId = $._ga(link, 'href');
        lenis.scrollTo(targetId);
      });
    });
  }
}
