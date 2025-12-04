import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '../services/api';

interface ImageUploadProps {
    currentUrl?: string;
    onUploadComplete: (url: string) => void;
    folder?: string;
    label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ currentUrl, onUploadComplete, folder = 'uploads', label = 'Last opp bilde' }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Vennligst last opp en bildefil (JPG, PNG, GIF)');
            return;
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            setError('Bildet er for stort (Maks 5MB)');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const url = await uploadImage(file, folder);
            onUploadComplete(url);
        } catch (e) {
            console.error(e);
            setError('Kunne ikke laste opp bilde. Prøv igjen.');
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-xs text-slate-400 uppercase">{label}</label>}

            <div className="flex gap-4 items-start">
                {/* Preview Area */}
                {currentUrl && (
                    <div className="relative group shrink-0">
                        <img
                            src={currentUrl}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg border border-slate-700 bg-slate-800"
                        />
                        <button
                            onClick={() => onUploadComplete('')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Fjern bilde"
                        >
                            <X size={12} />
                        </button>
                    </div>
                )}

                {/* Dropzone */}
                <div
                    className={`flex-1 border-2 border-dashed rounded-lg p-4 transition-all text-center cursor-pointer flex flex-col items-center justify-center min-h-[6rem]
            ${dragActive ? 'border-blue-500 bg-blue-900/20' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}
            ${uploading ? 'opacity-50 pointer-events-none' : ''}
          `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center gap-2 text-blue-400">
                            <Loader2 size={24} className="animate-spin" />
                            <span className="text-sm font-medium">Laster opp...</span>
                        </div>
                    ) : (
                        <>
                            <Upload size={20} className="text-slate-400 mb-2" />
                            <p className="text-sm text-slate-300 font-medium">Klikk eller dra bilde hit</p>
                            <p className="text-xs text-slate-500 mt-1">Maks 5MB (JPG, PNG)</p>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-400 mt-1">{error}</p>
            )}
        </div>
    );
};
