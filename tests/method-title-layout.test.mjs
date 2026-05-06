import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.APP_URL || 'http://127.0.0.1:5226/metodo';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 720 } });

try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);

  const metrics = await page.evaluate(() => {
    const title = document.querySelector('.method-hero h1');
    const titleRect = title.getBoundingClientRect();
    const visibleGroups = [...document.querySelectorAll('.method-title-reveal [aria-hidden="true"]')];
    const groupRects = visibleGroups.map((line) => {
      const rect = line.getBoundingClientRect();

      return {
        left: rect.left,
        right: rect.right,
        width: rect.width,
      };
    });

    return {
      viewportWidth: window.innerWidth,
      bodyWidth: document.documentElement.scrollWidth,
      titleLeft: titleRect.left,
      titleRight: titleRect.right,
      groupRects,
      animatedCharacterCount: document.querySelectorAll('.method-title-reveal [aria-hidden="true"] .inline-block').length,
      lastCharacterSpare: (() => {
        const lastGroup = visibleGroups.at(-1);
        const lastChar = lastGroup?.querySelectorAll('.inline-block');
        const finalChar = lastChar?.[lastChar.length - 1];

        if (!lastGroup || !finalChar) return null;

        return lastGroup.getBoundingClientRect().right - finalChar.getBoundingClientRect().right;
      })(),
      descenderSpare: (() => {
        const studioGroup = visibleGroups.at(-1);
        const gChar = [...(studioGroup?.querySelectorAll('.inline-block') || [])].find(
          (node) => node.textContent === 'g'
        );

        if (!studioGroup || !gChar) return null;

        return studioGroup.getBoundingClientRect().bottom - gChar.getBoundingClientRect().bottom;
      })(),
    };
  });

  assert.ok(metrics.animatedCharacterCount >= 18, 'Title should still render animated characters.');
  assert.ok(metrics.bodyWidth <= metrics.viewportWidth + 1, 'Method title should not create horizontal overflow.');
  assert.ok(metrics.titleLeft >= 0, 'Method title should not leak left.');
  assert.ok(metrics.titleRight <= metrics.viewportWidth + 1, 'Method title should not leak right.');
  assert.ok(
    metrics.lastCharacterSpare >= 1,
    'Last animated title character should have horizontal breathing room inside its reveal mask.'
  );
  assert.ok(
    metrics.descenderSpare >= 1,
    'Descenders in the animated title should have vertical breathing room inside the reveal mask.'
  );

  for (const [index, rect] of metrics.groupRects.entries()) {
    assert.ok(rect.left >= 0, `Method title line ${index + 1} should not leak left.`);
    assert.ok(rect.right <= metrics.viewportWidth + 1, `Method title line ${index + 1} should not leak right.`);
  }
} finally {
  await browser.close();
}
