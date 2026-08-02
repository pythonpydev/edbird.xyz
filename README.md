# edbird.xyz

Static personal website for software projects and linked web properties.

## Stack

- Eleventy for static generation
- JSON files for content sources
- Vanilla CSS and minimal JavaScript

## Quick Start

1. Install dependencies:
   npm install
2. Validate content data:
   npm run validate:data
3. Start local preview:
   npm run dev
4. Build for deployment:
   npm run build

## Content Editing

All content lives in src/_data.

- profile.json: personal details and contact links
- projects.json: portfolio projects and project detail content
- websites.json: related websites and ecosystem mapping
- milestones.json: curated milestone updates only
- themes.json: demo home page color schemes

## Generated Routes

- /: home
- /about/
- /projects/
- /projects/{slug}/ generated from one shared template
- /websites/
- /contact/
- /demos/: theme demo index
- /demos/{theme-slug}/: generated home page palette demos

## Deployment

The build output is in dist, ready for low-cost static hosting platforms such as Cloudflare Pages, GitHub Pages, or Netlify.
