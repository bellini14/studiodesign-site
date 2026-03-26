import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
    hoverStyles: { bgColor: "#ff3b00", textColor: "#f6f4d3" }
  },
  {
    label: "about",
    href: "/about",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#f6f4d3" }
  },
  {
    label: "serviços",
    href: "/services",
    ariaLabel: "Serviços",
    rotation: 8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#f6f4d3" }
  },
  {
    label: "portfólio",
    href: "/portfolio",
    ariaLabel: "Portfólio",
    rotation: -8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#f6f4d3" }
  },
  {
    label: "contato",
    href: "/contact",
    ariaLabel: "Contato",
    rotation: 8,
    hoverStyles: { bgColor: "#ff3b00", textColor: "#f6f4d3" }
  }
];

function App() {
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
                color: '#ff3b00',
                letterSpacing: '-0.02em',
                fontSize: '2.5rem'
              }}>studiodesign</span>
            </Link>
          }
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#f6f4d3"
          menuContentColor="#181616"
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
