import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchScreenConfig, updateScreenConfig } from '../../services/api';
import { ScreenConfig, Slide, SlideLayout, WidgetType, WidgetConfig } from '../../types';
import { ArrowLeft, Save, Layout, Clock, Plus, Trash2, GripVertical, Monitor, Check, Loader2, ExternalLink, Edit2, X, Image as ImageIcon } from 'lucide-react';
import { ImageUpload } from '../../components/ImageUpload';

export const ScreenEditorPage: React.FC = () => {
  const { screenId } = useParams();
  const [config, setConfig] = useState<ScreenConfig | null>(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  const [saving, setSaving] = useState(false);

  // Widget Edit Modal State
  const [editingWidget, setEditingWidget] = useState<{ slideIdx: number; widgetIdx: number; config: WidgetConfig } | null>(null);

  useEffect(() => {
    if (screenId) {
      fetchScreenConfig(screenId).then(setConfig);
    }
  }, [screenId]);

  if (!config) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Laster editor...</div>;

  const handleSave = async () => {
    setSaving(true);
    await updateScreenConfig(config);
    setSaving(false);
  };

  const updateSlide = (index: number, updates: Partial<Slide>) => {
    const newSlides = [...config.slides];
    newSlides[index] = { ...newSlides[index], ...updates };
    setConfig({ ...config, slides: newSlides });
  };

  const deleteSlide = (index: number) => {
    if (confirm('Er du sikker på at du vil slette dette lysbildet?')) {
      const newSlides = config.slides.filter((_, i) => i !== index);
      setConfig({ ...config, slides: newSlides });
      setSelectedSlideIndex(0);
    }
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      layout: SlideLayout.FULLSCREEN,
      duration: 15,
      widgets: []
    };
    setConfig({ ...config, slides: [...config.slides, newSlide] });
    setSelectedSlideIndex(config.slides.length);
  };

  const saveWidgetChanges = (updatedWidget: WidgetConfig) => {
    if (!editingWidget) return;
    const newSlides = [...config.slides];
    const newWidgets = [...newSlides[editingWidget.slideIdx].widgets];
    newWidgets[editingWidget.widgetIdx] = updatedWidget;
    newSlides[editingWidget.slideIdx].widgets = newWidgets;

    setConfig({ ...config, slides: newSlides });
    setEditingWidget(null);
  };

  const selectedSlide = config.slides[selectedSlideIndex];

  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col relative">
      {/* Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-bold text-lg">{config.id}</h1>
            <p className="text-xs text-slate-500">Redigerer visning</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right mr-4 hidden md:block">
            <label className="text-xs text-slate-500 block">Klubbnavn</label>
            <input
              className="bg-transparent border-none text-sm font-medium text-white text-right focus:ring-0 p-0"
              value={config.clubName}
              onChange={(e) => setConfig({ ...config, clubName: e.target.value })}
            />
          </div>

          <a
            href={`/#/screen/${screenId}`}
            target="_blank"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-2 rounded-lg flex items-center gap-2 font-medium transition-all border border-slate-700"
            title="Åpne visning i ny fane"
          >
            <ExternalLink size={16} />
            <span className="hidden sm:inline">Åpne Visning</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? 'Lagrer...' : 'Lagre'}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left: Slide List */}
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Lysbilder</span>
            <button onClick={addSlide} className="p-1 hover:bg-slate-800 rounded text-blue-400"><Plus size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {config.slides.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => setSelectedSlideIndex(idx)}
                className={`p-3 rounded-lg cursor-pointer border transition-all flex items-center gap-3 ${selectedSlideIndex === idx ? 'bg-blue-900/20 border-blue-500' : 'bg-slate-800 border-transparent hover:border-slate-600'}`}
              >
                <GripVertical size={16} className="text-slate-600" />
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium truncate">Slide {idx + 1}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <Layout size={10} /> {slide.layout}
                  </div>
                </div>
                {selectedSlideIndex === idx && (
                  <button onClick={(e) => { e.stopPropagation(); deleteSlide(idx); }} className="text-slate-500 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Center/Right: Editor Area */}
        {selectedSlide ? (
          <div className="flex-1 overflow-y-auto bg-slate-950 p-8">
            <div className="max-w-4xl mx-auto">

              <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Innstillinger for Slide {selectedSlideIndex + 1}</h2>
                  <p className="text-slate-400">Konfigurer layout og varighet.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <Clock size={16} className="text-slate-400" />
                  <input
                    type="number"
                    value={selectedSlide.duration}
                    onChange={(e) => updateSlide(selectedSlideIndex, { duration: parseInt(e.target.value) || 10 })}
                    className="w-12 bg-transparent text-white font-bold text-center focus:outline-none"
                  />
                  <span className="text-sm text-slate-500">sekunder</span>
                </div>
              </div>

              {/* Layout Picker */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {Object.values(SlideLayout).map(layout => (
                  <button
                    key={layout}
                    onClick={() => updateSlide(selectedSlideIndex, { layout: layout })}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${selectedSlide.layout === layout ? 'border-blue-500 bg-blue-900/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
                  >
                    <div className="w-full aspect-video bg-slate-800 rounded flex p-1 gap-1">
                      {/* Mini visualization of layouts */}
                      {layout === SlideLayout.FULLSCREEN && <div className="w-full h-full bg-slate-600 rounded-sm"></div>}
                      {layout === SlideLayout.SPLIT_VERTICAL && <><div className="w-1/2 h-full bg-slate-600 rounded-sm"></div><div className="w-1/2 h-full bg-slate-600 rounded-sm"></div></>}
                      {layout === SlideLayout.SIDEBAR_RIGHT && <><div className="w-2/3 h-full bg-slate-600 rounded-sm"></div><div className="w-1/3 h-full bg-slate-600 rounded-sm"></div></>}
                      {layout === SlideLayout.GRID_2X2 && <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1"><div className="bg-slate-600"></div><div className="bg-slate-600"></div><div className="bg-slate-600"></div><div className="bg-slate-600"></div></div>}
                    </div>
                    <span className="text-xs font-medium uppercase text-slate-400">{layout.replace('_', ' ')}</span>
                    {selectedSlide.layout === layout && <div className="absolute top-2 right-2 text-blue-500"><Check size={16} /></div>}
                  </button>
                ))}
              </div>

              {/* Widgets Config */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Monitor size={18} /> Widgets</h3>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <p className="text-slate-400 mb-4 text-sm">
                    Rediger widgets for layouten. Klikk på blyanten for detaljer (bilder, url, tekst).
                  </p>

                  <div className="space-y-3">
                    {selectedSlide.widgets.map((widget, wIdx) => (
                      <div key={wIdx} className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center font-bold text-slate-400">{wIdx + 1}</div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <select
                            value={widget.type}
                            onChange={(e) => {
                              const newWidgets = [...selectedSlide.widgets];
                              newWidgets[wIdx] = { ...widget, type: e.target.value as WidgetType };
                              updateSlide(selectedSlideIndex, { widgets: newWidgets });
                            }}
                            className="bg-slate-900 border border-slate-600 text-white text-sm rounded px-2 py-2"
                          >
                            {Object.values(WidgetType).map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                          <input
                            className="w-full bg-transparent border-b border-slate-600 text-sm py-2 focus:outline-none focus:border-blue-500"
                            value={widget.title || ''}
                            onChange={(e) => {
                              const newWidgets = [...selectedSlide.widgets];
                              newWidgets[wIdx] = { ...widget, title: e.target.value };
                              updateSlide(selectedSlideIndex, { widgets: newWidgets });
                            }}
                            placeholder="Widget tittel (valgfritt)..."
                          />
                        </div>
                        <button
                          onClick={() => setEditingWidget({ slideIdx: selectedSlideIndex, widgetIdx: wIdx, config: widget })}
                          className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg ml-2 shadow-lg"
                          title="Rediger detaljer (bilde, url, tekst)"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newWidgets = [...selectedSlide.widgets, { id: Date.now().toString(), type: WidgetType.WEATHER_YR, title: 'Ny Widget' }];
                        updateSlide(selectedSlideIndex, { widgets: newWidgets });
                      }}
                      className="w-full py-3 border border-dashed border-slate-700 text-slate-500 hover:border-blue-500 hover:text-blue-500 rounded-lg text-sm transition-colors"
                    >
                      + Legg til Widget i listen
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600">
            Velg en slide til venstre for å redigere
          </div>
        )}
      </div>

      {/* MODAL FOR WIDGET EDITING */}
      {editingWidget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <WidgetEditModal
            widget={editingWidget.config}
            layout={selectedSlide.layout}
            onClose={() => setEditingWidget(null)}
            onSave={saveWidgetChanges}
          />
        </div>
      )}

    </div>
  );
};

// Helper Component for the Edit Modal
const WidgetEditModal: React.FC<{
  widget: WidgetConfig;
  layout: SlideLayout;
  onClose: () => void;
  onSave: (w: WidgetConfig) => void;
}> = ({ widget, layout, onClose, onSave }) => {
  const [data, setData] = useState<any>(widget.data || {});
  const [title, setTitle] = useState(widget.title || '');

  // Determine recommended size text based on layout
  const getSizeHint = () => {
    if (layout === SlideLayout.FULLSCREEN) return "1920x1080 (Landscape)";
    if (layout === SlideLayout.SIDEBAR_RIGHT) return "Venstre: 1300x1080, Høyre: 620x540";
    if (layout === SlideLayout.GRID_2X2) return "960x540";
    return "Standard HD format";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...widget, title, data });
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800">
        <h3 className="font-bold text-lg flex items-center gap-2"><Edit2 size={16} /> Rediger {widget.type}</h3>
        <button onClick={onClose} className="hover:text-white text-slate-400"><X size={24} /></button>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 uppercase mb-1">Tittel (vises ofte over widget)</label>
            <input
              value={title} onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
            />
          </div>

          {/* DYNAMIC FIELDS BASED ON TYPE */}

          {/* 1. Manual Offer / Image / Header */}
          {(widget.type === WidgetType.MANUAL_OFFER || widget.type === WidgetType.HEADER || widget.type === WidgetType.GOLFBOX_LOGIN) && (
            <>
              <div className="bg-blue-900/20 p-3 rounded border border-blue-900/50 text-sm text-blue-300 flex items-start gap-2">
                <ImageIcon size={16} className="mt-0.5" />
                <span>
                  <strong>Anbefalt bilde-størrelse:</strong> {getSizeHint()}<br />
                  <span className="text-xs opacity-70">Bruk en URL fra din nettside eller last opp til en bilde-tjeneste (f.eks. Imgur) og lim inn lenken her.</span>
                </span>
              </div>

              <div className="mt-4">
                <ImageUpload
                  label="Velg Bilde"
                  currentUrl={data.imageUrl}
                  onUploadComplete={(url) => setData({ ...data, imageUrl: url })}
                  folder="widgets"
                />
                <div className="mt-2">
                  <label className="block text-xs text-slate-500 uppercase mb-1">Eller lim inn URL manuelt</label>
                  <input
                    value={data.imageUrl || ''} onChange={e => setData({ ...data, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white font-mono text-xs text-slate-400"
                  />
                </div>
              </div>
            </>
          )}

          {/* 2. Manual Offer Specifics */}
          {widget.type === WidgetType.MANUAL_OFFER && (
            <>
              <div>
                <label className="block text-xs text-slate-400 uppercase mb-1">Overskrift (Stor tekst)</label>
                <input
                  value={data.headline || ''} onChange={e => setData({ ...data, headline: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase mb-1">Undertittel / Pris</label>
                <textarea
                  value={data.subtext || ''} onChange={e => setData({ ...data, subtext: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
                />
              </div>
            </>
          )}

          {/* 3. GolfBox Login Specifics */}
          {widget.type === WidgetType.GOLFBOX_LOGIN && (
            <div>
              <label className="block text-xs text-slate-400 uppercase mb-1">Veiledningstekst</label>
              <input
                value={data.subtext || ''} onChange={e => setData({ ...data, subtext: e.target.value })}
                placeholder="Vennligst registrer din ankomst her"
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white"
              />
            </div>
          )}

          {/* 4. Yr Weather Specifics */}
          {widget.type === WidgetType.WEATHER_YR && (
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <label className="block text-xs text-slate-400 uppercase mb-1">Koordinater (Lat / Lon)</label>
              <div className="flex gap-2">
                <input
                  type="number" step="0.01"
                  value={data.lat || ''} onChange={e => setData({ ...data, lat: parseFloat(e.target.value) })}
                  placeholder="Lat (f.eks 59.72)"
                  className="w-1/2 bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono text-sm"
                />
                <input
                  type="number" step="0.01"
                  value={data.lon || ''} onChange={e => setData({ ...data, lon: parseFloat(e.target.value) })}
                  placeholder="Lon (f.eks 10.84)"
                  className="w-1/2 bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono text-sm"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Finn koordinater på Google Maps (Høyreklikk &gt; "Hva er her?").
              </p>
            </div>
          )}

          {/* 5. GolfBox Tee Times Specifics */}
          {widget.type === WidgetType.GOLFBOX_TEE_TIMES && (
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <label className="block text-xs text-slate-400 uppercase mb-1">GolfBox GUID (ssguid)</label>
              <input
                value={data.golfboxGuid || ''} onChange={e => setData({ ...data, golfboxGuid: e.target.value })}
                placeholder="{4D74E60B-...}"
                className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono text-sm"
              />
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <label className="block text-xs text-slate-400 uppercase mb-1">Slide Nummer</label>
                  <input
                    type="number"
                    value={data.slideNum || '1'} onChange={e => setData({ ...data, slideNum: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700 flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 text-slate-300 hover:text-white font-medium">Avbryt</button>
        <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg flex items-center gap-2">
          <Check size={18} /> Lagre Endringer
        </button>
      </div>
    </div>
  );
};