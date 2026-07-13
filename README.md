# Vedant Mishra | Premium 3D Portfolio

A highly immersive, premium personal portfolio website built with Next.js 15, React Three Fiber, Tailwind CSS v4, and Framer Motion. 

Designed with a **High-End Creative Agency** aesthetic, this portfolio blends elegant serif typography with a stunning, dynamically lit 3D centerpiece. It features a fully integrated dual-theme (Dark/Light) system, smooth scroll-reveal animations, and data-driven architecture.

## ✨ Key Features

- **Premium 3D Centerpiece**: A custom glossy Torus built with `@react-three/fiber` featuring dynamic studio lighting and iridescent reflections.
- **Elegant Typography**: Utilizing *Playfair Display* for a sophisticated, high-contrast visual hierarchy alongside modern monospaced fonts.
- **Dynamic Dual-Theme**: Built-in dark and light modes with custom CSS variables that seamlessly adapt background gradients, text-glow, and drop-shadows to ensure perfect 3D contrast.
- **Data-Driven Architecture**: All personal information, skills, and projects are isolated in clean JSON files for easy updating.
- **Smooth Animations**: High-performance mount and scroll-reveal animations powered by Framer Motion and GSAP.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & Drei
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Typography**: Playfair Display, Orbitron, & Syncopate (via Next/Font)
- **Icons**: Font Awesome 6

## 🚀 Getting Started Locally

First, clone the repository and install dependencies:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 How to Update Your Content

The site is built with a data-driven approach. You don't need to dig through complex React components to update your portfolio text. Simply modify the JSON files located in the `src/data/` directory:

- **`src/data/personal.json`**: Update your name, contact info, bio, education, and experience timeline.
- **`src/data/projects.json`**: Add or remove featured projects, URLs, and tech stacks.
- **`src/data/skills.json`**: Update your technical arsenal, proficiencies, and Font Awesome icons.

## 🌐 Deployment

The easiest way to deploy this Next.js application is to use the [Vercel Platform](https://vercel.com). 

1. Push your code to a GitHub repository.
2. Go to [Vercel.com](https://vercel.com), sign in, and click **Add New... > Project**.
3. Import your GitHub repository.
4. Leave all default build settings as they are (Vercel automatically detects Next.js).
5. Click **Deploy**.

Within minutes, your portfolio will be live with a global CDN and automatic HTTPS!

---
*Designed & Built by Vedant Mishra.*
