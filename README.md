# Resume Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)](https://vite.dev)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://shaked-resume-builder.vercel.app)

A modern, browser-based resume builder that lets you create, customize, and export professional resumes as PDF - no account or backend required.

**Try it live: [shaked-resume-builder.vercel.app](https://shaked-resume-builder.vercel.app)**

---

## Features

- **6 resume templates**: Pure Minimal, Sidebar Professional, Tech Clean, Elegant Two Column, Soft Gray, and Compact Dense
- **Live preview**: See your resume update in real time as you type
- **PDF export**: Download a high-quality, print-ready PDF named after you
- **Bilingual support**: Full English and Hebrew (RTL) interface
- **Dark and light mode**: Respects system preference, persists to storage
- **Auto-save**: All data is saved to `localStorage` automatically (no data loss on refresh)
- **Responsive layout**: Works on desktop, tablet, and mobile
- **Zero backend**: Everything runs entirely in the browser

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| PDF Export | html2pdf.js |
| Icons | Lucide React |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- npm (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/ddex3/Resume-Builder.git
cd Resume-Builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production-ready output is placed in the `dist/` folder. Serve it with any static file host (GitHub Pages, Vercel, Netlify, etc.).

To preview the production build locally:

```bash
npm run preview
```

---

## Usage

1. **Fill in your details** using the form on the left (Personal Info, Summary, Skills, Experience, Projects, Certifications, Leadership).
2. **Pick a template** from the template selector at the top.
3. **Preview your resume** on the right panel in real time.
4. **Adjust zoom** using the zoom controls to see how the page scales.
5. **Export to PDF** by clicking the Download button in the header.
6. **Switch language** between English and Hebrew using the language toggle.
7. **Toggle theme** between light and dark mode with the theme switcher.

All data is saved automatically to your browser's local storage. To start fresh, use the **Reset** button and confirm the dialog.

---

## Project Structure

```
src/
├── components/
│   ├── form/          # Input forms for each resume section
│   ├── preview/       # Resume preview wrapper
│   ├── templates/     # Six resume template components
│   └── ui/            # Reusable UI primitives
├── contexts/          # Theme and language context providers
├── hooks/             # useResumeState - reducer-based state + localStorage
├── utils/             # PDF export logic and default data
├── i18n.ts            # English and Hebrew translations
└── types.ts           # Shared TypeScript interfaces
```

---

## Support

If you run into a bug or want to request a feature, please [open an issue](https://github.com/ddex3/Resume-Builder/issues).

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

Built with ❤️ by **[@ddex3](https://github.com/ddex3)**
