import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const aboutUrl = new URL('../src/pages/About.jsx', import.meta.url);

assert.equal(existsSync(aboutUrl), true, 'About page file should exist.');

const aboutSource = readFileSync(aboutUrl, 'utf8');

assert.match(
  appSource,
  /import About from '\.\/pages\/About';/,
  'App should import the About page.'
);

assert.match(
  appSource,
  /link: '\/about'/,
  'Menu item Sobre should navigate to the /about page.'
);

assert.match(
  appSource,
  /<Route path="\/about" element=\{<About \/>\} \/>/,
  'App should register the /about route.'
);

for (const text of [
  'Três gerações',
  'construindo marcas.',
  'Desde 1975',
  '1975',
  'Legado em movimento',
  'Três gerações',
  'O que nos move',
  'Como atuamos',
  'Nosso diferencial',
  'Não oferecemos apenas execução criativa.',
]) {
  assert.ok(aboutSource.includes(text), `About page should include: ${text}`);
}

assert.ok(
  !aboutSource.includes('Sobre a StudioDesign'),
  'About page hero should not render the old Sobre a StudioDesign pill.'
);

assert.ok(
  !aboutSource.includes('Três gerações construindo marcas desde 1975.'),
  'About page title should not include 1975.'
);

for (const className of [
  'about-manifest',
  'about-manifest__year',
  'about-timeline',
  'about-timeline__entry',
]) {
  assert.ok(aboutSource.includes(className), `About page should use class: ${className}`);
}

assert.match(
  aboutSource,
  /<span>Três gerações<\/span>\s*<span>construindo marcas\.<\/span>/,
  'About hero title should be split into two explicit lines.'
);
