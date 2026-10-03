import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Camp from './components/Camp';
import HowItWorks from './components/HowItWorks';
import VideoShowcase from './components/VideoShowcase';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Secondary pages load on demand, so the home page ships less JavaScript.
const Registration = lazy(() => import('./pages/Registration'));
const Donate = lazy(() => import('./pages/Donate'));
const Admin = lazy(() => import('./pages/Admin'));

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Camp />
        <HowItWorks />
        <VideoShowcase />
      </main>
      <Footer />
    </>
  );
}

// The router keeps the old scroll position between pages; start each page at the top
// (unless the link points at a section).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  const { language } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col items-start justify-center gap-6 px-5 sm:px-8 mx-auto max-w-7xl">
      <h1 className="font-black-heading text-6xl text-white">404</h1>
      <p className="text-paper/70">{language === 'ro' ? 'Pagina nu există.' : 'Страница не найдена.'}</p>
      <Link to="/" className="link text-paper">{language === 'ro' ? 'Înapoi acasă' : 'На главную'}</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-night">
          <Suspense fallback={<div className="min-h-screen bg-night" />}>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/inscriere" element={<Registration />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/doneaza" element={<Donate />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
