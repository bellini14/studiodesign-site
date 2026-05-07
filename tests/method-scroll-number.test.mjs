import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const methodSource = readFileSync(new URL('../src/pages/Method.jsx', import.meta.url), 'utf8');
const cssSource = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

assert.match(
  methodSource,
  /useScroll/,
  'Method page should derive the active step number from scroll progress.'
);

assert.match(
  methodSource,
  /digitReelOffset/,
  'Method page should animate one continuous digit reel instead of overlapping entering and exiting digits.'
);

assert.match(
  methodSource,
  /method-scroll-number/,
  'Method page should render one shared scroll-following number indicator.'
);

assert.match(
  cssSource,
  /\.method-scroll-number\s*\{[\s\S]*position:\s*sticky/,
  'The scroll number should stay sticky while the method steps scroll.'
);

assert.match(
  cssSource,
  /\.method-scroll-number\s*\{[\s\S]*top:\s*50svh[\s\S]*transform:\s*translateY\(-50%\)/,
  'The scroll number should be vertically centered in the viewport.'
);

assert.match(
  methodSource,
  /window\.innerHeight\s*\*\s*0\.5/,
  'Method page should change the active number at the viewport center line.'
);

assert.match(
  methodSource,
  /stepCenter/,
  'Method page should compare each method box center to the centered number.'
);

assert.doesNotMatch(
  methodSource,
  /method-scroll-number__value[\s\S]*filter:\s*'blur/,
  'The method number transition should not use blur.'
);

assert.match(
  cssSource,
  /method-scroll-number__reel/,
  'The method number should use a roulette-style reel element.'
);

assert.match(
  methodSource,
  /method-scroll-number__zero/,
  'The leading zero should be rendered as a fixed, non-animated digit.'
);

assert.match(
  methodSource,
  /activeStepDigit/,
  'Only the second digit should be animated by the roulette reel.'
);

assert.match(
  cssSource,
  /method-scroll-number__digit-window/,
  'The animated digit should be clipped inside its own roulette window.'
);

assert.doesNotMatch(
  methodSource,
  /AnimatePresence/,
  'The roulette digit should not use AnimatePresence because entering and exiting digits can overlap.'
);

assert.match(
  methodSource,
  /1\.18/,
  'The roulette digit transition should be slower and smoother.'
);

assert.match(
  cssSource,
  /\.method-steps\s*\{[\s\S]*background:\s*var\(--method-dark\)/,
  'The full method steps section should use a darker background while the sticky number scrolls.'
);

assert.match(
  cssSource,
  /\.method-steps\s+\.method-step__content h2\s*\{[\s\S]*color:\s*var\(--method-paper\)/,
  'Method step titles should switch to light text on the darker steps background.'
);

assert.match(
  methodSource,
  /<div className="method-step__content">[\s\S]*<motion\.h2[\s\S]*>\{step\.title\}<\/motion\.h2>[\s\S]*method-step__deliverables[\s\S]*<motion\.aside className="method-step__summary"/,
  'Method step deliverables should sit below the title, with the descriptive summary moved to the side.'
);

assert.match(
  cssSource,
  /method-step__summary/,
  'Method step summary should have dedicated layout styling after swapping positions.'
);
