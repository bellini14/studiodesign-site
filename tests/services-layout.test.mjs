import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.APP_URL || 'http://127.0.0.1:5197/services';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto(url, { waitUntil: 'networkidle' });

  const metrics = await page.evaluate(() => {
    const lastChapter = document.querySelector('.service-chapter--last');
    const serviceChapters = [...document.querySelectorAll('.service-chapter')];
    const penultimateChapter = serviceChapters.at(-2);
    const operatingAreas = document.querySelector('.operating-areas-section');
    const postStack = document.querySelector('.services-post-stack-section');
    const ctaGrid = document.querySelector('.services-cta__grid');
    const lastChapterPanel = document.querySelector('.service-chapter--last .service-chapter__panel');

    if (!lastChapter || !penultimateChapter || !operatingAreas || !lastChapterPanel) {
      return null;
    }

    const lastRect = lastChapter.getBoundingClientRect();
    const penultimateRect = penultimateChapter.getBoundingClientRect();
    const operatingRect = operatingAreas.getBoundingClientRect();
    const operatingHeading = operatingAreas.querySelector('.operating-areas-section__heading h2');
    const operatingHeadingRect = operatingHeading?.getBoundingClientRect();

    return {
      viewportHeight: window.innerHeight,
      lastChapterHeight: lastRect.height,
      lastChapterTop: lastRect.top + window.scrollY,
      penultimateBottom: penultimateRect.bottom + window.scrollY,
      operatingTop: operatingRect.top + window.scrollY,
      operatingHeadingTop: operatingHeadingRect ? operatingHeadingRect.top + window.scrollY : null,
      lastChapterBottom: lastRect.bottom + window.scrollY,
      operatingBottom: operatingRect.bottom + window.scrollY,
      lastChapterBackground: getComputedStyle(lastChapter).backgroundColor,
      lastChapterPanelBackground: getComputedStyle(lastChapterPanel).backgroundColor,
      lastChapterPanelPosition: getComputedStyle(lastChapterPanel).position,
      hasPostStack: Boolean(postStack),
      hasFinalCta: Boolean(ctaGrid),
      operatingIsLastServicesBlock: operatingAreas.nextElementSibling === null,
    };
  });

  assert.ok(metrics, 'Expected services layout sections to exist.');
  assert.notEqual(
    metrics.lastChapterPanelPosition,
    'sticky',
    'Last service chapter should scroll normally instead of sticking to the viewport.'
  );
  assert.ok(
    metrics.lastChapterHeight >= metrics.viewportHeight * 2.8,
    `Last service chapter should keep enough scroll stage to cover the previous overlap; got ${metrics.lastChapterHeight}px for ${metrics.viewportHeight}px viewport.`
  );
  assert.ok(
    metrics.lastChapterTop < metrics.penultimateBottom,
    'Last service chapter should start before the previous sticky chapter has finished to preserve overlap.'
  );
  assert.ok(
    metrics.operatingTop >= metrics.penultimateBottom,
    'Operating areas should not start until the previous sticky chapter has finished.'
  );
  assert.ok(
    metrics.operatingTop <= metrics.penultimateBottom + metrics.viewportHeight * 0.16,
    'Operating areas should sit close to the visible fourth chapter content instead of waiting for the full scroll stage to end.'
  );
  assert.ok(
    metrics.operatingHeadingTop <= metrics.penultimateBottom + metrics.viewportHeight * 0.09,
    'Operating areas content should appear close to the fourth chapter instead of leaving a large blank area.'
  );
  assert.equal(
    metrics.lastChapterBackground,
    'rgb(247, 243, 236)',
    'The complete fourth chapter background should use #F7F3EC.'
  );
  assert.equal(
    metrics.lastChapterPanelBackground,
    'rgb(247, 243, 236)',
    'The fourth chapter panel background should use #F7F3EC.'
  );
  assert.equal(metrics.hasPostStack, false, 'Process block should be removed after operating areas.');
  assert.equal(metrics.hasFinalCta, false, 'Final CTA block should be removed after operating areas.');
  assert.equal(metrics.operatingIsLastServicesBlock, true, 'Operating areas should be the final block in Services.');
} finally {
  await browser.close();
}
