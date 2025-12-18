# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"drill" is a React-based web application built with Vite, TypeScript, and Tailwind CSS. The site is configured for deployment to GitHub Pages.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3 with custom design system
- **UI Components**: Radix UI primitives + shadcn/ui patterns
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (automated via GitHub Actions)

## Project Structure

```
web/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components (shadcn/ui)
│   │   └── figma/      # Figma-exported components
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # React entry point
│   └── globals.css     # Global styles and design tokens
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind configuration
└── package.json        # Dependencies and scripts
```

## Commands

From the `web/` directory:

- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## Development Notes

- Base path is set to `/drill/` for GitHub Pages deployment
- Custom design system uses CSS variables defined in `globals.css`
- All imports have been normalized (no version-specific imports)
- TypeScript type checking runs during build but doesn't block it

## Deployment

- **CI/CD**: GitHub Actions workflow at `.github/workflows/deploy.yml`
- **Trigger**: Pushes to `main` branch
- **Target**: GitHub Pages
- **URL**: Will be available at `https://[username].github.io/drill/`

## Important Notes

- Make sure to enable GitHub Pages in repository settings
- Set source to "GitHub Actions" in Pages settings
- First deployment may take a few minutes to become available
