import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const aboutUrl = new URL('../src/pages/About.jsx', import.meta.url);
const tiltedCardUrl = new URL('../src/components/ui/TiltedCard.tsx', import.meta.url);

assert.equal(existsSync(aboutUrl), true, 'About page file should exist.');
assert.equal(existsSync(tiltedCardUrl), true, 'TiltedCard component file should exist.');

const aboutSource = readFileSync(aboutUrl, 'utf8');
const tiltedCardSource = readFileSync(tiltedCardUrl, 'utf8');

assert.match(
  aboutSource,
  /import TiltedCard from '\.\.\/components\/ui\/TiltedCard';/,
  'About page should import the TiltedCard component.'
);

assert.match(
  aboutSource,
  /rotateAmplitude=\{7\}/,
  'About timeline cards should use rotateAmplitude={7}.'
);

assert.match(
  aboutSource,
  /scaleOnHover=\{1\}/,
  'About timeline cards should use scaleOnHover={1}.'
);

assert.match(
  tiltedCardSource,
  /displayOverlayContent/,
  'TiltedCard should support overlay content rendering.'
);
