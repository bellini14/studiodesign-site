import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lenis from 'lenis';
import BubbleMenu from './components/ui/BubbleMenu';
import ScrollToTop from './components/layout/ScrollToTop';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';

const items = [
  {
    label: "home",
    href: "/",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#FFFFFF" }
  },
  {
    label: "about",
    href: "/about",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#FFFFFF" }
  },
  {
    label: "serviços",
    href: "/services",
    ariaLabel: "Serviços",
    rotation: 8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#FFFFFF" }
  },
  {
    label: "portfólio",
    href: "/portfolio",
    ariaLabel: "Portfólio",
    rotation: -8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#FFFFFF" }
  },
  {
    label: "contato",
    href: "/contact",
    ariaLabel: "Contato",
    rotation: 8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#FFFFFF" }
  }
];

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen relative">
        <BubbleMenu
          logo={
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="menu-logo-text" style={{
                fontWeight: 300,
                fontStyle: 'normal',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                fontSize: '2.5rem'
              }}>studiodesign</span>
            </Link>
          }
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#FFFFFF"
          menuContentColor="#0a0a0a"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
          contatoHref="/contact"
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
