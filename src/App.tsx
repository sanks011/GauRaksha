import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CowRegistry from './pages/CowRegistry';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthModal } from './components/AuthModal';

function App() {
  return (
    <Router>
      <div className="antialiased text-gray-800 min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-1 relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cow-registry"
              element={
                <PrivateRoute>
                  <CowRegistry />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
