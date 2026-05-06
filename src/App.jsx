import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import StaggeredMenu from './components/ui/StaggeredMenu';
import PageTransition, {
  PAGE_PANEL_DURATION,
} from './components/layout/PageTransition';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Method from './pages/Method';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import { CONTACT_INFO } from './data/content';
import { shouldUsePageTransition } from './utils/navigationTransitions';
import { scrollToAnchorTarget } from './utils/anchorScroll';

const menuItems = [
  {
    label: 'Trabalho',
    ariaLabel: 'Ir para a pagina de trabalho',
    link: '/portfolio',
  },
  {
    label: 'Serviços',
    ariaLabel: 'Ir para a pagina de servicos',
    link: '/services',
  },
  {
    label: 'Método',
    ariaLabel: 'Ir para a pagina de metodo',
    link: '/metodo',
  },
  {
    label: 'Sobre',
    ariaLabel: 'Ir para a pagina sobre',
    link: '/about',
  },
  {
    label: 'Futuros',
    ariaLabel: 'Ir para a pagina do blog',
    link: '/futuros',
  },
  {
    label: 'Clientes',
    ariaLabel: 'Ir para a pagina de clientes',
    link: '#clientes',
  },
];

const socialItems = [
  {
    label: CONTACT_INFO.instagram,
    link: CONTACT_INFO.instagram_url || 'https://instagram.com',
  },
  {
    label: CONTACT_INFO.linkedin,
    link: CONTACT_INFO.linkedin_url || 'https://linkedin.com',
  },
];

const transitionColors = ['#f6cdb6', '#ff8b68', '#ff3b00'];
const PAGE_EXIT_DURATION = 0.24;
const DEFAULT_TRANSITION_DIRECTION = 'right';
const HERO_NAV_SCROLL_THRESHOLD = 56;
const HERO_NAV_MEDIA_QUERY = '(min-width: 1025px)';

const isSameLocation = (left, right) =>
  left.pathname === right.pathname &&
  left.search === right.search &&
  left.hash === right.hash;

const toUrl = (locationValue) =>
  new URL(
    `${locationValue.pathname}${locationValue.search}${locationValue.hash}`,
    window.location.origin
  );

const isModifiedClick = (event) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0;

const getLinkTransitionDirection = (element) => {
  const rect = element.getBoundingClientRect();
  const linkCenter = rect.left + rect.width / 2;

  return linkCenter < window.innerWidth / 2 ? 'left' : 'right';
};

const shouldTrackLinkClick = (event, link) => {
  if (event.defaultPrevented || isModifiedClick(event)) {
    return false;
  }

  if ((link.target && link.target !== '_self') || link.hasAttribute('download')) {
    return false;
  }

  const href = link.getAttribute('href');

  if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  const nextUrl = new URL(link.href, window.location.href);

  return shouldUsePageTransition(nextUrl, new URL(window.location.href));
};

const isSamePageHashLink = (link) => {
  const nextUrl = new URL(link.href, window.location.href);
  const currentUrl = new URL(window.location.href);

  return (
    nextUrl.origin === currentUrl.origin &&
    nextUrl.pathname === currentUrl.pathname &&
    nextUrl.search === currentUrl.search &&
    nextUrl.hash
  );
};

function AppContent({
  routeLocation,
  className = '',
  onFooterModeChange,
}) {
  const footerRevealRef = useRef(null);

  useEffect(() => {
    const footerReveal = footerRevealRef.current;

    if (!footerReveal || !onFooterModeChange) {
      return;
    }

    const updateFooterMode = () => {
      const rect = footerReveal.getBoundingClientRect();
      const hasScrolledIntoPage = window.scrollY > 160;
      onFooterModeChange(hasScrolledIntoPage && rect.top <= window.innerHeight - 96);
    };

    updateFooterMode();
    window.addEventListener('scroll', updateFooterMode, { passive: true });
    window.addEventListener('resize', updateFooterMode);

    return () => {
      window.removeEventListener('scroll', updateFooterMode);
      window.removeEventListener('resize', updateFooterMode);
    };
  }, [onFooterModeChange]);

  return (
    <div className={`relative isolate flex min-h-screen flex-col ${className}`.trim()}>
      <main className="relative z-10 flex-grow bg-base shadow-[0_28px_90px_rgba(20,17,15,0.16)]">
        <Routes location={routeLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/metodo" element={<Method />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/futuros" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <div
        ref={footerRevealRef}
        aria-hidden="true"
        className="h-screen min-h-screen pointer-events-none"
      />
      <Footer
        revealTargetRef={footerRevealRef}
        className="fixed inset-x-0 bottom-0 z-0"
      />
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [showPageTransition, setShowPageTransition] = useState(false);
  const [pageTransitionDirection, setPageTransitionDirection] = useState(
    DEFAULT_TRANSITION_DIRECTION
  );
  const displayLocationRef = useRef(location);
  const contentRef = useRef(null);
  const pendingLocationRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const shouldRevealIncomingRef = useRef(false);
  const nextTransitionDirectionRef = useRef(DEFAULT_TRANSITION_DIRECTION);
  const [isFooterMenuMode, setIsFooterMenuMode] = useState(false);
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState(false);
  const [isDesktopHeroNav, setIsDesktopHeroNav] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(HERO_NAV_MEDIA_QUERY).matches
      : false
  );
  const [isHeroAtTop, setIsHeroAtTop] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY <= HERO_NAV_SCROLL_THRESHOLD : true
  );
  const [isPrimaryMenuOpen, setIsPrimaryMenuOpen] = useState(false);

  const showHeroNavigation =
    isDesktopHeroNav &&
    isHeroAtTop &&
    !isPrimaryMenuOpen &&
    !isFooterMenuMode;
  const showScrollContrastMenu =
    !showHeroNavigation &&
    !isFooterMenuMode &&
    !isPrimaryMenuOpen;

  useEffect(() => {
    const mediaQuery = window.matchMedia(HERO_NAV_MEDIA_QUERY);
    const updateViewportMode = () => {
      setIsDesktopHeroNav(mediaQuery.matches);
    };

    updateViewportMode();
    mediaQuery.addEventListener('change', updateViewportMode);

    return () => {
      mediaQuery.removeEventListener('change', updateViewportMode);
    };
  }, []);

  useEffect(() => {
    const updateHeroState = () => {
      setIsHeroAtTop(window.scrollY <= HERO_NAV_SCROLL_THRESHOLD);
    };

    updateHeroState();
    window.addEventListener('scroll', updateHeroState, { passive: true });
    window.addEventListener('resize', updateHeroState);

    return () => {
      window.removeEventListener('scroll', updateHeroState);
      window.removeEventListener('resize', updateHeroState);
    };
  }, []);

  useEffect(() => {
    if (!isFooterMenuMode) {
      setIsFooterMenuOpen(false);
    }
  }, [isFooterMenuMode]);

  useEffect(() => {
    const handleLinkClick = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[href]');

      if (!link) {
        return;
      }

      if (!event.defaultPrevented && !isModifiedClick(event) && isSamePageHashLink(link)) {
        const nextUrl = new URL(link.href, window.location.href);
        const anchorTarget = document.getElementById(decodeURIComponent(nextUrl.hash.slice(1)));

        if (anchorTarget) {
          event.preventDefault();
          scrollToAnchorTarget(anchorTarget);
          navigate(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
        }

        return;
      }

      if (!shouldTrackLinkClick(event, link)) {
        return;
      }

      nextTransitionDirectionRef.current = getLinkTransitionDirection(link);
    };

    document.addEventListener('click', handleLinkClick, true);

    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [navigate]);

  const animateIncomingContent = useCallback(() => {
    const content = contentRef.current;

    if (!content) {
      isTransitioningRef.current = false;
      pendingLocationRef.current = null;
      return;
    }

    gsap.killTweensOf(content);
    gsap.set(content, {
      autoAlpha: 0,
      filter: 'blur(12px)',
      y: 16,
      scale: 0.995,
    });
    gsap.to(content, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      y: 0,
      scale: 1,
      duration: PAGE_PANEL_DURATION,
      ease: 'expo.out',
      clearProps: 'transform,opacity,visibility,filter',
      onComplete: () => {
        isTransitioningRef.current = false;
        pendingLocationRef.current = null;
      },
    });
  }, []);

  useEffect(() => {
    displayLocationRef.current = displayLocation;
  }, [displayLocation]);

  useEffect(() => {
    if (isSameLocation(location, displayLocationRef.current)) {
      if (isTransitioningRef.current) {
        pendingLocationRef.current = displayLocationRef.current;
      }

      return;
    }

    if (!shouldUsePageTransition(toUrl(location), toUrl(displayLocationRef.current))) {
      pendingLocationRef.current = null;
      displayLocationRef.current = location;
      setDisplayLocation(location);
      return;
    }

    pendingLocationRef.current = location;
    setPageTransitionDirection(nextTransitionDirectionRef.current);

    if (isTransitioningRef.current) {
      return;
    }

    const content = contentRef.current;
    isTransitioningRef.current = true;

    if (!content) {
      shouldRevealIncomingRef.current = true;
      setDisplayLocation(location);
      return;
    }

    gsap.killTweensOf(content);
    gsap.to(content, {
      autoAlpha: 0,
      filter: 'blur(14px)',
      scale: 0.992,
      duration: PAGE_EXIT_DURATION,
      ease: 'power2.out',
      onComplete: () => {
        setShowPageTransition(true);
      },
    });
  }, [location]);

  useLayoutEffect(() => {
    if (!shouldRevealIncomingRef.current || !contentRef.current) {
      return;
    }

    shouldRevealIncomingRef.current = false;
    animateIncomingContent();
  }, [animateIncomingContent, displayLocation]);

  const handleTransitionComplete = useCallback(() => {
    const nextLocation = pendingLocationRef.current;

    setShowPageTransition(false);

    if (!nextLocation) {
      animateIncomingContent();
      return;
    }

    if (isSameLocation(nextLocation, displayLocationRef.current)) {
      pendingLocationRef.current = null;
      animateIncomingContent();
      return;
    }

    shouldRevealIncomingRef.current = true;
    setDisplayLocation(nextLocation);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [animateIncomingContent]);

  return (
    <div className="relative min-h-screen">
      <StaggeredMenu
        position="right"
        items={menuItems}
        heroMenuItems={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#14110f"
        openMenuButtonColor="#14110f"
        changeMenuColorOnOpen={true}
        colors={transitionColors}
        accentColor="#ff3b00"
        isFixed={true}
        footerMenuMode={isFooterMenuMode}
        footerMenuOpen={isFooterMenuOpen}
        onFooterMenuToggle={setIsFooterMenuOpen}
        heroNavigationActive={showHeroNavigation}
        heroContactHref="/contact"
        heroContactLabel="Contato"
        hideToggleButton={showHeroNavigation}
        scrollContrastActive={showScrollContrastMenu}
        onMenuOpen={() => setIsPrimaryMenuOpen(true)}
        onMenuClose={() => setIsPrimaryMenuOpen(false)}
        logo={
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span
              className="menu-logo-text"
              style={{
                fontWeight: 300,
                fontStyle: 'normal',
                color: '#14110f',
                letterSpacing: 0,
                lineHeight: 1,
              }}
            >
              studiodesign
            </span>
          </Link>
        }
      />

      <div ref={contentRef} className="relative z-20">
        <AppContent
          routeLocation={displayLocation}
          onFooterModeChange={setIsFooterMenuMode}
        />
      </div>

      {showPageTransition && (
        <PageTransition
          colors={transitionColors}
          direction={pageTransitionDirection}
          onComplete={handleTransitionComplete}
        />
      )}
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    window.__studioLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (window.__studioLenis === lenis) {
        delete window.__studioLenis;
      }

      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
