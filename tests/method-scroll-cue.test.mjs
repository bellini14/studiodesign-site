import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const methodSource = readFileSync(new URL('../src/pages/Method.jsx', import.meta.url), 'utf8');
const cssSource = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

assert.match(
  methodSource,
  /className="method-scroll-cue"/,
  'Method hero should render a scroll cue in the lower-left corner.'
);

assert.match(
  methodSource,
  /href="#method-steps"/,
  'Method scroll cue should point to the method steps section.'
);

assert.match(
  methodSource,
  /id="method-steps"/,
  'Method steps section should expose an anchor target.'
);

assert.match(
  methodSource,
  /aria-label="Role para ver mais"/,
  'Method scroll cue needs an accessible label that describes the scroll affordance.'
);

assert.match(
  cssSource,
  /\.method-scroll-cue\s*\{[\s\S]*left:\s*50%/,
  'Method scroll cue should be centered horizontally.'
);

assert.match(
  cssSource,
  /\.method-scroll-cue\s*\{[\s\S]*transform:\s*translateX\(-50%\)/,
  'Method scroll cue should offset itself so its center aligns with the viewport center.'
);

assert.match(
  cssSource,
  /@keyframes method-scroll-cue-bounce/,
  'Method scroll cue should define a bounce animation.'
);

assert.match(
  cssSource,
  /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*\.method-scroll-cue/,
  'Method scroll cue should respect reduced-motion preferences.'
);
