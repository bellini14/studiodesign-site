import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const methodSource = readFileSync(new URL('../src/pages/Method.jsx', import.meta.url), 'utf8');
const deliverablesRevealStart = methodSource.indexOf('const methodStepDeliverablesReveal =');
const deliverablesRevealEnd = methodSource.indexOf('const methodStepSummaryReveal =');
const deliverablesRevealSource = methodSource.slice(deliverablesRevealStart, deliverablesRevealEnd);

assert.match(
  methodSource,
  /const methodStepTitleReveal\s*=/,
  'Method step title should have its own active-number reveal timing.'
);

assert.match(
  methodSource,
  /const methodStepDeliverablesReveal\s*=/,
  'Method step deliverables should have a separate active-number reveal timing.'
);

assert.match(
  methodSource,
  /const methodStepSummaryReveal\s*=/,
  'Method step summary should have a separate active-number reveal timing.'
);

assert.match(
  methodSource,
  /setRevealedStepIndexes[\s\S]*activeStepIndex/,
  'Method step reveal state should be updated from activeStepIndex, so it runs when the scroll number changes.'
);

assert.match(
  methodSource,
  /revealedStepIndexes/,
  'Method step sections should remember which step numbers already animated.'
);

assert.match(
  methodSource,
  /revealedStepIndexes\.includes\(index\) \? 'visible' : 'rest'/,
  'Method step sections should stay visible after their number has become active once.'
);

assert.doesNotMatch(
  methodSource,
  /className="method-step"[\s\S]{0,240}whileInView="visible"/,
  'Method step articles should not animate as soon as each item enters the viewport.'
);

assert.doesNotMatch(
  methodSource,
  /rest:\s*\{[^}]*filter:/,
  'Inactive method step sections should not use blur; they should only sit at low opacity.'
);

assert.match(
  methodSource,
  /delay:\s*0\.04[\s\S]*delay:\s*0\.18[\s\S]*delay:\s*0\.36/,
  'Title, deliverables, and summary sections should animate at different smoother timings.'
);

assert.match(
  methodSource,
  /duration:\s*0\.86[\s\S]*duration:\s*0\.94[\s\S]*duration:\s*1\.02/,
  'Method step section animations should be slower and smoother.'
);

assert.doesNotMatch(
  deliverablesRevealSource,
  /staggerChildren|delayChildren/,
  'Contents inside each method step block should animate together; only different blocks should have different timings.'
);

assert.doesNotMatch(
  methodSource,
  /<motion\.(?:h3|ul|li)/,
  'Deliverables heading and list items should not have their own independent animations inside the deliverables block.'
);
