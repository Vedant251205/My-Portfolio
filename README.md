# Vedant Mishra | Professional Developer Portfolio

A clean, minimalistic, and highly professional personal portfolio website built with Next.js 15, Tailwind CSS v4, and GSAP. 

Designed to highlight engineering experience, technical skills, and featured projects with a focus on readability and performance. Features a fully integrated dual-theme (Dark/Light) system and subtle scroll-reveal animations.

## ✨ Key Features

- **Minimalist Professional Design**: Clean layout focusing on content and usability.
- **Dual-Theme Support**: Built-in dark and light modes with seamless toggling and system-preference detection.
- **GSAP Animations**: Smooth, performant scroll-reveal animations using GSAP and ScrollTrigger.
- **Data-Driven Architecture**: All personal information, skills, and projects are isolated in clean JSON files for easy updating.
- **Fully Responsive**: Optimized for perfect viewing across all device sizes.
- **SEO Optimized**: Next.js App Router providing excellent performance and SEO out of the box.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) & ScrollTrigger
- **Typography**: Inter & Plus Jakarta Sans (via Next/Font)
- **Icons**: Font Awesome 6
- **Deployment**: Vercel Ready

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

The site is built with a data-driven approach. You don't need to dig through complex React components to update your portfolio. Simply modify the JSON files located in the `src/data/` directory:

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
