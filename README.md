# SOLE. — Premium Sneaker Thrift Store 👟

Welcome to the official repository for **SOLE.** — a premium, high-end thrift sneaker store based in Karachi, Pakistan. 

SOLE was built on a simple belief: *Thrift is not a compromise. It's a choice.* We provide access to rare, authentic, and professionally restored footwear without the exorbitant retail prices, all while prioritizing sustainability and community.

---

## 🌟 The SOLE Philosophy

Our mission goes beyond just selling shoes. We are changing the narrative around thrifted items in the sneakerhead community through three core pillars:

1. **🌱 SUSTAINABLE**: Every sole saved is one less in a landfill. Thrift is the most eco-conscious choice in modern sneaker culture.
2. **💎 AUTHENTIC**: Every pair is verified in-house. Every story is real. We don't sell fakes — ever.
3. **🤝 COMMUNITY**: Born in Karachi, built for Karachi. We believe access to rare kicks shouldn't be limited by geography or retail price tags.

## ✨ Technical Highlights

This frontend application is built to deliver a premium, buttery-smooth user experience that matches the quality of the products we sell. 

### Modern Stack
- **React 18 & Vite**: Lightning-fast hot module replacement and optimized production builds.
- **GSAP (GreenSock)**: Complex, high-performance scroll-linked animations (e.g., the 300vh Hero scroll sequence).
- **Framer Motion**: Smooth component-level transitions, interactive carousels, and page routing animations.
- **Zustand**: Lightweight and fast global state management for the Shopping Cart and Favorites.
- **Vanilla CSS (Glassmorphism)**: Custom, variable-driven CSS implementing a modern, light-themed glassmorphism aesthetic.

### Innovative Features
- **Interactive 3D Product Drops**: Integration with the Sketchfab iframe API, allowing users to interact with high-fidelity 3D models of select sneakers directly in the shop.
- **Dynamic Scroll Animations**: A highly customized Hero section where elements parallax, scale, and move seamlessly based on the user's scroll position.
- **Fluid Page Transitions**: Seamless navigation between pages without jarring reloads.

---

## 🚀 Local Development Setup

To get SOLE running on your local machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sole.git
   cd sole
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open your browser and navigate to `http://localhost:5173`

### Building for Production

To build the application for production deployment:
```bash
npm run build
```
The optimized static files will be generated in the `dist` directory.

---

## 🎨 Design System

SOLE uses a highly customized, high-contrast light theme. 
- **Primary Colors**: White (`#FFFFFF`), Deep Red (`#CC0000`), and Void Black (`#050505`).
- **Typography**: 
  - `Display`: *Impact* or similar thick geometric sans-serif for striking, bold headers.
  - `Body`: Clean, legible sans-serif for comfortable reading.
  - `Mono`: Used for technical details, sizes, and micro-copy.

---

*“Every shoe has a story — we want to help that story find its next chapter.”*
