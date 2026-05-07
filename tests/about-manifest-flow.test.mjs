import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const aboutSource = readFileSync(new URL('../src/pages/About.jsx', import.meta.url), 'utf8');
const cssSource = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

assert.match(
  aboutSource,
  /about-manifest__essay/,
  'About page should render the new manifesto essay section.'
);

assert.match(
  aboutSource,
  /about-manifest__panel/,
  'About page should render editorial manifesto panels.'
);

assert.doesNotMatch(
  aboutSource,
  /className="about-manifest__block"/,
  'About page should no longer render manifesto blocks as repeated item rows.'
);

assert.match(
  cssSource,
  /\.about-manifest__essay/,
  'Styles should define the manifesto essay section.'
);

assert.match(
  cssSource,
  /\.about-manifest__panel/,
  'Styles should define the manifesto panel layout.'
);
