
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../../services/api';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { USE_FIREBASE } from '../../services/firebaseConfig';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      alert('Login failed: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleWorkspaceLogin = async () => {
    setLoading(true);

    if (USE_FIREBASE) {
      try {
        await loginWithGoogle();
        navigate('/admin/dashboard');
      } catch (e) {
        console.error(e);
        alert("Kunne ikke logge inn med Google. Sjekk konsollen.");
        setLoading(false);
      }
    } else {
      // Fallback for demo uten API keys
      setTimeout(() => navigate('/admin/dashboard'), 800);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700 p-8 shadow-2xl">

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 rotate-3">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">GKIT Admin</h1>
          <p className="text-slate-400">Logg inn for å administrere skjermer</p>
        </div>

        {/* Google Workspace Button */}
        <button
          onClick={handleWorkspaceLogin}
          className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-3 mb-6 hover:bg-slate-100 transition-all"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
          Logg inn med Google / Workspace
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-sm">ELLER</span>
          <div className="flex-grow border-t border-slate-700"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 opacity-50 hover:opacity-100 transition-opacity">
          <div className="space-y-1">
            <label className="text-sm text-slate-400 ml-1">E-post (Alternativ)</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="navn@klubb.no"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-400 ml-1">Passord</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Logg inn <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          Clubsite CMS Integration • v2.1.0
          {!USE_FIREBASE && <span className="block text-orange-500 mt-1">Kjører i Demo Modus</span>}
        </p>
      </div>
    </div>
  );
};
