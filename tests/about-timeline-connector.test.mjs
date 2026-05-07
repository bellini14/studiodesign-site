import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.APP_URL || 'http://127.0.0.1:5260/about';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1057, height: 929 } });
await page.emulateMedia({ reducedMotion: 'no-preference' });

try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);

  const readMetrics = () => page.evaluate(() => {
    const entry = document.querySelector('.about-timeline__entry--left');
    const body = entry?.querySelector('.about-timeline__body');
    const cardShell = entry?.querySelector('.about-timeline__card-shell');
    const card = entry?.querySelector('.about-timeline__glow-card');
    const node = entry?.querySelector('.about-timeline__node');

    if (!entry || !body || !cardShell || !card || !node) {
      return null;
    }

    const bodyRect = body.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const bodyAfter = getComputedStyle(body, '::after');
    const connectorWidth = parseFloat(bodyAfter.width);
    const connectorStart = bodyRect.right;
    const connectorEnd = connectorStart + connectorWidth;

    return {
      isActive: body.classList.contains('about-timeline__body--active'),
      cardOpacity: parseFloat(getComputedStyle(cardShell).opacity),
      connectorOpacity: parseFloat(bodyAfter.opacity),
      connectorScaleX: bodyAfter.transform === 'none' ? 1 : new DOMMatrixReadOnly(bodyAfter.transform).a,
      connectorTransform: bodyAfter.transform,
      connectorStart,
      connectorEnd,
      cardRight: cardRect.right,
      nodeCenter: nodeRect.left + nodeRect.width / 2,
    };
  });

  const initialMetrics = await readMetrics();
  assert.ok(initialMetrics, 'Timeline entry should render on the about page.');
  assert.equal(initialMetrics.isActive, false, 'First timeline card should start inactive.');
  assert.equal(initialMetrics.connectorOpacity, 0, 'Connector should stay hidden before the card activates.');
  assert.ok(initialMetrics.connectorScaleX < 0.01, 'Connector should start collapsed before the card activates.');

  for (let scrollY = 0; scrollY <= 1800; scrollY += 200) {
    await page.evaluate((nextScrollY) => {
      window.scrollTo(0, nextScrollY);
      window.__studioLenis?.scrollTo?.(nextScrollY, { immediate: true });
    }, scrollY);
    await page.waitForTimeout(120);

    const currentMetrics = await readMetrics();
    if (currentMetrics?.isActive) {
      break;
    }
  }

  await page.waitForTimeout(240);

  const midAnimationMetrics = await readMetrics();
  assert.ok(midAnimationMetrics, 'Timeline entry should remain measurable during animation.');
  assert.ok(
    midAnimationMetrics.connectorScaleX > 0.05,
    'Connector should start filling before the card appears.'
  );
  assert.ok(
    midAnimationMetrics.cardOpacity > 0.05,
    'Card should start appearing before the connector finishes filling.'
  );

  await page.waitForTimeout(700);

  const metrics = await readMetrics();

  assert.ok(metrics, 'Timeline entry should render on the about page.');
  assert.equal(metrics.isActive, true, 'First timeline card should activate after the track reaches its node.');
  assert.ok(metrics.connectorOpacity > 0.99, 'Connector should become visible when the card activates.');
  assert.ok(metrics.connectorScaleX > 0.99, 'Connector should expand when the card activates.');
  assert.ok(
    Math.abs(metrics.connectorStart - metrics.cardRight) <= 2,
    `Connector should start at the card edge. Received start=${metrics.connectorStart} cardRight=${metrics.cardRight}.`
  );
  assert.ok(
    Math.abs(metrics.connectorEnd - metrics.nodeCenter) <= 2,
    `Connector should reach the timeline node center. Received end=${metrics.connectorEnd} nodeCenter=${metrics.nodeCenter}.`
  );
} finally {
  await browser.close();
}
