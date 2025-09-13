const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');

window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(p => p.mesh));

  if (intersects.length > 0) {
    const intersected = intersects[0].object;
    const planet = planets.find(p => p.mesh === intersected);

    tooltip.style.display = 'block';
    tooltip.innerHTML = planet.name;
    tooltip.style.left = (event.clientX + 10) + 'px';
    tooltip.style.top = (event.clientY + 10) + 'px';
  } else {
    tooltip.style.display = 'none';
  }
}

const loader = new THREE.TextureLoader();
loader.load(
  // 'https://images.unsplash.com/photo-1520034475321-cbe63696469a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0',
  'images/stars.jpg',
  texture => { scene.background = texture; }
);

const sunGeometry = new THREE.SphereGeometry(5, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFDB813 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const light = new THREE.PointLight(0xffffff, 2, 100);
scene.add(light);

const planetData = [
  { name: 'Mercury', size: 0.6, color: 0xaaaaaa, dist: 5.75,  speed: 0.04 },
  { name: 'Venus',   size: 1.0, color: 0xffcc00, dist: 8.05,  speed: 0.015 },
  { name: 'Earth',   size: 1.2, color: 0x0000ff, dist: 10.35, speed: 0.01 },
  { name: 'Mars',    size: 1.0, color: 0xff3300, dist: 12.65, speed: 0.008 },
  { name: 'Jupiter', size: 2.4, color: 0xff9966, dist: 17.25, speed: 0.005 },
  { name: 'Saturn',  size: 2.0, color: 0xffff99, dist: 21.85, speed: 0.003 },
  { name: 'Uranus',  size: 1.8, color: 0x66ffff, dist: 26.45, speed: 0.002 },
  { name: 'Neptune', size: 1.8, color: 0x3366ff, dist: 31.05, speed: 0.001 }
];

const planets = [];
const angles = {};
const orbits = [];

planetData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: data.color });
  const planet = new THREE.Mesh(geometry, material);
  planet.speed = data.speed;
  scene.add(planet);

  planets.push({ ...data, mesh: planet });
  angles[data.name] = Math.random() * Math.PI * 2;

  // Speed control sliders
  const controls = document.getElementById('controls');
  const label = document.createElement('label');
  label.textContent = `${data.name} Speed`;
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '0.05';
  slider.step = '0.001';
  slider.value = data.speed;
  slider.oninput = () => {
    data.speed = parseFloat(slider.value);
    planet.speed = parseFloat(slider.value);
  };
  controls.appendChild(label);
  controls.appendChild(slider);
  controls.appendChild(document.createElement('br'));

  // Orbits
  const orbitGeometry = new THREE.RingGeometry(data.dist - 0.05, data.dist + 0.05, 128);
  const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  scene.add(orbit);
  orbits.push(orbit);
});

camera.position.z = 42;
camera.position.y = 12;
camera.lookAt(0, 0, 0);

// Pause/Resume toggle
let paused = false;
const pauseResumeBtn = document.getElementById('pauseResumeBtn');
pauseResumeBtn.addEventListener('click', () => {
  paused = !paused;
  pauseResumeBtn.innerText = paused ? "Resume" : "Pause";
});

// Orbit show/hide toggle
let orbitsVisible = true;
const showHideOrbitBtn = document.getElementById('ShowHideOrbitBtn');
showHideOrbitBtn.addEventListener('click', () => {
  orbitsVisible = !orbitsVisible;
  orbits.forEach(o => o.visible = orbitsVisible);
  showHideOrbitBtn.innerText = orbitsVisible ? "Hide Orbits" : "Show Orbits";
});

function animate() {
  requestAnimationFrame(animate);
  if (!paused) {
    planets.forEach(planet => {
      angles[planet.name] += planet.mesh.speed;
      const x = Math.cos(angles[planet.name]) * planet.dist;
      const z = Math.sin(angles[planet.name]) * planet.dist;
      planet.mesh.position.set(x, 0, z);
      planet.mesh.rotation.y += 0.03;
    });
  }
  renderer.render(scene, camera);
}

animate();
