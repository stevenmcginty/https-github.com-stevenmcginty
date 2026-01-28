import React from 'react';
import { X, Gauge, Zap, Wind, Calendar, MapPin, ShieldCheck, Cog } from 'lucide-react';
import { Car } from '../types';

interface SpecsDrawerProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
}

const SpecsDrawer: React.FC<SpecsDrawerProps> = ({ car, isOpen, onClose, onContact }) => {
  if (!car) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-end justify-center pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className={`relative w-full sm:max-w-md bg-zinc-900 border-t border-white/10 rounded-t-3xl max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl transition-transform duration-300 ease-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        
        {/* Handle bar */}
        <div className="sticky top-0 left-0 w-full bg-zinc-900/95 backdrop-blur-md z-10 pt-4 pb-2 flex justify-center" onClick={onClose}>
          <div className="w-12 h-1.5 bg-zinc-700 rounded-full"></div>
        </div>

        <div className="px-6 pb-24 pt-2">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">{car.make} {car.model}</h2>
              <p className="text-gray-400 font-medium">{car.trim}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-brand-lime">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(car.price)}
              </p>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-1 text-gray-400">
                <Gauge size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">0-60 mph</span>
              </div>
              <p className="text-xl font-bold text-white">{car.specs.zeroToSixty}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-1 text-gray-400">
                <Zap size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Power</span>
              </div>
              <p className="text-xl font-bold text-white">{car.specs.horsepower} HP</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-1 text-gray-400">
                <Wind size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Top Speed</span>
              </div>
              <p className="text-xl font-bold text-white">{car.specs.topSpeed || 'N/A'}</p>
            </div>
             <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-1 text-gray-400">
                <Cog size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Engine</span>
              </div>
              <p className="text-xl font-bold text-white truncate">{car.specs.engine || 'N/A'}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Vehicle Overview</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {car.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">Clean Title</span>
               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">One Owner</span>
               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">Verified Listing</span>
            </div>
          </div>

          {/* Seller Info */}
          <div className="border-t border-white/10 pt-6 mb-4">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Seller</h3>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="size-12 rounded-full overflow-hidden border border-white/20">
                      <img src={car.seller.avatarUrl} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <p className="text-white font-bold">{car.seller.name}</p>
                      <div className="flex items-center gap-1 text-brand-blue text-xs">
                         <ShieldCheck size={12} fill="currentColor" />
                         <span>Verified Dealer</span>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => { onClose(); onContact(); }}
                  className="px-5 py-2 bg-white text-black font-bold rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  Contact
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SpecsDrawer;
