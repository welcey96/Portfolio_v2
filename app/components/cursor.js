import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import Utils from '../utils/util';

export default class CursorComponent extends Component {
  cursorModifier = modifier((element) => {
    const $ = new Utils();

    const cursor = $._qs('.custom-cursor');
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    // Make cursor bigger + show text when hovering on .panel
    const handleMouseEnter = () => {
      cursor.classList.add('cursor-panel');
      cursor.textContent = 'View on GitHub';
    };

    // Restore normal cursor when leaving .panel
    const handleMouseLeave = () => {
      cursor.classList.remove('cursor-panel');
      cursor.textContent = '';
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Attach listeners to all project panels
    const panels = $._qsa('.panel-img');
    panels.forEach((panel) => {
      panel.addEventListener('mouseenter', handleMouseEnter);
      panel.addEventListener('mouseleave', handleMouseLeave);
    });

    const noCursor = $._qsa('.no-cursor');
    noCursor.forEach((nc) => {
      nc.addEventListener('mouseenter', () => cursor.classList.add('hide'));
      nc.addEventListener('mouseleave', () => cursor.classList.remove('hide'));
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      panels.forEach((panel) => {
        panel.removeEventListener('mouseenter', handleMouseEnter);
        panel.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  });
}
