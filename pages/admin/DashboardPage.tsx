import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchScreens, createScreen, deleteScreen, getCurrentUserProfile } from '../../services/api';
import { ScreenSummary } from '../../types';
import { Monitor, Plus, Settings, LogOut, ExternalLink, Activity, Copy, Trash2, X, Check, LayoutDashboard, HelpCircle, BarChart3 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [screens, setScreens] = useState<ScreenSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewScreenModal, setShowNewScreenModal] = useState(false);
  const [newScreenName, setNewScreenName] = useState('');
  const [creating, setCreating] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [clubName, setClubName] = useState('Laster...');

  const navigate = useNavigate();

  useEffect(() => {
    loadScreens();
  }, []);

  const loadScreens = async () => {
    try {
      const user = await getCurrentUserProfile();
      const clubId = user?.clubId || 'skigk'; // Fallback to skigk if no user/club
      setClubName(user?.clubName || 'Ski Golfklubb'); // Fallback name

      fetchScreens(clubId).then(data => {
        setScreens(data);
        setLoading(false);
      });
    } catch (e) {
      console.error("Error loading profile", e);
      setLoading(false);
    }
  };

  const handleCreateScreen = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newScreenName.trim()) return;

    setCreating(true);
    try {
      await createScreen(newScreenName);
      setNewScreenName('');
      setShowNewScreenModal(false);
      loadScreens(); // Refresh list
    } catch (err) {
      alert('Kunne ikke opprette skjerm');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteScreen = async (id: string) => {
    if (window.confirm('Er du sikker på at du vil slette denne skjermen?')) {
      await deleteScreen(id);
      loadScreens();
      setOpenMenuId(null);
    }
  };

  const copyUrlToClipboard = (screenId: string) => {
    const url = `${window.location.origin}/#/screen/${screenId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(screenId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Navbar */}
      <nav className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Monitor size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">GKIT <span className="text-slate-400 font-normal">Admin</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin/analytics" className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
            <BarChart3 size={16} />
            <span className="hidden sm:inline">Analytics</span>
          </Link>
          <Link to="/admin/help" className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
            <HelpCircle size={16} />
            <span className="hidden sm:inline">Hjelp</span>
          </Link>
          <Link to="/admin/settings" className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
            <Settings size={16} />
            <span className="hidden sm:inline">Innstillinger</span>
          </Link>
          <Link to="/" className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-2 bg-blue-900/10 px-3 py-1.5 rounded-full border border-blue-900/50 transition-colors">
            <LayoutDashboard size={14} />
            Tilbake til Visning
          </Link>
          <div className="h-6 w-px bg-slate-800 mx-2"></div>
          <span className="text-sm text-slate-400 hidden sm:block">{clubName}</span>
          <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            <span className="font-bold text-xs">{clubName.substring(0, 2).toUpperCase()}</span>
          </div>
          <button onClick={() => navigate('/admin/login')} className="text-slate-500 hover:text-white" title="Logg ut">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dine Skjermer</h1>
            <p className="text-slate-400">Administrer innholdet på klubbens infoskjermer.</p>
          </div>
          <button
            onClick={() => setShowNewScreenModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} /> Ny Skjerm
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Laster skjermer...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screens.map(screen => (
              <div key={screen.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all group relative">

                {/* Header row with Status and Settings Menu */}
                <div className="flex justify-between items-start mb-4 relative">
                  <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${screen.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Activity size={10} /> {screen.status === 'active' ? 'Online' : 'Offline'}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === screen.id ? null : screen.id)}
                      className="text-slate-500 hover:text-white cursor-pointer p-1 rounded hover:bg-slate-800"
                    >
                      <Settings size={18} />
                    </button>

                    {/* Settings Dropdown */}
                    {openMenuId === screen.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>
                        <div className="absolute right-0 top-8 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                          <button
                            onClick={() => handleDeleteScreen(screen.id)}
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Slett skjerm
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-1 text-white">{screen.name}</h3>
                <p className="text-sm text-slate-500 mb-6">Sist aktiv: {screen.lastActive}</p>

                <div className="flex flex-col gap-2">
                  {/* Primary Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/screen/${screen.id}`}
                      className="flex-grow bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-blue-900/50"
                    >
                      Rediger Innhold
                    </Link>
                    <a
                      href={`/#/screen/${screen.id}`}
                      target="_blank"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-slate-700 text-sm font-medium"
                      title="Åpne forhåndsvisning i ny fane"
                    >
                      <ExternalLink size={16} />
                      Visning
                    </a>
                  </div>

                  {/* URL Action */}
                  <div className="mt-2 pt-3 border-t border-slate-800">
                    <p className="text-xs text-slate-500 mb-1">Statisk Visnings-URL</p>
                    <button
                      onClick={() => copyUrlToClipboard(screen.id)}
                      className="w-full flex items-center justify-between bg-black/20 hover:bg-black/40 border border-slate-800 rounded px-3 py-2 text-xs text-slate-400 transition-colors group/url"
                    >
                      <span className="truncate font-mono opacity-70 max-w-[200px]">
                        .../screen/{screen.id}
                      </span>
                      {copiedId === screen.id ? (
                        <span className="flex items-center gap-1 text-green-400 font-bold"><Check size={12} /> Kopiert</span>
                      ) : (
                        <span className="flex items-center gap-1 group-hover/url:text-white"><Copy size={12} /> Kopier</span>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Screen Modal */}
      {showNewScreenModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Ny Skjerm</h2>
              <button onClick={() => setShowNewScreenModal(false)} className="text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateScreen}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-400 mb-2">Navn på skjerm / Plassering</label>
                <input
                  autoFocus
                  type="text"
                  value={newScreenName}
                  onChange={(e) => setNewScreenName(e.target.value)}
                  placeholder="F.eks. Resepsjon, Restaurant, Hull 1..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <p className="text-xs text-slate-500 mt-2">Du får en unik URL til denne skjermen etter at den er opprettet.</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewScreenModal(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  disabled={!newScreenName.trim() || creating}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
                >
                  {creating ? 'Oppretter...' : 'Opprett Skjerm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};