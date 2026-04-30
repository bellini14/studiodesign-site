export const isSameDocumentNavigation = (nextUrl, currentUrl) =>
  nextUrl.origin === currentUrl.origin &&
  nextUrl.pathname === currentUrl.pathname &&
  nextUrl.search === currentUrl.search &&
  nextUrl.hash !== currentUrl.hash;

export const shouldUsePageTransition = (nextUrl, currentUrl) =>
  nextUrl.origin === currentUrl.origin && !isSameDocumentNavigation(nextUrl, currentUrl);
