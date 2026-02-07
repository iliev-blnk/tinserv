import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import VideoShowcase from './components/VideoShowcase';
import Footer from './components/Footer';
import Registration from './pages/Registration';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageToggle from './components/LanguageToggle';

function MainLayout() {
  return (
    <>
      <LanguageToggle />
      <Hero />
      <VideoShowcase />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/inscriere" element={<Registration />} />
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;