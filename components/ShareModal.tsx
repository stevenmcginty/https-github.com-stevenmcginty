import React from 'react';
import { X, Copy, MessageSquare, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareOptions = [
    { name: 'WhatsApp', color: 'bg-green-500', icon: <MessageSquare size={24} fill="white" className="text-white" /> },
    { name: 'Instagram', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500', icon: <div className="w-6 h-6 border-2 border-white rounded-lg flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div> },
    { name: 'TikTok', color: 'bg-black border border-zinc-700', icon: <div className="text-white font-bold text-sm">Tik</div> },
    { name: 'Copy Link', color: 'bg-zinc-700', icon: <Copy size={24} className="text-white" /> },
    { name: 'Message', color: 'bg-blue-500', icon: <Send size={24} className="text-white" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-md bg-zinc-900 border-t border-white/10 sm:border rounded-t-3xl sm:rounded-2xl p-6 animate-in slide-in-from-bottom-full duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Share to</h3>
          <button onClick={onClose} className="p-1 bg-white/10 rounded-full">
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {shareOptions.map((option) => (
            <div key={option.name} className="flex flex-col items-center gap-2 min-w-[70px]">
              <button 
                className={`size-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform ${option.color}`}
                onClick={onClose}
              >
                {option.icon}
              </button>
              <span className="text-xs text-gray-400 font-medium">{option.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
            <div className="bg-black p-3 rounded-lg flex items-center justify-between border border-white/5">
                <span className="text-sm text-gray-400 truncate max-w-[200px]">https://carfeed.app/porsche-gt3</span>
                <button className="text-sm font-bold text-brand-blue">Copy</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
