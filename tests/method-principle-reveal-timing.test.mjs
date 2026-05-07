import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const methodSource = readFileSync(new URL('../src/pages/Method.jsx', import.meta.url), 'utf8');

assert.match(
  methodSource,
  /offset:\s*\[\s*'start 64%'\s*,\s*'end 72%'\s*\]/,
  'Method principle text should start revealing a little earlier in the viewport.'
);
