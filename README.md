# studiodesign

A premium, contemporary and minimalist studio website built with React, Vite, and Tailwind CSS.

## Features
- Complete multi-page React application (Home, About, Services, Projects, Contact)
- Advanced minimal editorial aesthetic (high contrast, strict typography hierarchy)
- Fully responsive layouts built mobile-first
- Clean, maintainable component architecture 
- Configured specifically for instant Vercel deployment with client-side routing

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Vercel Deployment Instructions

This project is prepared and optimized for Vercel deployment out of the box. The repository contains a `vercel.json` to handle React Router client-side routing.

1. Push this repository to GitHub.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** > **Project**.
3. Import your GitHub repository.
4. The Build Settings should be automatically detected:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy**. Vercel will handle the rest.
