import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.APP_URL || 'http://127.0.0.1:5260/about';

const browser = await chromium.launch({ headless: true });
const viewports = [
  { name: 'desktop', width: 1920, height: 934 },
  { name: 'desktop-short', width: 1440, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: 'networkidle' });

    const metrics = await page.evaluate(() => {
      const hero = document.querySelector('.about-manifest__hero');
      const eyebrow = document.querySelector('.about-manifest__eyebrow');
      const title = document.querySelector('.about-manifest__hero h1');
      const titleLines = [...document.querySelectorAll('.about-manifest__hero h1 span')];
      const year = document.querySelector('.about-manifest__year');
      const statement = document.querySelector('.about-manifest__statement');
      const titleRect = title?.getBoundingClientRect();
      const yearRect = year?.getBoundingClientRect();
      const statementRect = statement?.getBoundingClientRect();
      const rects = [eyebrow, title, year, statement]
        .filter(Boolean)
        .map((node) => node.getBoundingClientRect());
      const bottom = Math.max(...rects.map((rect) => rect.bottom));
      const top = Math.min(...rects.map((rect) => rect.top));

      return {
        heroHeight: hero?.getBoundingClientRect().height ?? 0,
        titleLineCount: titleLines.length,
        titleLinesAreStacked:
          titleLines.length === 2
            ? titleLines[1].getBoundingClientRect().top > titleLines[0].getBoundingClientRect().bottom - 2
            : false,
        titleTop: titleRect?.top ?? 0,
        titleBottom: titleRect?.bottom ?? 0,
        yearTop: yearRect?.top ?? 0,
        statementTop: statementRect?.top ?? 0,
        top,
        bottom,
        viewportHeight: window.innerHeight,
        overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    assert.ok(metrics.top >= 0, `${viewport.name} hero content should start inside the viewport.`);
    assert.ok(
      metrics.bottom <= metrics.viewportHeight - 12,
      `${viewport.name} hero content should fit before the fold; bottom ${metrics.bottom}, viewport ${metrics.viewportHeight}.`
    );
    assert.ok(
      metrics.heroHeight <= metrics.viewportHeight + 2,
      `${viewport.name} hero section should not exceed one viewport; got ${metrics.heroHeight}.`
    );
    assert.equal(metrics.titleLineCount, 2, `${viewport.name} hero title should render as two lines.`);
    assert.equal(metrics.titleLinesAreStacked, true, `${viewport.name} hero title lines should be stacked.`);
    const isMobile = viewport.width < 768;
    assert.ok(
      metrics.titleTop <= metrics.viewportHeight * (isMobile ? 0.42 : 0.36),
      `${viewport.name} hero title should sit higher in the viewport; top ${metrics.titleTop}.`
    );
    if (!isMobile) {
      assert.ok(
        metrics.yearTop - metrics.titleBottom >= 24,
        `${viewport.name} hero should keep breathing room between title and year; gap ${metrics.yearTop - metrics.titleBottom}.`
      );
    }
    if (!isMobile) {
      assert.ok(
        Math.abs(metrics.statementTop - metrics.yearTop) <= metrics.viewportHeight * 0.18,
        `${viewport.name} statement should align with the year area.`
      );
    }
    assert.ok(metrics.overflowX <= 2, `${viewport.name} should not overflow horizontally.`);

    await page.close();
  }
} finally {
  await browser.close();
}
