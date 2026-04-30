import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const footerSource = readFileSync(
  new URL('../src/components/layout/Footer.jsx', import.meta.url),
  'utf8'
);

assert.match(
  appSource,
  /className="h-screen min-h-screen pointer-events-none"/,
  'Footer reveal needs a viewport-height spacer before the fixed footer.'
);

assert.match(
  appSource,
  /className="fixed inset-x-0 bottom-0 z-0"/,
  'Footer reveal needs the footer fixed underneath the page content.'
);

assert.match(
  footerSource,
  /const revealY = useTransform\(scrollYProgress, \[0, 1\], \['22vh', '0vh'\]\);/,
  'Footer should map scroll progress to a vertical reveal transform.'
);

assert.match(
  footerSource,
  /<motion\.footer[\s\S]*style=\{\{ y: revealY \}\}/,
  'Footer should apply the reveal transform to the footer element.'
);
