import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { USE_FIREBASE } from '../services/firebaseConfig';
import { Loader2 } from 'lucide-react';

export const AuthGuard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        if (!USE_FIREBASE) {
            // If not using Firebase (Mock mode), always allow access
            setIsAuthenticated(true);
            return;
        }

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};
