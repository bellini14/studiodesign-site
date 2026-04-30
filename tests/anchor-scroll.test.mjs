import assert from 'node:assert/strict';
import { scrollToAnchorTarget } from '../src/utils/anchorScroll.js';

const calls = [];
const target = {
  getBoundingClientRect: () => ({ top: 420 }),
};
const windowRef = {
  scrollX: 8,
  scrollY: 120,
  scrollTo: (options) => calls.push(options),
  requestAnimationFrame: (callback) => {
    calls.push('raf');
    callback();
  },
};

scrollToAnchorTarget(target, { windowRef });

assert.deepEqual(calls, [
  { top: 120, left: 8, behavior: 'instant' },
  'raf',
  { top: 540, left: 8, behavior: 'smooth' },
]);

const lenisCalls = [];
const lenis = {
  resize: () => lenisCalls.push('resize'),
  scrollTo: (scrollTarget, options) => lenisCalls.push({ scrollTarget, options }),
};

scrollToAnchorTarget(target, { lenis });

assert.deepEqual(lenisCalls, [
  'resize',
  {
    scrollTarget: target,
    options: {
      duration: 1.1,
      force: true,
      lock: true,
    },
  },
]);
