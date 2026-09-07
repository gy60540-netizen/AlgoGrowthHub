import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { uploadMedia, formatAssetUrl } from '../../services/api';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: string;
  placeholder?: string;
  helperText?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  aspectRatio = '16/10',
  placeholder = 'https://... or click Upload from Device',
  helperText,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayUrl = formatAssetUrl(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Quick client-side size check (50MB)
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage('File exceeds maximum size of 50MB');
      return;
    }

    setUploading(true);
    setErrorMessage('');
    setUploadSuccess(false);

    const res = await uploadMedia(file);
    setUploading(false);

    if (res.success && res.url) {
      onChange(res.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } else {
      setErrorMessage(res.message || 'Upload failed. Please try again.');
    }

    // Reset file input so user can re-upload same file if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {label}
        </label>
        {uploadSuccess && (
          <span style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
            <CheckCircle2 size={13} /> Uploaded & applied!
          </span>
        )}
      </div>

      {/* Image Preview Box */}
      <div
        style={{
          width: '100%',
          aspectRatio,
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={label}
            onError={(e) => {
              // Fallback to placeholder if broken image
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94A3B8', gap: '0.35rem' }}>
            <ImageIcon size={28} />
            <span style={{ fontSize: '0.75rem' }}>No image set</span>
          </div>
        )}

        {/* Uploading Overlay */}
        {uploading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: '#FFFFFF',
              zIndex: 5,
            }}
          >
            <Loader2 size={24} className="animate-spin" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Uploading image...</span>
          </div>
        )}
      </div>

      {/* Action Controls: Choose File button + Direct URL input */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="btn btn-secondary btn-sm"
          style={{
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.55rem 0.9rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          <span>Upload File</span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
          style={{ display: 'none' }}
        />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: '0.55rem 0.75rem',
            fontSize: '0.82rem',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            outline: 'none',
            backgroundColor: '#FFFFFF',
          }}
        />
      </div>

      {errorMessage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#DC2626', fontSize: '0.75rem', marginTop: '0.2rem' }}>
          <AlertCircle size={13} />
          <span>{errorMessage}</span>
        </div>
      )}

      {helperText && (
        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
          {helperText}
        </span>
      )}
    </div>
  );
};
