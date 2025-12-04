import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchClubSettings, updateClubSettings, getCurrentUserProfile } from '../../services/api';
import { ClubSettings } from '../../types';
import { ArrowLeft, Save, Building2, Globe, Image as ImageIcon, Loader2 } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';
import { useToast } from '../../hooks/useToast';

export const ClubSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<ClubSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const user = await getCurrentUserProfile();
            const clubId = user?.clubId || 'skigk';
            const data = await fetchClubSettings(clubId);
            setSettings(data);
        } catch (e) {
            console.error("Error loading settings:", e);
            showToast('error', 'Kunne ikke laste inn innstillinger');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!settings) return;

        setSaving(true);

        try {
            const success = await updateClubSettings(settings);
            if (success) {
                showToast('success', 'Innstillinger lagret!');
            } else {
                showToast('error', 'Kunne ikke lagre innstillinger');
            }
        } catch (e) {
            showToast('error', 'En feil oppstod under lagring');
        } finally {
            setSaving(false);
        }
    };

    if (loading || !settings) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">
                <Loader2 className="animate-spin mr-2" size={24} />
                Laster innstillinger...
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-950 text-white flex flex-col">
            {/* Header */}
            <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg">Klubbinnstillinger</h1>
                        <p className="text-xs text-slate-500">Administrer klubbens standardinnstillinger</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all disabled:opacity-50"
                >
                    {saving ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Lagrer...
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Lagre
                        </>
                    )}
                </button>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Club Info Section */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Klubbinformasjon</h2>
                                <p className="text-sm text-slate-400">Standard informasjon for alle skjermer</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">
                                    Klubbnavn
                                </label>
                                <input
                                    type="text"
                                    value={settings.clubName}
                                    onChange={(e) => setSettings({ ...settings, clubName: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="F.eks. Ski Golfklubb"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                                    <Globe size={14} />
                                    Klubbens nettside (URL)
                                </label>
                                <input
                                    type="text"
                                    value={settings.clubUrl || ''}
                                    onChange={(e) => setSettings({ ...settings, clubUrl: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-sm"
                                    placeholder="www.skig.no"
                                />
                                <p className="text-xs text-slate-500 mt-1">Vises nederst på noen skjermer</p>
                            </div>
                        </div>
                    </div>

                    {/* Logo Section */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <ImageIcon size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Klubblogo</h2>
                                <p className="text-sm text-slate-400">Last opp logo for bruk på skjermene</p>
                            </div>
                        </div>

                        <ImageUpload
                            label="Klubblogo (anbefalt PNG med gjennomsiktig bakgrunn)"
                            currentUrl={settings.logoUrl}
                            onUploadComplete={(url) => setSettings({ ...settings, logoUrl: url })}
                            folder="logos"
                        />

                        {settings.logoUrl && (
                            <div className="mt-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
                                <p className="text-xs text-slate-400 mb-2">Forhåndsvisning:</p>
                                <div className="bg-white p-4 rounded inline-block">
                                    <img
                                        src={settings.logoUrl}
                                        alt="Logo preview"
                                        className="h-16 object-contain"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-900/20 border border-blue-900/50 rounded-xl p-4 text-sm text-blue-300">
                        <p className="font-medium mb-1">💡 Tips</p>
                        <p>Disse innstillingene brukes som standard for nye skjermer. Du kan overstyre dem for enkeltskjermer i Screen Editor.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
