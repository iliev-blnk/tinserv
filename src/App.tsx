import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import VideoShowcase from './components/VideoShowcase';
import Footer from './components/Footer';
import Registration from './pages/Registration';
import Admin from './pages/Admin';
import { LanguageProvider } from './contexts/LanguageContext';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <VideoShowcase />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <div className="min-h-screen bg-[#171717]">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;