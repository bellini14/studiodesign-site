import assert from 'node:assert/strict';
import { shouldUsePageTransition } from '../src/utils/navigationTransitions.js';

const current = new URL('https://example.com/services');

assert.equal(
  shouldUsePageTransition(new URL('https://example.com/services#service-branding'), current),
  false,
  'hash-only navigation on the current page should not use the page transition'
);

assert.equal(
  shouldUsePageTransition(new URL('https://example.com/services?filter=all#service-branding'), current),
  true,
  'search changes should still use the page transition'
);

assert.equal(
  shouldUsePageTransition(new URL('https://example.com/contact'), current),
  true,
  'path changes should still use the page transition'
);
