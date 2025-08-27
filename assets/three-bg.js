const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create random particles
const particleCount = 800;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 50;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animate
function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.001;
  particles.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
