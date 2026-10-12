import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto glass-panel bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#31C48D]" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-500" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#123C32]" />
            )}
          </div>
          <div className="flex-1 text-xs text-[#18332C] font-medium leading-relaxed">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg text-[#4A6B62] hover:text-[#18332C] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
