import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Share2, 
  Info, 
  MessageCircle, 
  Plus, 
  Search, 
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Car } from '../types';

interface FeedItemProps {
  car: Car;
  isActive: boolean;
  onContact: () => void;
  onShare: () => void;
  onShowSpecs: () => void;
}

const FeedItem: React.FC<FeedItemProps> = ({ car, isActive, onContact, onShare, onShowSpecs }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(car.likes);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // YouTube State
  const [loadYoutube, setLoadYoutube] = useState(false);

  // Manage Media Playback
  useEffect(() => {
    if (isActive) {
      if (car.mediaType === 'video' && videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => console.log("Autoplay prevented"));
        }
      } else if (car.mediaType === 'youtube') {
        const timer = setTimeout(() => setLoadYoutube(true), 100);
        return () => clearTimeout(timer);
      }
    } else {
      if (car.mediaType === 'video' && videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setLoadYoutube(false);
    }
  }, [isActive, car.mediaType]);

  const toggleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const toggleMute = () => {
    if (car.mediaType === 'video' && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } 
    if (car.mediaType === 'youtube') {
        setIsMuted(!isMuted);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatLikes = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    <div className="relative w-full h-full snap-start overflow-hidden bg-black select-none">
      
      {/* --- MEDIA LAYER --- */}
      <div className="absolute inset-0 z-0 bg-zinc-900 flex items-center justify-center">
        
        {/* HTML5 Native Video */}
        {car.mediaType === 'video' && (
          <video
            ref={videoRef}
            src={car.mediaUrl}
            poster={car.posterUrl}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
          />
        )}

        {/* YouTube Video */}
        {car.mediaType === 'youtube' && (
          <>
            <img 
               src={car.posterUrl} 
               className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-110" 
               alt="background"
            />
            <div className="relative w-full aspect-video z-10 shadow-2xl bg-black">
                {!loadYoutube ? (
                     <img 
                        src={car.posterUrl} 
                        className="w-full h-full object-cover" 
                        alt="poster"
                     />
                ) : (
                    <iframe
                        className="w-full h-full pointer-events-none"
                        src={`https://www.youtube.com/embed/${car.mediaUrl}?autoplay=1&mute=${isMuted ? '1' : '0'}&controls=0&loop=1&playlist=${car.mediaUrl}&playsinline=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                )}
            </div>
            
            {!loadYoutube && isActive && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-lime"></div>
                </div>
            )}
          </>
        )}

        {/* Static Image */}
        {car.mediaType === 'image' && (
          <img 
            src={car.mediaUrl} 
            alt={`${car.make} ${car.model}`} 
            className="w-full h-full object-cover"
          />
        )}

        {/* Cinematic Gradients - Tuned for ruthlessness */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* --- MUTE CONTROL --- */}
      {(car.mediaType === 'video' || car.mediaType === 'youtube') && (
        <button 
          onClick={toggleMute}
          className="absolute top-24 left-5 z-20 p-2.5 bg-black/20 backdrop-blur-lg rounded-full text-white/90 border border-white/5 active:scale-95 transition-all"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}

      {/* --- TOP HEADER --- */}
      <div className="absolute top-0 left-0 w-full z-20 pt-8 pb-4 px-5 flex justify-between items-start">
        <div className="flex items-center gap-2 mt-4">
          <span className="text-white font-black italic tracking-tighter text-lg opacity-90 drop-shadow-lg">
            DRIFT
          </span>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40 active:scale-95 transition-all mt-2">
          <Search size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* --- RIGHT ACTION SIDEBAR --- */}
      <div className="absolute right-4 bottom-24 z-30 flex flex-col items-center gap-5">
        
        {/* Seller Avatar */}
        <div className="relative group cursor-pointer transition-transform active:scale-95" onClick={onContact}>
          <div className="size-11 rounded-full border-[1.5px] border-white/80 p-0.5 overflow-hidden shadow-lg bg-black">
            <img 
              src={car.seller.avatarUrl} 
              alt={car.seller.name} 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-brand-blue text-white rounded-full size-4 flex items-center justify-center border border-black shadow-sm">
            <Plus size={10} strokeWidth={4} />
          </div>
        </div>

        {/* Like */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={toggleLike}
            className="group size-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 hover:bg-white/20 border border-white/5 shadow-lg"
          >
            <Heart 
              size={24} 
              className={`transition-colors duration-300 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
              strokeWidth={isLiked ? 0 : 2.5}
            />
          </button>
          <span className="text-[10px] font-bold text-white drop-shadow-md tracking-wide">
            {formatLikes(likesCount)}
          </span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={onShare}
            className="size-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 hover:bg-white/20 border border-white/5 shadow-lg"
          >
            <Share2 size={24} className="text-white ml-[-2px]" strokeWidth={2.5} />
          </button>
          <span className="text-[10px] font-bold text-white drop-shadow-md tracking-wide">Share</span>
        </div>

        {/* Specs - Wires up to Drawer */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={onShowSpecs}
            className="size-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 hover:bg-white/20 border border-white/5 shadow-lg"
          >
            <Info size={24} className="text-white" strokeWidth={2.5} />
          </button>
          <span className="text-[10px] font-bold text-white drop-shadow-md tracking-wide">Specs</span>
        </div>

        {/* Contact/Finance Action */}
        <button 
          onClick={onContact}
          className="mt-2 flex flex-col items-center justify-center gap-1 group"
        >
          <div className="size-12 rounded-xl bg-brand-lime text-black flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all hover:scale-110 active:scale-95 hover:shadow-[0_0_30px_rgba(204,255,0,0.4)]">
            <MessageCircle size={26} strokeWidth={2.5} fill="black" className="fill-current" />
          </div>
        </button>

      </div>

      {/* --- MAIN CONTENT OVERLAY (Ruthless Hierarchy) --- */}
      <div 
        className="absolute bottom-0 left-0 w-full z-20 pb-8 pt-32 px-5 bg-gradient-to-t from-black via-black/80 to-transparent cursor-pointer"
        onClick={onShowSpecs}
      >
        <div className="flex flex-col items-start gap-1 pr-20 max-w-[88%]">
          
          {/* Title: Model Focus */}
          <div className="flex flex-col gap-0.5 mb-1.5">
            <h1 className="text-white text-3xl leading-none font-black tracking-tighter drop-shadow-2xl uppercase">
              {car.make} <span className="text-brand-blue">{car.model}</span>
            </h1>
            {car.trim && (
               <span className="text-gray-300 text-sm font-bold tracking-wide uppercase opacity-80">{car.trim}</span>
            )}
          </div>

          {/* Core Stats: Price, Year, Mileage (As requested) */}
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-xl font-bold text-white tracking-tight drop-shadow-md">
              {formatPrice(car.price)}
            </h2>
            <div className="h-3 w-px bg-white/40"></div>
            <p className="text-gray-200 text-sm font-semibold tracking-wide uppercase">
              {car.year}
            </p>
            <div className="h-3 w-px bg-white/40"></div>
            <p className="text-gray-200 text-sm font-semibold tracking-wide uppercase">
              {car.mileage} miles
            </p>
          </div>
          
          {/* Tap for more hint */}
          <div className="mt-3 flex items-center gap-2 opacity-60">
             <div className="text-[10px] text-white font-medium uppercase tracking-widest border border-white/30 rounded-full px-2 py-0.5">
                Tap for Details
             </div>
          </div>
        </div>

        {/* Progress Bar (Visual Only) */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
          <div className={`h-full bg-brand-lime shadow-[0_0_10px_rgba(204,255,0,0.8)] transition-all duration-[3000ms] ease-linear ${isActive && !loadYoutube ? 'w-full' : 'w-0'}`}></div>
        </div>
      </div>
      
    </div>
  );
};

export default FeedItem;
