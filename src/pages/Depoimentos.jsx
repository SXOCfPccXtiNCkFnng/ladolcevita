import React from 'react';
import { Star, RefreshCw } from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';

export default function Depoimentos() {
  const { testimonials, loading } = useTestimonials();

  if (loading) {
    return (
      <div className="depoimentos-page container animate-fade-in text-center" style={{ padding: '100px 0', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <RefreshCw className="spinner-icon" size={36} style={{ color: 'var(--color-primary-gold)', animation: 'spin 2s linear infinite' }} />
        <p style={{ fontFamily: 'var(--font-title)', fontSize: '1.2rem', color: 'var(--color-dark-green)' }}>Carregando depoimentos...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="depoimentos-page container animate-fade-in">
      {/* Cabeçalho */}
      <div className="page-header text-center">
        <span className="section-tag">Histórias de Nossos Viajantes</span>
        <h1 className="page-title">Relatos de Experiências</h1>
        <p className="page-subtitle">A satisfação e as memórias de quem escolheu explorar o mundo através da curadoria cuidadosa da La Dolce Vita.</p>
      </div>

      {/* Grid de Depoimentos */}
      <div className="testimonials-masonry-grid">
        {testimonials.map(t => (
          <div key={t.docId || t.id} className="testimonial-masonry-card glass-card">
            <div className="stars-wrapper">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} size={16} fill="#C5A880" color="#C5A880" />
              ))}
            </div>
            
            <blockquote className="testimonial-quote-box">
              <span className="quote-icon">“</span>
              <p className="quote-content-text">{t.text}</p>
            </blockquote>

            <div className="author-details-box">
              <h4 className="author-name">{t.name}</h4>
              <span className="author-location-info">{t.location}</span>
              <span className="author-trip-tag">Viagem: {t.trip}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .depoimentos-page {
          padding-top: 50px;
          padding-bottom: 100px;
        }

        .page-header {
          margin-bottom: 60px;
        }

        .page-title {
          font-size: 3.5rem;
          color: var(--color-dark-green);
          margin-top: 10px;
          margin-bottom: 16px;
        }

        .page-subtitle {
          max-width: 680px;
          margin: 0 auto;
          font-size: 1.1rem;
        }

        /* Masonry Grid */
        .testimonials-masonry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .testimonial-masonry-card {
          padding: 36px 30px;
          border-radius: var(--border-radius-md);
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
        }

        .testimonial-masonry-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(197, 168, 128, 0.35);
        }

        .stars-wrapper {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }

        .testimonial-quote-box {
          position: relative;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .quote-icon {
          position: absolute;
          top: -24px;
          left: -8px;
          font-family: var(--font-title);
          font-size: 5rem;
          color: var(--color-primary-gold);
          opacity: 0.18;
          line-height: 1;
          user-select: none;
        }

        .quote-content-text {
          font-family: var(--font-title);
          font-size: 1.35rem;
          font-style: italic;
          color: var(--color-dark-green);
          line-height: 1.5;
          position: relative;
          z-index: 2;
        }

        .author-details-box {
          border-top: 1px solid rgba(197, 168, 128, 0.15);
          padding-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .author-name {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text-dark);
        }

        .author-location-info {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .author-trip-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-primary-gold-dark);
          margin-top: 4px;
        }

        @media (max-width: 992px) {
          .testimonials-masonry-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-masonry-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
