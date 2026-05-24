# Sachin Yadav - Portfolio Website

A modern, interactive portfolio website built with Next.js, React Three Fiber, and Tailwind CSS. This portfolio showcases my work as a Full-Stack Developer and Machine Learning Engineer with a focus on clean architecture, interactive experiences, and high-performance web applications.

## Features

- **Interactive 3D Background**: Dynamic particle field using React Three Fiber and Three.js
- **Custom Cursor**: Interactive trailing cursor with magnetic effects
- **Red Grid System**: Mouse-following light effect that reveals grid on hover (home and timeline sections)
- **Vertical Timeline**: CS Journey timeline with alternating content layout
- **Project Showcase**: Interactive project cards with detailed architecture diagrams
- **Social Links Strip**: Continuously scrolling social media links
- **Responsive Design**: Optimized for all screen sizes
- **Dark Theme**: Professional dark theme with red accent colors
- **Smooth Animations**: Framer Motion powered transitions and interactions

## Tech Stack

### Frontend Framework
- Next.js 16.2.6 (App Router)
- React 18
- JavaScript (ES6+)

### Styling
- Tailwind CSS
- Custom CSS variables
- CSS Grid and Flexbox

### 3D Graphics
- React Three Fiber
- Three.js
- WebGL

### Animation
- Framer Motion
- CSS animations

### Icons
- Lucide React

### Deployment
- Vercel (recommended)
- AWS Amplify

## Project Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send-email/
│   │   │       └── route.js          # Email API endpoint
│   │   ├── globals.css               # Global styles and CSS variables
│   │   ├── layout.js                 # Root layout component
│   │   └── page.js                  # Main page component
│   └── components/
│       ├── About.js                  # About section
│       ├── AcademicJourney.js        # CS Journey timeline
│       ├── Contact.js                # Contact section
│       ├── CreativeHero.js           # Hero section with 3D effects
│       ├── CreativeLab.js            # WebGL sandbox playground
│       ├── CustomCursor.js           # Custom cursor component
│       ├── GlobalCanvas.js           # 3D particle background
│       ├── Navbar.js                 # Navigation bar
│       ├── NetworkMap.js             # Interactive network visualization
│       ├── Projects.js               # Projects showcase
│       └── SocialStrip.js            # Scrolling social links
├── package.json
├── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SachinYadav2446/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Any platform supporting Next.js

## Key Components

### Hero Section
- Interactive 3D name with parallax effects
- Console dashboard with typewriter animation
- System status indicators
- Skill dial gauges with scroll animations

### Projects Section
- Interactive project cards with tilt effects
- Architecture diagrams for each project
- GitHub and live preview links
- Detailed project descriptions and tech stacks

### CS Journey Timeline
- Vertical timeline with alternating content
- Color-coded phases (red, teal, yellow, blue)
- Benchmark points with pulse animations
- 10 phases from fundamentals to current work

### Contact Section
- Direct email integration
- Quick links to social profiles
- Location information
- Clean, modern design

## Customization

### Colors
Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --color-red: #e63946;
  --color-cream: #fffdf9;
  /* ... other variables */
}
```

### Content
- Update personal information in `src/components/Contact.js`
- Modify projects in `src/components/Projects.js`
- Edit timeline phases in `src/components/AcademicJourney.js`

## Performance

- Optimized images and assets
- Code splitting with dynamic imports
- Lazy loading for 3D components
- CSS-in-JS for minimal bundle size
- Optimized animations with hardware acceleration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact

- Email: yadavsachin2446@gmail.com
- GitHub: https://github.com/SachinYadav2446
- LinkedIn: https://www.linkedin.com/in/sachin-yadav-54646a322/
- LeetCode: https://leetcode.com/u/SY_45/

## License

This project is open source and available under the MIT License.
