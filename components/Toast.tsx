import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    onClose: (id: string) => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ id, type, message, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'info':
                return <Info size={20} />;
        }
    };

    const getColorClasses = () => {
        switch (type) {
            case 'success':
                return 'bg-green-900/90 border-green-700 text-green-100';
            case 'error':
                return 'bg-red-900/90 border-red-700 text-red-100';
            case 'info':
                return 'bg-blue-900/90 border-blue-700 text-blue-100';
        }
    };

    return (
        <div className={`${getColorClasses()} border rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px] max-w-md backdrop-blur-sm animate-slideIn`}>
            <div className="shrink-0">
                {getIcon()}
            </div>
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button
                onClick={() => onClose(id)}
                className="shrink-0 text-white/70 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export const ToastContainer: React.FC<{ toasts: ToastProps[] }> = ({ toasts }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </div>
    );
};
