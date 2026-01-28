import React from 'react';
import { X, Mail, Phone } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full sm:max-w-md bg-zinc-900 border-t border-white/10 sm:border rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Sign in</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-gray-400 text-sm mb-4">
            Create an account to contact dealers, save cars, and apply for financing.
          </p>

          <button 
            onClick={onLogin}
            className="w-full py-3.5 px-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 0.507 5.387 0 12s5.36 12 12.48 12c3.6 0 6.693-1.2 8.853-3.253 2.2-2.187 2.867-5.52 2.867-8.373 0-.827-.08-1.467-.24-2.293h-11.493z"/>
            </svg>
            Continue with Google
          </button>

          <button 
            onClick={onLogin}
            className="w-full py-3.5 px-4 bg-[#1877F2] text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-[#1865F2] transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
               <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
          
           <button 
            onClick={onLogin}
            className="w-full py-3.5 px-4 bg-black border border-zinc-800 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-900 transition-colors"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
               <path d="M12.001 0C5.372 0 0 5.373 0 12s5.372 12 12.001 12c2.052 0 3.824-.496 5.241-1.353l.056-.033 1.63 1.63a.998.998 0 0 0 1.413 0 .998.998 0 0 0 0-1.413l-1.63-1.63c.857-1.417 1.353-3.189 1.353-5.241 0-6.627-5.373-12-12.064-12zm6.983 17.521c-1.144 1.144-2.617 1.916-4.241 2.215v-3.793l3.793 3.793c-.299 1.624-1.071 3.097-2.215 4.241zM5.521 18.983c-1.144-1.144-1.916-2.617-2.215-4.241h3.793l-3.793 3.793c1.624.299 3.097 1.071 4.241 2.215zM4.99 5.009c1.144-1.144 2.617-1.916 4.241-2.215v3.793L5.438 2.794c.299-1.624 1.071-3.097 2.215-4.241zM18.983 5.009c1.144 1.144 1.916 2.617 2.215 4.241h-3.793l3.793-3.793c-1.624-.299-3.097-1.071-4.241-2.215z"/>
               <path d="M19.59 6.69a.999.999 0 0 0-1.414 0L13 11.88V7a1 1 0 0 0-2 0v4.88L5.824 6.69a.999.999 0 1 0-1.414 1.414L9.586 13.28H4.706a1 1 0 0 0 0 2h4.88l-5.176 5.176a.999.999 0 1 0 1.414 1.414L11 16.71V21.6a1 1 0 0 0 2 0v-4.89l5.176 5.176a.999.999 0 1 0 1.414-1.414L14.414 15.28h4.88a1 1 0 0 0 0-2h-4.88l5.176-5.176a.999.999 0 0 0 0-1.414z" fill="#fff"/>
            </svg>
            Continue with TikTok
          </button>

          <button 
            onClick={onLogin}
            className="w-full py-3.5 px-4 bg-zinc-800 text-white font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-700 transition-colors"
          >
            <Mail size={20} />
            Continue with Email
          </button>
        </div>
        
        <p className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
