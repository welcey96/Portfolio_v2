import Component from '@ember/component';
import { gsap } from 'gsap/all';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Utils from '../utils/util';

export default class ProfileComponent extends Component {
  didInsertElement() {
    super.didInsertElement();

    const scrollTriggerConfig = {
      trigger: '#profile-section',
      start: 'top top+=20%',
      end: 'bottom bottom-=10%',
      scrub: true,
      toggleActions: 'play reverse play reverse',
      //    markers: true
    };

    const tl = gsap.timeline({
      scrollTrigger: scrollTriggerConfig,
    });

    tl.to('body', { backgroundColor: '#252422ff' })
      .to('.text-reveal', { color: '#f9cdcdff' }, 0)
      .fromTo(
        '#profile-section .text-reveal',
        { yPercent: '200', rotateZ: 10, opacity: 0 },
        {
          yPercent: '0',
          rotateZ: 0,
          opacity: 1,
          duration: 1,
          ease: 'power4',
        },
        0,
      );

    const isMobile = document.documentElement.clientWidth <= 768; // adjust breakpoint as needed
    if (!isMobile) {
      const $ = new Utils();
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      const sceneContainer = $._id('scene-container');

      renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
      sceneContainer.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(
        100,
        sceneContainer.clientWidth / sceneContainer.clientHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, 5);

      window.addEventListener('resize', onWindowResize, false);
      function onWindowResize() {
        const width = sceneContainer.clientWidth;
        const height = sceneContainer.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      }

      const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
      scene.add(ambientLight);
      scene.add(directionalLight);

      let model;
      const loader = new GLTFLoader();
      loader.load(
        '/assets/models/robot/scene.gltf',
        function (gltf) {
          model = gltf.scene;
          model.position.set(0, -3, 0);
          model.traverse((child) => {
            if (child.isMesh) {
              child.material.color.set(0xffffff);
              child.material.needsUpdate = true;
            }
          });

          scene.add(model);
        },
        undefined,
        function (error) {
          console.error(error);
        },
      );

      function animate() {
        requestAnimationFrame(animate);
        if (model) {
          model.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
      }

      animate();
    }
  }
}
