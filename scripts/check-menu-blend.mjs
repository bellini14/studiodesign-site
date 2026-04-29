import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/components/ui/StaggeredMenu.tsx', import.meta.url), 'utf8');

const hasScopeBlendRule = /\.sm-scope\[data-scroll-contrast='true'\]\s*\{\s*mix-blend-mode:\s*difference;/s.test(source);
const hasHeaderBlendRule = /\.sm-scope\[data-scroll-contrast='true'\]\s+\.staggered-menu-header\s*\{\s*mix-blend-mode:\s*difference;/s.test(source);
const hasLayerSplit = /sm-header-layer|sm-panel-layer|sm-header-wrapper|sm-panel-wrapper/.test(source);
const hasChildBlendRule = /\.sm-scope\[data-scroll-contrast='true'\]\s+\.sm-(?:logo|toggle|icon)[\s\S]*?mix-blend-mode:\s*difference;/s.test(source);
const hasFixedContents = /data-fixed=\{isFixed \|\| undefined\}/.test(source) && /isFixed \? 'contents pointer-events-none'/.test(source);
const hasWeightCompensation = /font-weight:\s*(?:240|400)\s*!important|height:\s*1\.2px/.test(source);
const dimsContrastControls = /opacity:\s*0\.92/.test(source);

const failures = [];

if (hasScopeBlendRule) {
  failures.push('Expected scroll contrast not to apply mix-blend-mode on the full-screen .sm-scope.');
}

if (!hasHeaderBlendRule) {
  failures.push('Expected scroll contrast to apply mix-blend-mode on the real menu header.');
}

if (hasLayerSplit) {
  failures.push('Expected the menu not to use split header/panel blend layers.');
}

if (hasChildBlendRule) {
  failures.push('Expected child text/icon objects not to create their own blend contexts.');
}

if (!hasFixedContents) {
  failures.push('Expected fixed menu shell to use display: contents so the header can blend with page content.');
}

if (hasWeightCompensation) {
  failures.push('Expected no font/stroke weight compensation hacks in scroll contrast mode.');
}

if (dimsContrastControls) {
  failures.push('Expected scroll contrast objects to remain fully opaque.');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Menu blend CSS contract is valid.');
