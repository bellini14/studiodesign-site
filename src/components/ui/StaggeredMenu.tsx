import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  heroMenuItems?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logo?: React.ReactNode;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  isHidden?: boolean;
  footerMenuMode?: boolean;
  footerMenuOpen?: boolean;
  onFooterMenuToggle?: (open: boolean) => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  heroNavigationActive?: boolean;
  heroContactHref?: string;
  heroContactLabel?: string;
  hideToggleButton?: boolean;
  scrollContrastActive?: boolean;
}

const isExternalLink = (link: string) => /^(https?:)?\/\//.test(link);

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#f6cdb6', '#ff8b68', '#ff3b00'],
  items = [],
  heroMenuItems,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logo,
  logoUrl,
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#ff3b00',
  isFixed = false,
  closeOnClickAway = true,
  isHidden = false,
  footerMenuMode = false,
  footerMenuOpen = false,
  onFooterMenuToggle,
  onMenuOpen,
  onMenuClose,
  heroNavigationActive = false,
  heroContactHref = '/contact',
  heroContactLabel = 'Contato',
  hideToggleButton = false,
  scrollContrastActive = false,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) {
        return;
      }

      const preLayers = preContainer
        ? (Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[])
        : [];

      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });

      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) {
      return null;
    }

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const offscreen = position === 'left' ? -100 : 100;

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }

    if (numberEls.length) {
      gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
    }

    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }

    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        { xPercent: 0, duration: 0.5, ease: 'power4.out' },
        index * 0.07
      );
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            ['--sm-num-opacity' as any]: 1,
            stagger: { each: 0.08, from: 'start' },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }

      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;
    const tl = buildOpenTimeline();

    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback('onComplete', () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback((instant = false) => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) {
      return;
    }

    const offscreen = position === 'left' ? -100 : 100;
    const all = [...layers, panel];

    closeTweenRef.current?.kill();

    const resetPanelContent = () => {
      const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
      const numberEls = Array.from(
        panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
      ) as HTMLElement[];
      const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
      const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

      if (itemEls.length) {
        gsap.set(itemEls, { yPercent: 140, rotate: 10 });
      }

      if (numberEls.length) {
        gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
      }

      if (socialTitle) {
        gsap.set(socialTitle, { opacity: 0 });
      }

      if (socialLinks.length) {
        gsap.set(socialLinks, { y: 25, opacity: 0 });
      }

      busyRef.current = false;
    };

    if (instant) {
      gsap.set(all, { xPercent: offscreen, overwrite: true });
      resetPanelContent();
      return;
    }

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: resetPanelContent,
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;

    if (!icon || !h || !v) {
      return;
    }

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
      return;
    }

    spinTweenRef.current = gsap
      .timeline({ defaults: { ease: 'power3.inOut' } })
      .to(h, { rotate: 0, duration: 0.35 }, 0)
      .to(v, { rotate: 90, duration: 0.35 }, 0)
      .to(icon, { rotate: 0, duration: 0.001 }, 0);
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;

      if (!btn) {
        return;
      }

      colorTweenRef.current?.kill();

      if (!changeMenuColorOnOpen) {
        gsap.set(btn, { color: menuButtonColor });
        return;
      }

      colorTweenRef.current = gsap.to(btn, {
        color: opening ? openMenuButtonColor : menuButtonColor,
        delay: 0.18,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]
  );

  useEffect(() => {
    const btn = toggleBtnRef.current;

    if (!btn) {
      return;
    }

    if (changeMenuColorOnOpen) {
      gsap.set(btn, { color: openRef.current ? openMenuButtonColor : menuButtonColor });
      return;
    }

    gsap.set(btn, { color: menuButtonColor });
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;

    if (!inner) {
      return;
    }

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const sequence = [currentLabel];
    let last = currentLabel;

    for (let index = 0; index < 3; index += 1) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      sequence.push(last);
    }

    if (last !== targetLabel) {
      sequence.push(targetLabel);
    }

    sequence.push(targetLabel);

    setTextLines(sequence);
    gsap.set(inner, { yPercent: 0 });

    const finalShift = ((sequence.length - 1) / sequence.length) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + sequence.length * 0.07,
      ease: 'power4.out',
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (footerMenuMode) {
      if (openRef.current) {
        openRef.current = false;
        setOpen(false);
        onMenuClose?.();
        playClose();
        animateIcon(false);
        animateColor(false);
        animateText(false);
        return;
      }

      const next = !footerMenuOpen;
      onFooterMenuToggle?.(next);
      animateIcon(next);
      animateColor(next);
      animateText(next);
      return;
    }

    const next = !openRef.current;
    openRef.current = next;
    setOpen(next);

    if (next) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(next);
    animateColor(next);
    animateText(next);
  }, [
    animateColor,
    animateIcon,
    animateText,
    footerMenuMode,
    footerMenuOpen,
    onFooterMenuToggle,
    onMenuClose,
    onMenuOpen,
    playClose,
    playOpen,
  ]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) {
      return;
    }

    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [
    animateColor,
    animateIcon,
    animateText,
    footerMenuMode,
    onMenuClose,
    playClose,
  ]);

  useEffect(() => {
    if (isHidden) {
      closeMenu();
    }
  }, [closeMenu, isHidden]);

  useEffect(() => {
    if (!footerMenuMode && footerMenuOpen) {
      onFooterMenuToggle?.(false);
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [
    animateColor,
    animateIcon,
    animateText,
    footerMenuMode,
    footerMenuOpen,
    onFooterMenuToggle,
  ]);

  useEffect(() => {
    if (!closeOnClickAway || !open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu, closeOnClickAway, open]);

  const wrapperStyle = accentColor
    ? ({ ['--sm-accent' as string]: accentColor } as React.CSSProperties)
    : undefined;
  const preLayerPalette = (() => {
    const raw = colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
    const palette = [...raw];

    if (palette.length >= 3) {
      palette.splice(Math.floor(palette.length / 2), 1);
    }

    return palette;
  })();

  const renderMenuEntry = (item: StaggeredMenuItem, index: number) => {
    const itemClasses =
      'sm-panel-item relative inline-block cursor-pointer pr-[1.4em] text-[clamp(2.75rem,7vw,4rem)] font-semibold uppercase leading-none tracking-[-0.06em] text-black no-underline transition-colors duration-150 ease-linear';
    const label = (
      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
        {item.label}
      </span>
    );

    if (isExternalLink(item.link)) {
      return (
        <a
          className={itemClasses}
          href={item.link}
          aria-label={item.ariaLabel}
          data-index={index + 1}
          onClick={closeMenu}
          rel="noreferrer"
          target="_blank"
        >
          {label}
        </a>
      );
    }

    return (
      <Link
        className={itemClasses}
        to={item.link}
        aria-label={item.ariaLabel}
        data-index={index + 1}
        onClick={closeMenu}
      >
        {label}
      </Link>
    );
  };

  const inlineMenuItems = heroMenuItems?.length ? heroMenuItems : items;

  const renderInlineMenuEntry = (item: StaggeredMenuItem, index: number) => {
    const itemClasses =
      'sm-hero-nav-link relative inline-flex items-center justify-center whitespace-nowrap no-underline';

    if (isExternalLink(item.link)) {
      return (
        <a
          key={`${item.label}-${index}`}
          className={itemClasses}
          href={item.link}
          aria-label={item.ariaLabel}
          rel="noreferrer"
          target="_blank"
        >
          <span>{item.label}</span>
        </a>
      );
    }

    return (
      <Link
        key={`${item.label}-${index}`}
        className={itemClasses}
        to={item.link}
        aria-label={item.ariaLabel}
      >
        <span>{item.label}</span>
      </Link>
    );
  };

  const closeFooterMenu = () => {
    onFooterMenuToggle?.(false);
    animateIcon(false);
    animateColor(false);
    animateText(false);
  };

  const footerMenuPanelStyle = {
    maxWidth: footerMenuOpen && footerMenuMode ? 'calc(100vw - (var(--site-gutter-menu) * 2))' : '0px',
    opacity: footerMenuOpen ? 1 : 0,
    transition: 'max-width 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease-out',
  } as React.CSSProperties;

  return (
    <div
      className={`sm-scope z-40 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      } ${isFixed ? 'fixed inset-0 overflow-hidden pointer-events-none' : 'h-full w-full'}`}
      aria-hidden={isHidden}
      data-hidden={isHidden || undefined}
      data-scroll-contrast={scrollContrastActive || undefined}
    >
      <div
        className={`${className ? `${className} ` : ''}staggered-menu-wrapper relative z-40 h-full w-full pointer-events-none`}
        style={wrapperStyle}
        data-open={open || undefined}
        data-position={position}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers pointer-events-none absolute top-0 bottom-0 z-[5]"
          aria-hidden="true"
        >
          {preLayerPalette.map((color, index) => (
            <div
              key={`${color}-${index}`}
              className="sm-prelayer absolute top-0 h-full w-full translate-x-0"
              style={{ background: color }}
            />
          ))}
        </div>

        <header
          className="staggered-menu-header pointer-events-none absolute left-0 top-0 z-20 flex w-full items-end justify-between"
          aria-label="Main navigation header"
        >
          <div
            className={`sm-logo flex select-none items-center transition-opacity duration-300 ${
              footerMenuMode ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
            }`}
            aria-label="Logo"
            aria-hidden={footerMenuMode}
          >
            {logo ? (
              logo
            ) : (
              <img
                src={logoUrl}
                alt="Logo"
                className="sm-logo-img block h-8 w-auto object-contain"
                draggable={false}
                width={110}
                height={24}
              />
            )}
          </div>

          <nav
            className={`sm-hero-nav absolute left-1/2 bottom-0 flex -translate-x-1/2 items-center justify-center gap-8 xl:gap-10 ${
              heroNavigationActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!heroNavigationActive}
            aria-label="Hero navigation"
          >
            {inlineMenuItems.map((item, index) => renderInlineMenuEntry(item, index))}
          </nav>

          <Link
            to={heroContactHref}
            className={`sm-hero-contact no-underline ${
              heroNavigationActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!heroNavigationActive}
            aria-label={heroContactLabel}
          >
            <span>{heroContactLabel}</span>
          </Link>

          <div className="pointer-events-none relative ml-auto flex min-h-[2.75rem] items-center justify-end">
            <nav
              id="footer-menu-links"
              className={`absolute right-0 top-1/2 z-10 flex max-w-[calc(100vw-(var(--site-gutter-menu)*2))] -translate-y-1/2 items-center overflow-hidden pr-[7rem] ${
                footerMenuOpen && footerMenuMode ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              style={footerMenuPanelStyle}
              aria-hidden={!footerMenuOpen || !footerMenuMode}
              aria-label="Footer navigation"
            >
              <div className="flex items-center gap-4 whitespace-nowrap">
                {items.map((item, index) =>
                  isExternalLink(item.link) ? (
                    <a
                      key={`${item.label}-${index}`}
                      href={item.link}
                      aria-label={item.ariaLabel}
                      className="group relative block text-base font-medium leading-none text-secondary transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                      onClick={closeFooterMenu}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                    </a>
                  ) : (
                    <Link
                      key={`${item.label}-${index}`}
                      to={item.link}
                      aria-label={item.ariaLabel}
                      className="group relative block text-base font-medium leading-none text-secondary transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                      onClick={closeFooterMenu}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                    </Link>
                  )
                )}
              </div>
            </nav>

            <button
              ref={toggleBtnRef}
              className={`sm-toggle relative z-20 inline-flex cursor-pointer items-center justify-end gap-2 border-0 bg-transparent p-0 font-medium leading-none ${
                hideToggleButton ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
              }`}
              aria-controls={footerMenuMode ? 'footer-menu-links' : 'staggered-menu-panel'}
              aria-expanded={footerMenuMode ? footerMenuOpen : open}
              aria-label={(footerMenuMode ? footerMenuOpen : open) ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
              type="button"
            >
              <span
                className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap text-right"
                aria-hidden="true"
              >
                <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                  {textLines.map((line, index) => (
                    <span className="sm-toggle-line block h-[1em] leading-none" key={`${line}-${index}`}>
                      {line}
                    </span>
                  ))}
                </span>
              </span>

              <span
                ref={iconRef}
                className="sm-icon relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center [will-change:transform]"
                aria-hidden="true"
              >
                <span
                  ref={plusHRef}
                  className="sm-icon-line absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current [will-change:transform]"
                />
                <span
                  ref={plusVRef}
                  className="sm-icon-line absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current [will-change:transform]"
                />
              </span>
            </button>
          </div>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel pointer-events-auto absolute top-0 z-10 flex h-full flex-col overflow-y-auto bg-white p-[6.5rem_1.5rem_2rem] md:p-[7.5rem_2rem_2rem]"
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex flex-1 flex-col gap-6">
            <ul
              className="sm-panel-list m-0 flex list-none flex-col gap-3 p-0"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items.length ? (
                items.map((item, index) => (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={`${item.label}-${index}`}>
                    {renderMenuEntry(item, index)}
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span className="sm-panel-item relative inline-block pr-[1.4em] text-[clamp(2.75rem,7vw,4rem)] font-semibold uppercase leading-none tracking-[-0.06em] text-black">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials mt-auto flex flex-col gap-3 pt-8" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#ff3b00)]">
                  Socials
                </h3>
                <ul className="sm-socials-list m-0 flex list-none flex-wrap items-center gap-4 p-0" role="list">
                  {socialItems.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="sm-socials-item">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link relative inline-block py-[2px] text-[1.05rem] font-medium text-[#111] no-underline transition-[color,opacity] duration-300 ease-linear"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
.sm-scope[data-hidden='true'] * { pointer-events: none !important; }
.sm-scope .staggered-menu-header { top: 1rem; height: 5.75rem; padding-inline: var(--site-gutter-menu); padding-bottom: var(--sm-hero-baseline-offset); box-sizing: border-box; }
.sm-scope .sm-logo { min-height: 2.75rem; transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.sm-scope .sm-logo a { display: inline-flex; align-items: center; min-height: 2.75rem; line-height: 1; transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.sm-scope .sm-logo .menu-logo-text { font-size: 2.35rem; }
.sm-scope .sm-toggle { min-height: 2.75rem; min-width: 6.2rem; font-size: 1.125rem; letter-spacing: 0; }
.sm-scope .sm-toggle { transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.sm-scope .sm-toggle[aria-expanded='false'] { transform: translateY(0); }
.sm-scope .sm-toggle-textWrap { width: 3.55rem; }
.sm-scope .sm-toggle:focus-visible, .sm-scope .sm-panel-item:focus-visible, .sm-scope .sm-socials-link:focus-visible, .sm-scope .sm-logo a:focus-visible { outline: 2px solid var(--sm-accent, #ff3b00); outline-offset: 4px; }
.sm-scope .sm-icon-line:last-child { transform: translate(-50%, -50%) rotate(90deg); }
.sm-scope .staggered-menu-panel { width: clamp(280px, 38vw, 430px); right: 0; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: none; }
.sm-scope [data-position='left'] .staggered-menu-panel { left: 0; right: auto; box-shadow: none; }
.sm-scope .sm-prelayers { width: clamp(280px, 38vw, 430px); right: 0; }
.sm-scope [data-position='left'] .sm-prelayers { left: 0; right: auto; }
.sm-scope .sm-prelayer { right: 0; }
.sm-scope [data-position='left'] .sm-prelayer { left: 0; right: auto; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-link:hover, .sm-scope .sm-socials-link:focus-visible, .sm-scope .sm-panel-item:hover, .sm-scope .sm-panel-item:focus-visible { color: var(--sm-accent, #ff3b00); }
.sm-scope[data-scroll-contrast='true'] .staggered-menu-header {
  mix-blend-mode: difference;
}
.sm-scope[data-scroll-contrast='true'] .sm-logo,
.sm-scope[data-scroll-contrast='true'] .sm-logo a,
.sm-scope[data-scroll-contrast='true'] .sm-logo .menu-logo-text,
.sm-scope[data-scroll-contrast='true'] .sm-toggle {
  color: #ffffff !important;
  opacity: 0.92;
  filter: none;
}
.sm-scope[data-scroll-contrast='true'] .sm-toggle:hover,
.sm-scope[data-scroll-contrast='true'] .sm-toggle:focus-visible,
.sm-scope[data-scroll-contrast='true'] .sm-logo a:hover,
.sm-scope[data-scroll-contrast='true'] .sm-logo a:focus-visible {
  opacity: 1;
}
.sm-scope .staggered-menu-header { --sm-hero-baseline-offset: 1.5rem; }
.sm-scope .sm-hero-nav { bottom: var(--sm-hero-baseline-offset); transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s cubic-bezier(0.22, 1, 0.36, 1); filter: blur(0px); }
.sm-scope .sm-hero-nav[aria-hidden='true'] { transform: translate(-50%, -12px); filter: blur(8px); }
.sm-scope .sm-hero-nav-link, .sm-scope .sm-hero-nav-link span, .sm-scope .sm-hero-contact, .sm-scope .sm-hero-contact span { font-family: "mokoko-variable", "Mokoko Variable", "Mokoko VF", "Mokoko", serif !important; font-weight: 420 !important; font-style: normal !important; font-variation-settings: "wght" 420; letter-spacing: -0.028em; line-height: 1; color: #14110f; }
.sm-scope .sm-hero-nav-link { font-size: 18px; padding-bottom: 0.6rem; transition: color 0.28s ease; }
.sm-scope .sm-hero-nav-link::after { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background: currentColor; transform: scaleX(0); transform-origin: 0 50%; transition: transform 0.56s cubic-bezier(0.19, 1, 0.22, 1); }
.sm-scope .sm-hero-nav-link:hover, .sm-scope .sm-hero-nav-link:focus-visible { color: var(--sm-accent, #ff3b00); outline: none; }
.sm-scope .sm-hero-nav-link:hover::after, .sm-scope .sm-hero-nav-link:focus-visible::after { transform: scaleX(1); }
.sm-scope .sm-hero-contact { position: absolute; right: var(--site-gutter-menu); bottom: var(--sm-hero-baseline-offset); display: inline-flex; flex-direction: column; align-items: flex-end; justify-content: center; padding-bottom: 0.6rem; transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s cubic-bezier(0.22, 1, 0.36, 1); filter: blur(0px); }
.sm-scope .sm-hero-contact[aria-hidden='true'] { transform: translateY(-10px); filter: blur(6px); }
.sm-scope .sm-hero-contact span { font-size: 18px; }
.sm-scope .sm-hero-contact::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 2px; background: currentColor; transform: scaleX(0); transform-origin: 0 50%; transition: transform 0.56s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.32s ease; }
.sm-scope .sm-hero-contact:hover::after, .sm-scope .sm-hero-contact:focus-visible::after { transform: scaleX(1); }
.sm-scope .sm-hero-contact:hover, .sm-scope .sm-hero-contact:focus-visible { color: var(--sm-accent, #ff3b00); outline: none; }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.18em; right: 0; font-size: 0.95rem; font-weight: 500; color: var(--sm-accent, #ff3b00); opacity: var(--sm-num-opacity, 0); letter-spacing: 0; pointer-events: none; }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: min(100vw, 430px); } }
@media (max-width: 1024px) { .sm-scope .staggered-menu-header { top: 0.85rem; height: 5.25rem; padding-inline: var(--site-gutter-menu); --sm-hero-baseline-offset: 1.35rem; } .sm-scope .sm-logo .menu-logo-text { font-size: 2.1rem; } .sm-scope .sm-hero-nav { display: none !important; } .sm-scope .sm-hero-contact { display: none !important; } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100vw; } .sm-scope .staggered-menu-header { top: 0.65rem; height: 4.75rem; padding-inline: max(1.125rem, calc(var(--site-gutter-menu) - 0.4rem)); --sm-hero-baseline-offset: 1.15rem; } .sm-scope .sm-logo .menu-logo-text { font-size: 1.75rem; } .sm-scope .sm-toggle { min-width: 5.4rem; font-size: 0.95rem; } .sm-scope .sm-toggle-textWrap { width: 3.1rem; } .sm-scope .sm-icon { height: 16px; width: 16px; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
