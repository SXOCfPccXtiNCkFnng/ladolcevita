import React, { useState } from 'react';
import { X, Play, Camera, Video, MapPin, Calendar, ArrowRight, RefreshCw } from 'lucide-react';
import { useMoments } from '../hooks/useMoments';
import whatsappIcon from '../assets/whatsapp.png';
import pugliaDestination from '../assets/puglia_destination.png';

import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function NossosMomentos() {
  const { settings } = useSettings();
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('Todos'); // 'Todos' | 'Itália' | 'Portugal' | 'Experiências'
  const [activeMedia, setActiveMedia] = useState(null); // Para o lightbox modal

  const { moments, loading: momentsLoading } = useMoments();

  // Filtragem dos momentos
  const filteredMoments = moments.filter(moment => {
    if (selectedFilter === 'Todos') return true;
    return moment.category === selectedFilter;
  });

  const openWhatsApp = () => {
    const text = encodeURIComponent(t(
      "Olá! Vi a galeria de 'Nossos Momentos' no site da La Dolce Vita e gostaria de planejar minha viagem.",
      "Hello! I saw the 'Our Moments' gallery on the La Dolce Vita website and would like to plan my trip."
    ));
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${text}`, '_blank');
  };

  return (
    <div className="momentos-page-wrapper animate-fade-in">
      {/* 1. HERO HEADER BANNER */}
      <section className="momentos-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(26, 38, 29, 0.7) 0%, rgba(26, 38, 29, 0.85) 100%), url(${pugliaDestination})` }}>
        <div className="container momentos-hero-content text-center">
          <span className="hero-tag-gold">{t("Registros Reais", "Real Records")}</span>
          <h1>{t("Nossos Momentos", "Our Moments")}</h1>
          <p>{t("Instantes de risadas compartilhadas, brindes ao entardecer e memórias esculpidas em nossas saídas exclusivas.", "Instants of shared laughter, toasts at sunset, and memories sculpted in our exclusive departures.")}</p>
        </div>

        {/* Divisor de onda orgânica suave */}
        <div className="hero-divider-curve">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,90 960,10 1440,50 L1440,120 L0,120 Z" fill="#FAF8F5"></path>
          </svg>
        </div>
      </section>

      {/* 2. FILTROS POR PILLS */}
      <div className="container filter-pills-container reveal">
        <div className="filter-pills-row">
          {['Todos', 'Itália', 'Portugal', 'Experiências'].map((filter) => (
            <button
              key={filter}
              className={`filter-pill-btn ${selectedFilter === filter ? 'active' : ''}`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter === 'Todos' ? t('Todos os momentos', 'All moments') : t(filter)}
            </button>
          ))}
        </div>
      </div>

      {/* 3. GALERIA DE MÍDIA */}
      <section className="container gallery-section">
        {momentsLoading ? (
          <div className="no-results text-center" style={{ padding: '60px 0' }}>
            <RefreshCw size={32} style={{ color: 'var(--color-primary-gold)', animation: 'spin-filter 2s linear infinite', marginBottom: '16px' }} />
            <p style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', color: 'var(--color-dark-green)' }}>{t("Carregando momentos...", "Loading moments...")}</p>
            <style>{`@keyframes spin-filter { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
          </div>
        ) : filteredMoments.length === 0 ? (
          <div className="no-results text-center">
            <h3>{t("Nenhuma lembrança registrada nesta categoria", "No memories recorded in this category")}</h3>
            <p>{t("Em breve adicionaremos novos registros exclusivos dos nossos grupos.", "We will soon add new exclusive records from our groups.")}</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {filteredMoments.map((moment, idx) => {
              const delayClass = `reveal-delay-${(idx % 3) + 1}`;
              return (
                <div 
                  key={moment.id} 
                  className={`gallery-card reveal ${delayClass}`} 
                  onClick={() => setActiveMedia(moment)}
                >
                  <div className="gallery-img-wrapper">
                    <img src={moment.image} alt={t(moment.title)} className="gallery-img" />
                    
                    {/* Indicador de Tipo (Foto/Vídeo) */}
                    <span className="media-type-badge">
                      {moment.type === 'video' ? <Video size={14} /> : <Camera size={14} />}
                    </span>

                    {/* Overlay de vídeo se for vídeo */}
                    {moment.type === 'video' && (
                      <div className="play-overlay">
                        <div className="play-button-icon">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    )}

                    {/* Overlay hover com informações */}
                    <div className="gallery-hover-overlay">
                      <div className="hover-content">
                        {moment.location && (
                          <span className="hover-location">
                            <MapPin size={12} style={{ marginRight: '4px' }} /> {t(moment.location)}
                          </span>
                        )}
                        {moment.title && <h3>{t(moment.title)}</h3>}
                        {moment.date && <p>{t(moment.date)}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. CTA SEÇÃO FINAL */}
      <section className="container cta-section-wrapper reveal">
        <div className="moments-cta-card">
          <div className="cta-content-left">
            <h2>{t("Quer escrever o seu próprio capítulo conosco?", "Want to write your own chapter with us?")}</h2>
            <p>{t("Junte-se a nós em nossas próximas saídas exclusivas e viva experiências que ficarão para sempre em sua memória.", "Join us on our next exclusive departures and live experiences that will stay forever in your memory.")}</p>
          </div>
          <button onClick={openWhatsApp} className="btn btn-whatsapp-premium btn-large">
            <img src={whatsappIcon} alt="WhatsApp" className="cta-whatsapp-icon" style={{ width: '20px', height: '20px', marginRight: '10px', objectFit: 'contain' }} />
            <span>{t('btn.plan')}</span>
          </button>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeMedia && (
        <div className="lightbox-backdrop" onClick={() => setActiveMedia(null)}>
          <div className="lightbox-content glass-card animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setActiveMedia(null)}>
              <X size={20} />
            </button>

            <div className="lightbox-body">
              <div className="lightbox-media-container">
                {activeMedia.type === 'video' ? (
                  <video 
                    src={activeMedia.videoUrl} 
                    className="lightbox-video" 
                    controls 
                    autoPlay 
                    playsInline
                  />
                ) : (
                  <img src={activeMedia.image} alt={t(activeMedia.title)} className="lightbox-img" />
                )}
              </div>

              <div className="lightbox-sidebar">
                <div className="sidebar-meta-row">
                  <span className="sidebar-category-tag">{t(activeMedia.category)}</span>
                  {activeMedia.date && (
                    <span className="sidebar-date">
                      <Calendar size={14} style={{ marginRight: '6px' }} /> {t(activeMedia.date)}
                    </span>
                  )}
                </div>
                {activeMedia.title && <h2>{t(activeMedia.title)}</h2>}
                {activeMedia.location && (
                  <p className="sidebar-location-text">
                    <MapPin size={16} style={{ color: 'var(--color-primary-gold-dark)', marginRight: '6px' }} /> {t(activeMedia.location)}
                  </p>
                )}
                
                {activeMedia.description && (
                  <>
                    <div className="divider-gold-fine"></div>
                    <p className="sidebar-description">{t(activeMedia.description)}</p>
                  </>
                )}

                <div className="sidebar-cta-box">
                  <h4>{t("Ficou com vontade de conhecer?", "Inspired to experience this?")}</h4>
                  <p>{t("Consulte a disponibilidade de roteiros semelhantes para este destino.", "Consult availability of similar itineraries for this destination.")}</p>
                  <button onClick={openWhatsApp} className="btn btn-whatsapp-premium w-full" style={{ width: '100%', marginTop: '16px' }}>
                    <span>{t("Falar no WhatsApp", "Chat on WhatsApp")}</span>
                    <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESTILOS DA PÁGINA NOSSOS MOMENTOS */}
      <style>{`
        .momentos-page-wrapper {
          padding-bottom: 80px;
          background-color: var(--color-bg-light);
        }

        /* 1. HERO HEADER BANNER */
        .momentos-hero {
          background-size: cover;
          background-position: center 30%;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--header-height);
        }

        .momentos-hero-content {
          max-width: 800px;
          z-index: 10;
        }

        .hero-tag-gold {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-primary-gold);
          display: inline-block;
          margin-bottom: 12px;
        }

        .momentos-hero-content h1 {
          font-family: var(--font-title);
          font-size: 4.5rem;
          color: #FFFFFF;
          font-weight: 400;
          margin-bottom: 16px;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .momentos-hero-content p {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          line-height: 1.6;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        .hero-divider-curve {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 60px;
          z-index: 15;
          pointer-events: none;
        }

        .hero-divider-curve svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* 2. FILTROS */
        .filter-pills-container {
          margin-top: 50px;
          margin-bottom: 40px;
          display: flex;
          justify-content: center;
        }

        .filter-pills-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-pill-btn {
          background-color: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          color: var(--color-text-dark);
          padding: 10px 24px;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-pill-btn:hover {
          border-color: var(--color-primary-gold);
          color: var(--color-primary-gold-dark);
        }

        .filter-pill-btn.active {
          background-color: var(--color-dark-green);
          border-color: var(--color-dark-green);
          color: var(--color-bg-light);
        }

        /* 3. GALERIA GRID */
        .gallery-section {
          margin-bottom: 70px;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .gallery-card {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          box-shadow: var(--shadow-subtle);
          cursor: pointer;
          transition: var(--transition-smooth);
          border: 1px solid rgba(197, 168, 128, 0.1);
        }

        .gallery-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(197, 168, 128, 0.3);
        }

        .gallery-img-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s ease;
        }

        .gallery-card:hover .gallery-img {
          transform: scale(1.08);
        }

        .media-type-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: rgba(26, 38, 29, 0.6);
          color: #FFFFFF;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          z-index: 10;
        }

        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 8;
        }

        .play-button-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.9);
          color: var(--color-dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: var(--transition-fast);
          padding-left: 2px;
        }

        .gallery-card:hover .play-button-icon {
          transform: scale(1.1);
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
        }

        .gallery-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(26, 38, 29, 0) 30%, rgba(26, 38, 29, 0.85) 100%);
          opacity: 0;
          transition: var(--transition-smooth);
          display: flex;
          align-items: flex-end;
          padding: 20px;
          z-index: 9;
        }

        .gallery-card:hover .gallery-hover-overlay {
          opacity: 1;
        }

        .hover-content {
          color: #FFFFFF;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }

        .gallery-card:hover .hover-content {
          transform: translateY(0);
        }

        .hover-location {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary-gold);
          display: inline-flex;
          align-items: center;
          margin-bottom: 4px;
        }

        .hover-content h3 {
          font-family: var(--font-title);
          font-size: 1.25rem;
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 2px;
        }

        .hover-content p {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        /* 4. CTA SEÇÃO FINAL */
        .cta-section-wrapper {
          margin-top: 60px;
          margin-bottom: 40px;
        }

        .moments-cta-card {
          background-color: var(--color-bg-cream);
          border: 1px solid var(--color-primary-gold-light);
          padding: 40px 48px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .cta-content-left h2 {
          font-family: var(--font-title);
          font-size: 2.2rem;
          color: var(--color-dark-green-dark);
          margin-bottom: 8px;
          font-weight: 400;
        }

        .cta-content-left p {
          font-size: 1rem;
          color: var(--color-text-muted);
          max-width: 600px;
        }

        .btn-whatsapp-premium {
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          border: 1px solid var(--color-primary-gold);
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-smooth);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-whatsapp-premium:hover {
          background-color: transparent;
          color: var(--color-dark-green);
          border-color: var(--color-dark-green);
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .cta-whatsapp-icon {
          filter: brightness(0);
          transition: var(--transition-fast);
        }

        .btn-whatsapp-premium:hover .cta-whatsapp-icon {
          filter: none;
        }

        /* LIGHTBOX BACKDROP */
        .lightbox-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(26, 38, 29, 0.85);
          backdrop-filter: blur(10px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .lightbox-content {
          background-color: var(--color-bg-light);
          width: 100%;
          max-width: 1100px;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-premium);
          position: relative;
          max-height: 90vh;
        }

        .lightbox-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: rgba(0,0,0,0.6);
          color: #FFFFFF;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          transition: var(--transition-fast);
        }

        .lightbox-close-btn:hover {
          background-color: rgba(0,0,0,0.9);
          transform: scale(1.1);
        }

        .lightbox-body {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          height: 100%;
          max-height: 90vh;
        }

        .lightbox-media-container {
          background-color: #0c120e;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          height: 520px;
        }

        .lightbox-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .lightbox-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          outline: none;
        }

        .lightbox-sidebar {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: auto;
          background-color: var(--color-bg-white);
        }

        .sidebar-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .sidebar-category-tag {
          background-color: var(--color-bg-cream);
          color: var(--color-primary-gold-dark);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          border-radius: 2px;
        }

        .sidebar-date {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
        }

        .lightbox-sidebar h2 {
          font-family: var(--font-title);
          font-size: 2.2rem;
          color: var(--color-dark-green-dark);
          line-height: 1.2;
          font-weight: 400;
          margin-bottom: 8px;
        }

        .sidebar-location-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-dark);
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }

        .divider-gold-fine {
          height: 1px;
          background-color: var(--color-primary-gold-light);
          margin-bottom: 24px;
          opacity: 0.5;
        }

        .sidebar-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin-bottom: 30px;
        }

        .sidebar-cta-box {
          background-color: var(--color-bg-light);
          padding: 24px;
          border-radius: 4px;
          border: 1px solid var(--glass-border);
          margin-top: auto;
        }

        .sidebar-cta-box h4 {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-dark-green);
          margin-bottom: 4px;
        }

        .sidebar-cta-box p {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }

        /* RESPONSIVIDADE */
        @media (max-width: 992px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .lightbox-body {
            grid-template-columns: 1fr;
          }
          .lightbox-media-container {
            height: 300px;
          }
          .lightbox-sidebar {
            padding: 24px;
          }
          .moments-cta-card {
            flex-direction: column;
            text-align: center;
            padding: 30px;
          }
          .momentos-hero-content h1 {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .momentos-hero {
            height: 380px;
          }
          .momentos-hero-content h1 {
            font-size: 2.8rem;
          }
          .momentos-hero-content p {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
