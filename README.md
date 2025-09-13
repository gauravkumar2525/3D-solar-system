# 🌞 3D Solar System

3D Solar System is an interactive visualization of the planets in our solar system. Built using **Three.js**, this project allows users to explore planets, view their orbits, and interact with the scene using mouse hover and UI controls. It's perfect for students, educators, and anyone curious about space and astronomy.  

---

## 📸 Screenshots
Here are some screenshots of the 3D Solar System in action:  

**Full Solar System View**  
<img width="1365" height="648" alt="image" src="https://github.com/user-attachments/assets/b7fae3ad-af58-4523-ac3c-9292a07cd58a" />
**Hide Orbit**
<img width="1364" height="648" alt="image" src="https://github.com/user-attachments/assets/ab88eeb6-0e3d-44cd-92f3-44e4c817cbaf" />
**Change Speed**
<img width="1359" height="648" alt="image" src="https://github.com/user-attachments/assets/8a152193-c953-4b57-85a6-edb438c5661f" />
**Hover Over Planet (Uranus)**
<img width="1355" height="642" alt="image" src="https://github.com/user-attachments/assets/d78e7ea0-4e36-4f52-b23c-0d8dab2d785c" />
---

## ✨ Features

- 🌐 Interactive 3D solar system with realistic planetary sizes and distances (scaled).  
- 🪐 Hover over planets to see their names with a tooltip.  
- ⚡ Adjust individual planet speeds using sliders.  
- 🔄 Pause and resume planetary motion.  
- 🛰 Toggle the visibility of planet orbits.  
- 🌟 Realistic starfield background.  
- 💻 Works in modern browsers using WebGL (Three.js).  

---

## 🗂 Folder Structure

```

3D-Solar-System/
├── index.html           # Main HTML file
├── style.css            # CSS for layout and UI
├── main.js              # Three.js solar system code
├── images/
    ├── stars.jpg        # Background star texture
````
---

## 🎯 How to Use

1. **Clone the repository**
```bash
git clone https://github.com/gauravkumar2525/3D-solar-system.git
cd 3d-solar-system
````

2. **Open `index.html` in a browser**
   Modern browsers like Chrome, Brave or Edge are recommended.

3. **Interact with the simulation**

   * Hover over planets to see their names.
   * Use sliders to adjust planet speeds.
   * Click **Pause/Resume** to stop or continue planet rotation.
   * Click **Show/Hide Orbits** to toggle orbit visibility.

---

## 🖥 How It Works

1. **Scene Setup**

     A `THREE.Scene` is created with a `PerspectiveCamera` and `WebGLRenderer`.

3. **Planets & Orbits**

   * Planets are added using `SphereGeometry` and `MeshStandardMaterial`.
   * Orbits are visualized with `RingGeometry`.

4. **Animation**

   * Each planet moves along its orbit based on an angle updated per frame.
   * Planet rotation and orbital motion are controlled with sliders.

5. **Interactivity**

   * Mouse hover detection uses `Raycaster` to show tooltips.
   * UI buttons control pause/resume and orbit visibility.

---

## ⚡ Technologies Used

* [Three.js](https://threejs.org/) - 3D rendering engine
* HTML5 / CSS3 / JavaScript - Core web technologies
* WebGL - Browser-based 3D graphics

---

## 📜 License

This project is open-source under the **MIT License** — feel free to use, modify, and share.

---

## 🌌 Future Enhancements

* Add realistic planetary textures (Earth, Mars, Jupiter, etc.)
* Include moons and satellites for planets
* Add zoom/pan controls for better exploration
* Show planet information on click
