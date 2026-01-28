import React, { useRef, useState, useEffect } from 'react';
import FeedItem from './components/FeedItem';
import AuthModal from './components/AuthModal';
import ShareModal from './components/ShareModal';
import SpecsDrawer from './components/SpecsDrawer';
import { MOCK_CARS } from './constants';
import { Car } from './types';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // App State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  // Specs Drawer State
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [selectedCarForSpecs, setSelectedCarForSpecs] = useState<Car | null>(null);

  // Intersection Observer to track which car is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    const children = containerRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => observer.observe(child as Element));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handlers
  const handleContact = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      alert("Opening chat with seller...");
    }
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleShowSpecs = (car: Car) => {
    setSelectedCarForSpecs(car);
    setIsSpecsOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden font-sans">
      
      {/* Main Scroll Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth"
      >
        {MOCK_CARS.map((car, index) => (
          <div 
            key={car.id} 
            data-index={index}
            className="w-full h-full snap-start"
          >
            <FeedItem 
              car={car} 
              isActive={index === activeIndex} 
              onContact={handleContact}
              onShare={handleShare}
              onShowSpecs={() => handleShowSpecs(car)}
            />
          </div>
        ))}
        
        {/* Bottom padding for overscroll */}
        <div className="h-24 w-full snap-start flex items-center justify-center bg-black">
             <p className="text-zinc-700 text-xs tracking-widest uppercase">End of Feed</p>
        </div>
      </div>

      {/* Navigation Tab Bar (Simulated) */}
      <div className="fixed bottom-0 left-0 w-full z-40 pb-5 pt-3 bg-gradient-to-t from-black via-black/90 to-transparent flex justify-around items-end px-2 pointer-events-none">
         <div className="flex flex-col items-center gap-1 opacity-100 pointer-events-auto cursor-pointer">
             <div className="size-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
             <span className="text-[10px] font-bold text-white tracking-widest uppercase">Feed</span>
         </div>
      </div>
      
      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
      
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />

      <SpecsDrawer 
        car={selectedCarForSpecs}
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        onContact={handleContact}
      />
    </div>
  );
};

export default App;
