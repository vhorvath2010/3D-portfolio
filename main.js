import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000);

// Attach canvas to bg HTML canvas element
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Setup renderer to window sizes
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
let baseZ = 1;
cam.position.setZ(baseZ);

// Overwrite OrbitControls zoom
const controls = new OrbitControls(cam, renderer.domElement);
controls.maxDistance = 50;
controls.zoomSpeed = 1.5;

document.body.onscroll = () => {
  let toZoom = document.body.getBoundingClientRect().top - 25;
  cam.position.setZ(baseZ * Math.abs(toZoom) / 10);
}

const ambientLight = new THREE.AmbientLight(0xC6DDF0)
scene.add(ambientLight);

function addStar() {
  const sphere = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(sphere, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z)
  scene.add(star);
}

for (let i = 0; i < 200; ++i) {
  addStar();
}

const spaceBg = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceBg;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, cam);

  controls.update();
}
animate();