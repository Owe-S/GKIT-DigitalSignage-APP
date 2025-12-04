import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchScreens, getCurrentUserProfile } from '../../services/api';
import { ScreenSummary } from '../../types';
import { ArrowLeft, Activity, Monitor, TrendingUp, Clock, BarChart3 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
    const [screens, setScreens] = useState<ScreenSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [clubName, setClubName] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const user = await getCurrentUserProfile();
            const clubId = user?.clubId || 'skigk';
            setClubName(user?.clubName || 'Klubben');

            const data = await fetchScreens(clubId);
            setScreens(data);
        } catch (e) {
            console.error("Error loading analytics:", e);
        } finally {
            setLoading(false);
        }
    };

    const activeScreens = screens.filter(s => s.status === 'active').length;
    const offlineScreens = screens.filter(s => s.status === 'offline').length;
    const totalScreens = screens.length;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg">Analytics</h1>
                        <p className="text-xs text-slate-500">Oversikt over skjermaktivitet</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-6xl mx-auto p-8">
                {loading ? (
                    <div className="text-center py-20 text-slate-500">Laster statistikk...</div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                        <Monitor size={24} className="text-blue-400" />
                                    </div>
                                    <BarChart3 size={16} className="text-slate-500" />
                                </div>
                                <p className="text-3xl font-bold mb-1">{totalScreens}</p>
                                <p className="text-sm text-slate-400">Totalt Skjermer</p>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                                        <Activity size={24} className="text-green-400" />
                                    </div>
                                    <TrendingUp size={16} className="text-green-500" />
                                </div>
                                <p className="text-3xl font-bold mb-1 text-green-400">{activeScreens}</p>
                                <p className="text-sm text-slate-400">Online</p>
                            </div>

                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                                        <Activity size={24} className="text-red-400" />
                                    </div>
                                    <Clock size={16} className="text-slate-500" />
                                </div>
                                <p className="text-3xl font-bold mb-1 text-red-400">{offlineScreens}</p>
                                <p className="text-sm text-slate-400">Offline</p>
                            </div>
                        </div>

                        {/* Activity List */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Clock size={20} />
                                Siste Aktivitet
                            </h2>

                            {screens.length === 0 ? (
                                <p className="text-slate-400 text-center py-8">Ingen skjermer registrert ennå</p>
                            ) : (
                                <div className="space-y-3">
                                    {screens.map((screen) => (
                                        <div
                                            key={screen.id}
                                            className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-3 h-3 rounded-full ${screen.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                                                <div>
                                                    <p className="font-medium">{screen.name}</p>
                                                    <p className="text-xs text-slate-500">ID: {screen.id}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-medium ${screen.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {screen.status === 'active' ? 'Online' : 'Offline'}
                                                </p>
                                                <p className="text-xs text-slate-500">Sist: {screen.lastActive}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Box */}
                        <div className="mt-6 bg-blue-900/20 border border-blue-900/50 rounded-xl p-4 text-sm text-blue-300">
                            <p className="font-medium mb-1">📊 Analytics Beta</p>
                            <p>Dette er en grunnleggende oversikt. Mer detaljert statistikk kommer i fremtidige oppdateringer.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
