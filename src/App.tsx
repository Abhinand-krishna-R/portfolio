import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';
import IntroSequence from './components/layout/IntroSequence';

const App: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen text-neutral-400 font-sans selection:bg-blue-500/20 selection:text-blue-200">
        {!introComplete && (
          <IntroSequence onComplete={() => setIntroComplete(true)} />
        )}
        
        {/* Dynamic Global Navigation Bar */}
        <Navbar loadReady={introComplete} />

        {/* Dynamic Page Views */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home pageReady={introComplete} />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Dynamic Global Footer */}
        <Footer />
        
      </div>
    </Router>
  );
};

export default App;
