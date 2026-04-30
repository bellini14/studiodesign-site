export const scrollToAnchorTarget = (
  target,
  {
    windowRef = typeof window !== 'undefined' ? window : undefined,
    lenis = windowRef?.__studioLenis,
    behavior = 'smooth',
    duration = 1.1,
  } = {}
) => {
  if (!target) {
    return;
  }

  if (lenis?.scrollTo) {
    lenis.resize?.();
    lenis.scrollTo(target, {
      duration,
      force: true,
      lock: true,
    });
    return;
  }

  if (!windowRef?.scrollTo) {
    return;
  }

  const top = target.getBoundingClientRect().top + windowRef.scrollY;
  const left = windowRef.scrollX;
  const requestFrame = windowRef.requestAnimationFrame || ((callback) => callback());

  windowRef.scrollTo({
    top: windowRef.scrollY,
    left,
    behavior: 'instant',
  });

  requestFrame(() => {
    windowRef.scrollTo({
      top,
      left,
      behavior,
    });
  });
};
