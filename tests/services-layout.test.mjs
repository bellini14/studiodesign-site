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
    const growthPath = document.querySelector('.growth-path-section');
    const exclusivePrograms = document.querySelector('.exclusive-programs-section');
    const trustBuilt = document.querySelector('.trust-built-section');
    const lastChapterPanel = document.querySelector('.service-chapter--last .service-chapter__panel');

    if (!lastChapter || !penultimateChapter || !operatingAreas || !growthPath || !exclusivePrograms || !trustBuilt || !lastChapterPanel) {
      return null;
    }

    const lastRect = lastChapter.getBoundingClientRect();
    const penultimateRect = penultimateChapter.getBoundingClientRect();
    const operatingRect = operatingAreas.getBoundingClientRect();
    const growthRect = growthPath.getBoundingClientRect();
    const exclusiveRect = exclusivePrograms.getBoundingClientRect();
    const trustRect = trustBuilt.getBoundingClientRect();
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
      growthTop: growthRect.top + window.scrollY,
      growthBottom: growthRect.bottom + window.scrollY,
      exclusiveTop: exclusiveRect.top + window.scrollY,
      exclusiveBottom: exclusiveRect.bottom + window.scrollY,
      trustTop: trustRect.top + window.scrollY,
      lastChapterBackground: getComputedStyle(lastChapter).backgroundColor,
      lastChapterPanelBackground: getComputedStyle(lastChapterPanel).backgroundColor,
      lastChapterPanelPosition: getComputedStyle(lastChapterPanel).position,
      operatingPreviousSiblingIsLastChapter: operatingAreas.previousElementSibling === lastChapter,
      growthFollowsOperating: operatingAreas.nextElementSibling === growthPath,
      exclusiveFollowsGrowth: growthPath.nextElementSibling === exclusivePrograms,
      trustFollowsExclusive: exclusivePrograms.nextElementSibling === trustBuilt,
      trustIsLastServicesBlock: trustBuilt.nextElementSibling === null,
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
    metrics.operatingTop >= metrics.lastChapterTop + metrics.viewportHeight,
    'Operating areas should not cover the visible fourth chapter panel.'
  );
  assert.ok(
    metrics.operatingTop <= metrics.lastChapterTop + metrics.viewportHeight * 1.2,
    'Operating areas should sit close to the visible fourth chapter content instead of waiting for the full scroll stage to end.'
  );
  assert.ok(
    metrics.operatingHeadingTop <= metrics.lastChapterTop + metrics.viewportHeight * 1.45,
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
  assert.equal(metrics.operatingPreviousSiblingIsLastChapter, true, 'Operating areas should follow the fourth service chapter.');
  assert.equal(metrics.growthFollowsOperating, true, 'Growth path section should follow operating areas.');
  assert.equal(metrics.exclusiveFollowsGrowth, true, 'Exclusive programs section should follow growth path.');
  assert.equal(metrics.trustFollowsExclusive, true, 'Trust section should follow exclusive programs.');
  assert.equal(metrics.trustIsLastServicesBlock, true, 'Trust section should be the final block in Services.');
  assert.ok(metrics.growthTop >= metrics.operatingBottom, 'Growth path should not overlap operating areas.');
  assert.ok(metrics.exclusiveTop >= metrics.growthBottom, 'Exclusive programs should not overlap growth path.');
  assert.ok(metrics.trustTop >= metrics.exclusiveBottom, 'Trust section should not overlap exclusive programs.');
} finally {
  await browser.close();
}
