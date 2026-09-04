import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, ShoppingBag, Check } from 'lucide-react';
import { getResources, defaultResources } from '../services/api';
import { Resource } from '../types';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>(defaultResources);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'free' | 'premium'>('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    getResources().then(setResources);
  }, []);

  const filteredResources = resources.filter((r) => {
    if (filter === 'free') return r.type === 'free';
    if (filter === 'premium') return r.type === 'premium';
    return true;
  });

  const handleFreeDownload = (resource: Resource) => {
    const id = resource._id || resource.slug;
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(id);
      setTimeout(() => setDownloadSuccess(null), 3000);
      const element = document.createElement("a");
      const file = new Blob([`AlgoGrowthHub Resource: ${resource.title}\nThank you for downloading our exclusive playbook!`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${resource.slug || 'playbook'}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1200);
  };

  return (
    <main>
      <section className="section-white" style={{ paddingTop: '4.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div className="section-badge">
            <BookOpen size={14} />
            <span>Digital Library</span>
          </div>
          <h1 className="section-title">Growth Guides, Playbooks & Script Templates</h1>
          <p className="section-subtitle">
            Download battle-tested growth blueprints, viral short-form scripts, and agency client management SOPs.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
            <button
              onClick={() => setFilter('all')}
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Playbooks
            </button>
            <button
              onClick={() => setFilter('free')}
              className={`btn btn-sm ${filter === 'free' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Free Resources
            </button>
            <button
              onClick={() => setFilter('premium')}
              className={`btn btn-sm ${filter === 'premium' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Premium Kits
            </button>
          </div>
        </div>
      </section>

      <section className="section-soft section-padding">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredResources.map((res, idx) => {
              const resId = res._id || res.slug || String(idx);
              const isFree = res.type === 'free';

              return (
                <div
                  key={resId}
                  className="hub-card"
                  style={{
                    backgroundColor: 'var(--color-white)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    className="media-container"
                    style={{
                      aspectRatio: '16/10',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '1.25rem',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={res.thumbnail || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"}
                      alt={res.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '+0.06em',
                        backgroundColor: isFree ? '#10B981' : '#F59E0B',
                        color: '#FFFFFF',
                      }}
                    >
                      {isFree ? 'FREE' : `PREMIUM • ₹${res.price || 499}`}
                    </div>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.35,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {res.title}
                  </h2>

                  <p
                    style={{
                      fontSize: '0.92rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {res.description}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    {isFree ? (
                      <button
                        onClick={() => handleFreeDownload(res)}
                        disabled={downloadingId === resId}
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: '100%',
                          color: '#059669',
                          borderColor: '#A7F3D0',
                          backgroundColor: '#ECFDF5',
                        }}
                      >
                        {downloadSuccess === resId ? (
                          <>
                            <Check size={16} />
                            <span>Downloaded!</span>
                          </>
                        ) : downloadingId === resId ? (
                          <span>Preparing file...</span>
                        ) : (
                          <>
                            <Download size={16} />
                            <span>Download Free Playbook</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <Link
                        to={`/resources/${res.slug || 'premium-guide'}`}
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%' }}
                      >
                        <ShoppingBag size={16} />
                        <span>Unlock Premium (₹{res.price || 499})</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
