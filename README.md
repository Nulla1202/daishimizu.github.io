# Dai Shimizu - Portfolio Website

Professional portfolio website for Dai Shimizu, Neuroscience Researcher & Engineer.

## 🚀 Features

- **Modern Design**: Interactive neural network visualization and brain wave animations
- **Responsive Layout**: Optimized for all devices (desktop, tablet, mobile)
- **TypeScript**: Type-safe development with full TypeScript support
- **Modular Architecture**: Organized file structure for easy maintenance
- **Dynamic Content**: JSON-based data management for easy updates
- **Smooth Animations**: CSS animations and scroll-based reveals

## 📁 Project Structure

```
neuroisallineed/
├── src/
│   ├── scripts/
│   │   └── main.ts          # Main TypeScript logic
│   ├── styles/
│   │   ├── main.css         # Main styles
│   │   └── animations.css   # Animation effects
│   ├── data/
│   │   └── portfolio.json   # Portfolio data (experience, skills, awards)
│   └── components/          # Future component files
├── assets/
│   ├── images/              # Image assets
│   └── icons/               # Icon files
├── dist/                    # Build output (generated)
├── index.html               # Main HTML file
├── package.json             # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite bundler configuration
└── README.md               # This file
```

## 🛠️ Setup & Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

The optimized files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 📝 Updating Content

All content is managed through the `src/data/portfolio.json` file. Update this file to modify:

- Experience and research history
- Skills and expertise
- Awards and certifications
- Education background

## 🎨 Customization

### Colors
Edit CSS variables in `src/styles/main.css`:
```css
:root {
  --primary-color: #64c8ff;
  --secondary-color: #4a90e2;
  --dark-bg: #0a0e27;
  /* ... */
}
```

### Animations
Customize animations in `src/styles/animations.css`

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: < 480px

## 🌐 Deployment

The site can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply upload the contents of the `dist/` folder after building.

## 📄 License

© 2025 Dai Shimizu. All rights reserved.

## 📧 Contact

- Email: daistar1202@gmail.com
- Phone: +81 (80) 1442 2494
- Affiliation: 大阪大学医学系研究科神経情報学教室
