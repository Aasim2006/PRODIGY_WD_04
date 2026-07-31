# Premium Personal Portfolio Website - Mohammed Aasim

A premium, production-ready, dark-themed personal portfolio website built for **Mohammed Aasim**, designed to represent a modern software engineer's workspace from 2026. This portfolio showcases expertise bridging Frontend Web Development and Artificial Intelligence & Data Science analytics.

Designed to be recruiter-friendly, fully responsive, and highly interactive using only pure, modern web standards.

---

## 🚀 Technologies Used
* **Markup:** Semantic HTML5 (SEO & Accessibility Optimized)
* **Styling:** CSS3 Custom Design Tokens (No frameworks like Tailwind or Bootstrap)
* **Logic & Animations:** Vanilla JavaScript (ES6+)
* **Typography:** Space Grotesk (Headers) & Poppins (Body Text) via Google Fonts
* **Icons:** Lucide Icons CDN

---

## 🎨 Core Design System & Aesthetics
* **Theme:** Sleek Futuristic Dark Mode (`#0F172A`)
* **Color Palette:**
  * **Primary:** Blue (`#2563EB`)
  * **Secondary:** Purple (`#7C3AED`)
  * **Accent:** Cyan (`#06B6D4`)
  * **Card Elements:** Translucent Glassmorphism (`rgba(255, 255, 255, 0.03)`)
* **Backdrop Effects:** Animated Aurora Gradient Blobs & Interactive Particle Canvas
* **Glow Borders:** Hover-triggered gradient borders with radial mouse-following light highlights
* **3D Dynamics:** Mouse hover 3D tilt effects on featured project cards

---

## 📁 Project Folder Structure
```text
portfolio/
│── index.html          # Semantic layout structures
│── style.css           # Custom variables, media queries, animations, glassmorphism
│── script.js           # Interactive modules (Preloader, Particles, Observer triggers)
│── README.md           # Documentation
│
└── assets/
    ├── profile/
    │      profile.jpg  # Profile Photo
    │      resume.pdf   # Professional PDF Resume
    │
    ├── projects/
    │      coffee-cafe.png
    │      weather-app.png
    │      stopwatch.png
    │      tic-tac-toe.png
    │      ai-study-planner.png
    │      youtube-analytics.png
    │
    └── logos/
           prodigy.png
           elevate.png
```

---

## ✨ Features Implemented

1. **Radial Loader Screen:** Counts percentage progress up to 100% before smoothly introducing page sections.
2. **Interactive Particles Background:** Custom lightweight HTML5 Canvas particle generator that connects dots nearby and repels away from the mouse cursor.
3. **Smooth Typing Carousel:** Typing effect cycling through Mohammed Aasim's core engineering roles.
4. **Sticky Glass Navbar:** High backdrop blur header with active section link tracking (adds glow underline to current section via `IntersectionObserver`).
5. **Responsive Drawer Menu:** Fullscreen sidebar menu for tablet and mobile viewports.
6. **Animated Skill-bars:** Fills to target capacity values dynamically once the skills section scrolls into view.
7. **Stat Count-ups:** Numerically counts up project statistics and internship counts when in focus.
8. **Cursor-Tracking Glow & 3D Tilt:** Projects and details cards react dynamically to coordinates of the user's cursor.
9. **Contact Form Validation:** Rigid client-side checks for formatting (email validator) and completion, featuring visual loading animations and success message displays on submit.

---

## ⚙️ Running the Website Locally

Since the project uses vanilla HTML, CSS, and JavaScript, it runs out-of-the-box on any web browser without needing compilation.

### Option 1: Direct File Launch
Simply double-click the `index.html` file or drag it directly into any modern web browser.

### Option 2: Local HTTP Server (Recommended)
Running a local development server ensures smooth rendering of assets and standard HTTP/HTTPS API hooks.

* **Using Python:**
  Run the command below in your terminal inside the project directory:
  ```bash
  python3 -m http.server 8000
  ```
  Then open [http://localhost:8000](http://localhost:8000) in your web browser.

* **Using Node.js (Live Server):**
  If using VS Code, click the **Go Live** button in the status bar (using the Live Server extension), or run:
  ```bash
  npx live-server
  ```
