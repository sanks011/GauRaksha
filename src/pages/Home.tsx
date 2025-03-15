import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../components/AuthModal';
import { useAuth } from '../lib/auth';


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (user) {
      navigate(path); // If logged in, go to the page
    } else {
      setRedirectPath(path); // Store the intended path
      setIsAuthModalOpen(true); // Open login modal
    }
  };


  useEffect(() => {
    // Add scroll event listener for navbar transparency
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('bg-opacity-95');
        } else {
          navbar.classList.remove('bg-opacity-95');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="antialiased text-gray-800 min-h-screen flex flex-col">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" 
         className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black">
         Skip to main content
      </a>

      {/* Navigation */}
      <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold">GauRaksha</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#hero" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#about" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#breedingNetwork" 
                 onClick={() => handleNavigation('/breeding-network')}
                className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Breeding Network</a>
                <a href="#protectionInitiatives" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Protection</a>
                <a href="#resourceCenter"
                 onClick={() => handleNavigation('/education')} 
                className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Resources</a>
                <a href="#reportingPortal" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Report</a>
                <a href="#communityForum" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Community</a>
                <a href="#contact" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-neutral-700 focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className="block" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-neutral-800`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#hero" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#about" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#breedingNetwork" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Breeding Network</a>
            <a href="#protectionInitiatives" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Protection</a>
            <a href="#resourceCenter" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Resources</a>
            <a href="#reportingPortal" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Report</a>
            <a href="#communityForum" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Community</a>
            <a href="#contact" className="block bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main id="main-content" className="flex-1 relative">
        {/* Hero Section */}
        <section id="hero" className="relative bg-neutral-900 text-white min-h-screen flex items-center pt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-90"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate__animated animate__fadeInLeft">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Reviving India's  <br />
                  <span className="text-green-500">Indigenous Cow Breeds</span>
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                  Join our mission to preserve and protect India's native cattle breeds through sustainable breeding programs and community engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#breedingNetwork" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-center transition-all duration-300 transform hover:scale-105">
                    Join Breeding Network
                  </a>
                  <a href="#reportingPortal" className="bg-transparent border-2 border-white hover:bg-white hover:text-neutral-900 text-white font-bold py-3 px-8 rounded-full text-center transition-all duration-300">
                    Report Incidents
                  </a>
                </div>
              </div>
              <div className="animate__animated animate__fadeInRight">
                <div className="relative">
                  <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-full w-72 h-72 md:w-96 md:h-96 mx-auto flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-4xl font-bold mb-4">30+</div>
                      <div className="text-lg">Native Breeds Protected</div>
                      <div className="mt-4 text-4xl font-bold">5000+</div>
                      <div className="text-lg">Registered Farmers</div>
                      <div className="mt-4 text-4xl font-bold">100+</div>
                      <div className="text-lg">Success Stories</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <a href="#about" className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Preserving India's Heritage</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Mission */}
              <div className="bg-neutral-50 rounded-lg p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
                <div className="text-green-600 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h3>
                <p className="text-neutral-700">To revive and protect indigenous Indian cow breeds through sustainable breeding programs and community engagement.</p>
              </div>

              {/* Impact */}
              <div className="bg-neutral-50 rounded-lg p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp" style={{animationDelay: "0.2s"}}>
                <div className="text-green-600 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Impact</h3>
                <p className="text-neutral-700">Connected over 5,000 farmers, protected 30+ indigenous breeds, and created a sustainable ecosystem for native cattle.</p>
              </div>

              {/* Vision */}
              <div className="bg-neutral-50 rounded-lg p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp" style={{animationDelay: "0.4s"}}>
                <div className="text-green-600 mb-4">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Our Vision</h3>
                <p className="text-neutral-700">Creating a future where indigenous cow breeds thrive and contribute to sustainable agriculture and rural prosperity.</p>
              </div>
            </div>

            <div className="mt-20 bg-neutral-50 rounded-lg p-8 shadow-lg animate__animated animate__fadeInUp">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-6">Why Indigenous Breeds Matter</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-neutral-700">
                      <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Climate-resilient and adaptable to local conditions
                    </li>
                    <li className="flex items-center text-neutral-700">
                      <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      High-quality A2 milk with medicinal properties
                    </li>
                    <li className="flex items-center text-neutral-700">
                      <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Essential for organic farming and sustainable agriculture
                    </li>
                    <li className="flex items-center text-neutral-700">
                      <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      Cultural heritage and biodiversity preservation
                    </li>
                  </ul>
                </div>
                <div className="bg-green-600 rounded-lg p-8 text-white">
                  <h4 className="text-2xl font-bold mb-4">Join Our Movement</h4>
                  <p className="mb-6">Be part of the solution in preserving India's indigenous cow breeds for future generations.</p>
                  <a href="#breedingNetwork" className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-full hover:bg-neutral-100 transition-colors duration-300">Get Started</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breeding Network Section */}
        <section id="breedingNetwork" className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold mb-4">Breeding Network Platform</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
              <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">Connect with verified farmers and breeders to preserve and strengthen indigenous cow breeds</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-neutral-800 rounded-lg p-8 animate__animated animate__fadeInLeft">
                <h3 className="text-2xl font-bold mb-6">Find Breeding Partners</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cow Breed</label>
                    <select className="w-full bg-neutral-700 rounded-lg px-4 py-2 text-white">
                      <option>Gir</option>
                      <option>Sahiwal</option>
                      <option>Tharparkar</option>
                      <option>Red Sindhi</option>
                      <option>Rathi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input type="text" className="w-full bg-neutral-700 rounded-lg px-4 py-2" placeholder="Enter your district" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Range (km)</label>
                    <input type="range" min="1" max="100" defaultValue="50" className="w-full" />
                    <div className="text-sm text-neutral-400 mt-1">50 km</div>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    Search Partners
                  </button>
                </form>
              </div>

              <div className="space-y-6 animate__animated animate__fadeInRight">
                <div className="bg-neutral-800 rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-4">Verified Breeding Process</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Health certification
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Breed authenticity verification
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Expert supervision
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-800 rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-4">Platform Benefits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Access to quality breeding partners
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Veterinary support
                    </li>
                    <li className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Documentation assistance
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center animate__animated animate__fadeIn">
              <div className="bg-neutral-800 rounded-lg p-8 inline-block">
                <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
                <p className="mb-6 text-neutral-300">Register your farm or cattle and become part of India's largest indigenous breeding network</p>
                <button
                onClick={() => setIsAuthModalOpen(true)}
                 className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Protection Initiatives Section */}
        <section id="protectionInitiatives" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Protection Initiatives</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
              <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">Working together to safeguard our indigenous cattle through active community participation</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="animate__animated animate__fadeInLeft">
                <div className="bg-neutral-100 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">Alert System</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-600 p-3 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-neutral-900">Real-time Alerts</h4>
                        <p className="text-neutral-600">Instant notifications about suspicious activities in your area</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-green-600 p-3 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-neutral-900">Community Network</h4>
                        <p className="text-neutral-600">Connected network of vigilant community members</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate__animated animate__fadeInRight">
                <div className="bg-neutral-900 text-white rounded-lg p-8">
                  <h3 className="text-2xl font-bold mb-6">Report Incidents</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Incident Type</label>
                      <select className="w-full bg-neutral-800 rounded-lg px-4 py-2">
                        <option>Illegal Transportation</option>
                        <option>Animal Abuse</option>
                        <option>Unauthorized Trading</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input type="text" className="w-full bg-neutral-800 rounded-lg px-4 py-2" placeholder="Enter incident location" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea className="w-full bg-neutral-800 rounded-lg px-4 py-2 h-24" placeholder="Describe the incident"></textarea>
                    </div>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                      Submit Report
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 animate__animated animate__fadeInUp">
              <div className="bg-neutral-100 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-neutral-900 font-semibold">Emergency Response</div>
              </div>
              <div className="bg-neutral-100 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-neutral-900 font-semibold">Cases Resolved</div>
              </div>
              <div className="bg-neutral-100 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-neutral-900 font-semibold">Active Volunteers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Resource Center Section */}
        <section id="resourceCenter" className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold mb-4">Resource Center</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
              <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">Access comprehensive resources for indigenous cow breeding and care</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Educational Resources */}
              <div className="bg-neutral-800 rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
                <h3 className className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  Educational Materials
                </h3>
                <ul className="space-y-3 text-neutral-300">
                  <li>• Breed identification guides</li>
                  <li>• Healthcare manuals</li>
                  <li>• Breeding techniques</li>
                  <li>• Nutrition guidelines</li>
                </ul>
                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Access Library
                </button>
              </div>

              {/* Training Programs */}
              <div className="bg-neutral-800 rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp" style={{animationDelay: "0.2s"}}>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  Training Programs
                </h3>
                <ul className="space-y-3 text-neutral-300">
                  <li>• Online workshops</li>
                  <li>• Expert webinars</li>
                  <li>• Practical sessions</li>
                  <li>• Certification courses</li>
                </ul>
                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  View Schedule
                </button>
              </div>

              {/* Research & Data */}
              <div className="bg-neutral-800 rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp" style={{animationDelay: "0.4s"}}>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Research & Analytics
                </h3>
                <ul className="space-y-3 text-neutral-300">
                  <li>• Breed statistics</li>
                  <li>• Research papers</li>
                  <li>• Success stories</li>
                  <li>• Impact reports</li>
                </ul>
                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Explore Data
                </button>
              </div>
            </div>

            {/* Featured Resources */}
            <div className="bg-neutral-800 rounded-lg p-8 animate__animated animate__fadeIn">
              <h3 className="text-2xl font-bold mb-6">Featured Resources</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-neutral-700 rounded-lg p-4 flex items-center">
                  <div className="bg-green-600 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Video Series: Indigenous Breeding Techniques</h4>
                    <p className="text-neutral-400 text-sm">12 Episodes • 6 Hours</p>
                  </div>
                </div>
                <div className="bg-neutral-700 rounded-lg p-4 flex items-center">
                  <div className="bg-green-600 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">E-Book: Complete Guide to Cow Care</h4>
                    <p className="text-neutral-400 text-sm">PDF • 250 Pages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting Portal Section */}
        <section id="reportingPortal" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Incident Reporting Portal</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
              <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">Help protect indigenous cows by reporting suspicious activities and illegal trafficking</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Reporting Form */}
              <div className="bg-neutral-50 rounded-lg p-8 shadow-lg animate__animated animate__fadeInLeft">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Submit Report</h3>
                <form id="reportForm" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Incident Type*</label>
                      <select required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        <option value="">Select Type</option>
                        <option value="trafficking">Illegal Trafficking</option>
                        <option value="abuse">Animal Abuse</option>
                        <option value="smuggling">Cross-Border Smuggling</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Date & Time*</label>
                      <input type="datetime-local" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Location Details*</label>
                    <input type="text" required placeholder="Enter location or landmark" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Incident Description*</label>
                    <textarea required rows={4} placeholder="Describe what you witnessed" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Your Name</label>
                      <input type="text" placeholder="Optional" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Contact Number</label>
                      <input type="tel" placeholder="Optional" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Evidence Upload</label>
                    <input type="file" accept="image/*" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                  </div>

                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    Submit Report
                  </button>
                </form>
              </div>

              {/* Information Panel */}
              <div className="space-y-6 animate__animated animate__fadeInRight">
                <div className="bg-neutral-900 text-white rounded-lg p-8">
                  <h3 className="text-xl font-bold mb-4">Emergency Contacts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <span>Helpline: 1800-XXX-XXXX</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <span>Email: support@gauraksha.org</span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Report Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-green-600">
                      <span className="font-bold mr-2">1,234</span>
                      Reports Resolved
                    </div>
                    <div className="flex items-center text-yellow-600">
                      <span className="font-bold mr-2">89</span>
                      Under Investigation
                    </div>
                    <div className="flex items-center text-blue-600">
                      <span className="font-bold mr-2">24/7</span>
                      Active Monitoring
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 text-white rounded-lg p-8">
                  <h3 className="text-xl font-bold mb-4">Why Report?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Prevent illegal trafficking
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Save indigenous breeds
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Support legal action
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Forum Section */}
        <section id="communityForum" className="py-20 bg-neutral-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold mb-4">Community Forum</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
              <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">Connect with farmers, experts, and enthusiasts to share knowledge and experiences</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Discussions */}
              <div className="lg:col-span-2 space-y-6 animate__animated animate__fadeInLeft">
                <div className="bg-neutral-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Recent Discussions</h3>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300">
                      New Topic
                    </button>
                  </div>

                  {/* Discussion Cards */}
                  <div className="space-y-4">
                    <div className="bg-neutral-700 rounded-lg p-4 hover:bg-neutral-600 transition duration-300 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold mb-2">Best practices for Gir cow breeding</h4>
                          <p className="text-neutral-300 text-sm mb-2">Looking for advice on maintaining pure Gir bloodline...</p>
                          <div className="flex items-center text-sm text-neutral-400">
                            <span className="mr-4">Posted by @RameshFarmer</span>
                            <span>23 replies</span>
                          </div>
                        </div>
                        <span className="bg-green-600 text-xs px-2 py-1 rounded">Featured</span>
                      </div>
                    </div>

                    <div className="bg-neutral-700 rounded-lg p-4 hover:bg-neutral-600 transition duration-300 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold mb-2">Healthcare tips for Sahiwal cows</h4>
                          <p className="text-neutral-300 text-sm mb-2">Sharing my experience with traditional remedies...</p>
                          <div className="flex items-center text-sm text-neutral-400">
                            <span className="mr-4">Posted by @VetDrKumar</span>
                            <span>45 replies</span>
                          </div>
                        </div>
                        <span className="bg-blue-600 text-xs px-2 py-1 rounded">Expert</span>
                      </div>
                    </div>

                    <div className="bg-neutral-700 rounded-lg p-4 hover:bg-neutral-600 transition duration-300 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold mb-2">Success story: Red Sindhi breeding program</h4>
                          <p className="text-neutral-300 text-sm mb-2">Our village's journey in preserving pure breeds...</p>
                          <div className="flex items-center text-sm text-neutral-400">
                            <span className="mr-4">Posted by @SureshDairy</span>
                            <span>67 replies</span>
                          </div>
                        </div>
                        <span className="bg-yellow-600 text-xs px-2 py-1 rounded">Success Story</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Sidebar */}
              <div className="space-y-6 animate__animated animate__fadeInRight">
                {/* Expert Connect */}
                <div className="bg-neutral-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Connect with Experts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-neutral-700 rounded-lg">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl font-bold">DK</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Dr. Kumar</h4>
                        <p className="text-sm text-neutral-400">Veterinary Expert</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-neutral-700 rounded-lg">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl font-bold">RS</span>
                      </div>
                      <div>
                        <h4 className="font-bold">Rajesh Singh</h4>
                        <p className="text-sm text-neutral-400">Breeding Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-neutral-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Community Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-neutral-700 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">5.2K</div>
                      <div className="text-sm text-neutral-400">Members</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-700 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">230</div>
                      <div className="text-sm text-neutral-400">Active Topics</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-700 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">18</div>
                      <div className="text-sm text-neutral-400">Experts</div>
                    </div>
                    <div className="text-center p-3 bg-neutral-700 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">89%</div>
                      <div className="text-sm text-neutral-400">Resolution Rate</div>
                    </div>
                  </div>
                </div>

                {/* Join Community */}
                <div className="bg-green-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
                  <p className="text-sm mb-4">Get access to exclusive resources and connect with experts</p>
                  <button
                   onClick={() => setIsAuthModalOpen(true)} 
                  className="w-full bg-white text-green-600 font-bold py-2 px-4 rounded-lg hover:bg-neutral-100 transition duration-300">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Get in Touch</h2>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
              <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">Have questions or want to join our mission? We're here to help!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-neutral-50 rounded-lg p-8 shadow-lg animate__animated animate__fadeInLeft">
                <form id="contactForm" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">First Name*</label>
                      <input type="text" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name*</label>
                      <input type="text" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address*</label>
                    <input type="email" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Subject*</label>
                    <select required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option value="">Select Subject</option>
                      <option value="breeding">Breeding Program</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Message*</label>
                    <textarea required rows={4} className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 animate__animated animate__fadeInRight">
                <div className="bg-neutral-900 text-white rounded-lg p-8">
                  <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-green-600 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-neutral-300">+91 1800-XXX-XXXX</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-green-600 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-neutral-300">contact@gauraksha.org</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-green-600 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-neutral-300">New Delhi, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">Operating Hours</h3>
                  <div className="space-y-2 text-neutral-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Emergency Support:</span>
                      <span>24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-neutral-900 text-white pt-20 pb-10 mt-20">
          <div className="container mx-auto px-4">
            {/* Footer content */}
            
            {/* Bottom Bar */}
            <div className="border-t border-neutral-800 pt-8 mt-8">
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="text-neutral-400 text-sm">
                  © 2024 GauRaksha. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm text-neutral-400 md:justify-end">
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>   
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {
          navigate(redirectPath); // Redirect after login
        }}
      />
    </div>
  );
}