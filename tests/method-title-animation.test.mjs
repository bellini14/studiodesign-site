import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const componentUrl = new URL('../src/components/ui/vertical-cut-reveal.tsx', import.meta.url);
const methodUrl = new URL('../src/pages/Method.jsx', import.meta.url);

assert.equal(existsSync(componentUrl), true, 'VerticalCutReveal component should exist in src/components/ui.');

const componentSource = readFileSync(componentUrl, 'utf8');
const methodSource = readFileSync(methodUrl, 'utf8');

assert.match(
  componentSource,
  /export \{ VerticalCutReveal \}/,
  'VerticalCutReveal should be exported from the UI component file.'
);

assert.match(
  methodSource,
  /import \{ VerticalCutReveal \} from '..\/components\/ui\/vertical-cut-reveal';/,
  'Method page should import the VerticalCutReveal UI component.'
);

assert.match(
  methodSource,
  /<VerticalCutReveal[\s\S]*splitBy="characters"[\s\S]*staggerDuration=\{0\.025\}[\s\S]*staggerFrom="first"[\s\S]*stiffness: 200[\s\S]*damping: 21[\s\S]*Método StudioDesign[\s\S]*<\/VerticalCutReveal>/,
  'Method title should use the requested character-based VerticalCutReveal animation settings.'
);
