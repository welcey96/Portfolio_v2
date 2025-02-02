import Controller from '@ember/controller';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from "gsap/all";
import Utils from "../utils/util"

export default class ApplicationController extends Controller {
  constructor() {
    super(...arguments);
    this.initialize();
  }

  initialize() {
    const $ = new Utils();
    const lenis = new Lenis();

    lenis.on('scroll', e => {});

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    gsap.registerPlugin(ScrollTrigger); 
  }
}