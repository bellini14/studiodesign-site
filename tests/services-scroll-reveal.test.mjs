import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const servicesSource = readFileSync(new URL('../src/pages/Services.jsx', import.meta.url), 'utf8');

assert.match(
  servicesSource,
  /const SCROLL_REVEAL_VIEWPORT = \{ once: true, amount: 0\.32 \};/,
  'Services page should use a shared viewport trigger for scroll reveal animations.'
);

assert.match(
  servicesSource,
  /const scrollRevealVariants = \{/,
  'Services page should centralize scroll reveal variants instead of scattering animation values.'
);

assert.match(
  servicesSource,
  /variants=\{scrollRevealVariants\.container\}/,
  'Services page should use shared stagger containers for grouped reveals.'
);

assert.match(
  servicesSource,
  /variants=\{scrollRevealVariants\.item\}/,
  'Services page should use shared item reveals for repeated content.'
);
