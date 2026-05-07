import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const aboutSource = readFileSync(new URL('../src/pages/About.jsx', import.meta.url), 'utf8');
const cssSource = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

assert.match(
  aboutSource,
  /className="about-scroll-cue"/,
  'About hero should render a centered scroll cue.'
);

assert.match(
  aboutSource,
  /aria-label="Role para ver mais"/,
  'Scroll cue needs an accessible label that describes the scroll affordance.'
);

assert.match(
  cssSource,
  /\.about-scroll-cue\s*\{[\s\S]*left:\s*50%/,
  'Scroll cue should be centered horizontally.'
);

assert.match(
  cssSource,
  /\.about-scroll-cue\s*\{[\s\S]*transform:\s*translateX\(-50%\)/,
  'Scroll cue should offset itself so its center aligns with the viewport center.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__hero\s*\{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\)/,
  'About hero should use one centered column.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__hero\s*\{[\s\S]*gap:\s*clamp\(2rem,\s*4\.6svh,\s*3\.4rem\)/,
  'About hero should keep stronger breathing room between the headline and year.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__hero-copy\s*\{[\s\S]*justify-self:\s*center/,
  'About hero title should be centered in the hero.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__hero h1\s*\{[\s\S]*text-align:\s*center/,
  'About hero headline should be center aligned.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__hero h1\s*\{[\s\S]*font-size:\s*clamp\(3\.15rem,\s*min\(5\.8vw,\s*11\.5svh\),\s*7\.25rem\)/,
  'About hero headline should be scaled down enough to breathe inside the hero.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__year\s*\{[\s\S]*font-size:\s*clamp\(10\.25rem,\s*min\(29vw,\s*36svh\),\s*27rem\)/,
  'About hero year should be large enough to act as a dominant background element.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__statement\s*\{[\s\S]*grid-row:\s*2/,
  'About hero statement card should overlap the year instead of sitting below it.'
);

assert.match(
  cssSource,
  /\.about-manifest\.about-page \.about-manifest__statement\s*\{[\s\S]*z-index:\s*2/,
  'About hero statement card should render above the year.'
);

assert.match(
  cssSource,
  /@keyframes about-scroll-cue-bounce/,
  'Scroll cue should define a bounce animation.'
);

assert.match(
  cssSource,
  /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*\.about-scroll-cue/,
  'Scroll cue should respect reduced-motion preferences.'
);
