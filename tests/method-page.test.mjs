import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const methodUrl = new URL('../src/pages/Method.jsx', import.meta.url);

assert.equal(existsSync(methodUrl), true, 'Method page file should exist.');

const methodSource = readFileSync(methodUrl, 'utf8');

assert.match(
  appSource,
  /import Method from '\.\/pages\/Method';/,
  'App should import the Method page.'
);

assert.match(
  appSource,
  /link: '\/metodo'/,
  'Menu item Metodo should navigate to the /metodo page.'
);

assert.match(
  appSource,
  /<Route path="\/metodo" element=\{<Method \/>\} \/>/,
  'App should register the /metodo route.'
);

for (const text of [
  'Método',
  'StudioDesign',
  'Diagnosticar',
  'Definir',
  'Projetar',
  'Implementar',
  'Evoluir',
  'Não criamos marcas para parecer novas.',
  'Criamos marcas para gerar direção, valor e permanência.',
]) {
  assert.ok(methodSource.includes(text), `Method page should include: ${text}`);
}
