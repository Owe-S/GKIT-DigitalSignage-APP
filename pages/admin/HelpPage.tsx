import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, BookOpen, Lightbulb, AlertCircle, RefreshCw, Upload, Settings as SettingsIcon } from 'lucide-react';

export const HelpPage: React.FC = () => {
    const commonHowTos = [
        {
            icon: RefreshCw,
            title: 'Skjermen viser gammelt innhold',
            solution: 'Refresh skjermen ved å trykke F5 på tastaturet, eller restart TV-en. Innholdet caches av nettleseren.'
        },
        {
            icon: Upload,
            title: 'Bildet lastes ikke opp',
            solution: 'Sjekk at bildet er under 5MB og i JPG/PNG/GIF format. Prøv å lime inn URL manuelt hvis opplasting feiler.'
        },
        {
            icon: AlertCircle,
            title: 'Widgets vises ikke',
            solution: 'Sjekk at du har lagret endringene (blå "Lagre" knapp). Refresh displayet, og sjekk at widget har riktig data.'
        },
        {
            icon: HelpCircle,
            title: 'Kan ikke logge inn med Google',
            solution: 'Sjekk at du bruker riktig Google-konto for klubben. Prøv e-post/passord login i stedet, eller kontakt support.'
        },
        {
            icon: SettingsIcon,
            title: 'Hvordan endre klubblogo?',
            solution: 'Gå til Innstillinger → Last opp logo under "Klubblogo". Bruk PNG med gjennomsiktig bakgrunn for best resultat.'
        },
        {
            icon: Lightbulb,
            title: 'Hvordan legge til nytt lysbilde?',
            solution: 'Åpne Screen Editor → Klikk "+" knappen i venstre panel → Velg layout → Legg til widgets → Lagre.'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/admin/dashboard" className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-lg">Hjelp & Vanlige Spørsmål</h1>
                        <p className="text-xs text-slate-500">Løsninger på vanlige problemer</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-6xl mx-auto p-8">

                {/* Intro */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <HelpCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Vanlige Spørsmål & Løsninger</h2>
                    <p className="text-slate-400">Finn raske svar på de mest stilte spørsmålene</p>
                </div>

                {/* Two-column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {commonHowTos.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                                        <Icon size={20} className="text-blue-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{item.solution}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Center Link to Full Manual */}
                <div className="text-center py-8 border-t border-slate-800">
                    <p className="text-slate-400 mb-4">Trenger du mer hjelp?</p>
                    <a
                        href="https://github.com/Owe-S/GKIT-DigitalSignage-APP/blob/main/ADMIN_GUIDE.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg"
                    >
                        <BookOpen size={20} />
                        Les Full Manual
                    </a>
                    <p className="text-xs text-slate-500 mt-3">Omfattende guide med alle funksjoner og instruksjoner</p>
                </div>

            </div>
        </div>
    );
};
