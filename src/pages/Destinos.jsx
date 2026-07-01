import React, { useState } from 'react';
import { ArrowRight, X, UserCheck, Compass, Heart, Shield, RefreshCw } from 'lucide-react';
import { useDestinations } from '../hooks/useDestinations';

// Importando imagens para uso
import heroTuscany from '../assets/hero_tuscany.png';
import whatsappIcon from '../assets/whatsapp.png';

import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function Destinos() {
  const [activeDestination, setActiveDestination] = useState(null);

  const { destinations, loading: destinationsLoading } = useDestinations();
  const { settings } = useSettings();
  const { t } = useLanguage();

  const isCountryRedundant = (country, title) => {
    if (!country || !title) return false;
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    return norm(country) === norm(title);
  };

  const openWhatsApp = (destinationName = null) => {
    let text = t(
      "Olá! Gostaria de conversar com um especialista em viagens da La Dolce Vita.",
      "Hello! I would like to speak with a La Dolce Vita travel specialist."
    );
    if (destinationName) {
      text = t(
        `Olá! Vi o destino "${destinationName}" no site da La Dolce Vita e gostaria de planejar uma viagem personalizada.`,
        `Hello! I saw the destination "${destinationName}" on the La Dolce Vita website and would like to plan a custom trip.`
      );
    }
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="destinos-page-wrapper animate-fade-in">
      {/* 1. HERO HEADER BANNER (Editorial com imagem de fundo) */}
      <section className="destinos-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(26, 38, 29, 0.7) 0%, rgba(26, 38, 29, 0.8) 100%), url(${heroTuscany})` }}>
        <div className="container destinos-hero-content text-center">
          <h1>{t("Destinos", "Destinations")}</h1>
          <p>{t("Lugares que encantam, histórias que ficam e experiências que transformam cada viagem em algo único.", "Places that enchant, stories that stay, and experiences that transform each trip into something unique.")}</p>
        </div>

        {/* Divisor de curva assimétrica elegante */}
        <div className="hero-divider-curve">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C480,30 960,110 1440,110 L1440,120 L0,120 Z" fill="#FAF8F5"></path>
          </svg>
        </div>
      </section>

      {/* 2. GRID DE DESTINOS */}
      <div className="container destinations-cards-section">
        {destinationsLoading ? (
          <div className="no-results text-center" style={{ padding: '60px 0' }}>
            <RefreshCw size={32} style={{ color: 'var(--color-primary-gold)', animation: 'spin-filter 2s linear infinite', marginBottom: '16px' }} />
            <p style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', color: 'var(--color-dark-green)' }}>{t("Carregando destinos...", "Loading destinations...")}</p>
            <style>{`@keyframes spin-filter { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
          </div>
        ) : destinations.length === 0 ? (
          <div className="no-results text-center">
            <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.8rem', color: 'var(--color-dark-green)', marginBottom: '12px' }}>
              {t('Nenhum destino disponível no momento', 'No destinations available at the moment')}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>{t("Em breve adicionaremos novos destinos incríveis aqui.", "We will add new amazing destinations here soon.")}</p>
          </div>
        ) : (
          <div className="destinations-grid">
            <style>{`
              @keyframes card-fade-in {
                from { opacity: 0; transform: translateY(28px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            {destinations.map((dest, idx) => {
              return (
                <div
                  key={dest.docId || dest.id}
                  className="destination-card"
                  style={{
                    animation: `card-fade-in 0.55s cubic-bezier(0.25,0.46,0.45,0.94) both`,
                    animationDelay: `${(idx % 3) * 0.12}s`
                  }}
                  onClick={() => setActiveDestination(dest)}
                >
                  <div className="card-image-wrapper">
                    <img src={dest.image} alt={t(dest.title)} className="card-image" />
                  </div>
                  <div className="card-content">
                    {!isCountryRedundant(dest.country, dest.title) && (
                      <span className="card-country">{t(dest.country)}</span>
                    )}
                    <h3 className="card-title">{t(dest.title)}</h3>
                    <p className="card-desc">{t(dest.description)}</p>
                    
                    <button className="card-saiba-mais-btn">
                      <span>{t("SAIBA MAIS", "LEARN MORE")}</span>
                      <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. BOTÃO CONVERSAR COM ESPECIALISTA CENTRAL */}
      <div className="container text-center text-cta-wrapper">
        <button onClick={() => openWhatsApp()} className="btn btn-whatsapp-premium btn-large">
          <img src={whatsappIcon} alt="WhatsApp" className="cta-whatsapp-icon" style={{ width: '20px', height: '20px', marginRight: '10px', objectFit: 'contain' }} />
          <span>{t("Fale com um especialista", "Talk to an expert")}</span>
        </button>
      </div>

      {/* 5. BANNER CONSULTA PERSONALIZADA (Não encontrou o destino?) */}
      <section className="container custom-route-banner-section reveal">
        <div className="custom-route-card">
          <div className="custom-route-text">
            <div className="compass-icon-wrapper">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </div>
            <div>
              <h3>{t("Não encontrou o destino que procura?", "Didn't find the destination you're looking for?")}</h3>
              <p>{t("Montamos roteiros personalizados para lugares incríveis ao redor do mundo.", "We build custom itineraries for amazing places around the world.")}</p>
            </div>
          </div>
          <button onClick={() => openWhatsApp("Roteiro Personalizado")} className="btn btn-outline-gold-whatsapp">
            <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon-gold-btn" style={{ width: '18px', height: '18px', marginRight: '8px', objectFit: 'contain' }} />
            <span>{t("Fale no WhatsApp", "Chat on WhatsApp")}</span>
          </button>
        </div>
      </section>

      {/* 6. USP HORIZONTAL BAR */}
      <section className="container usp-bar-section reveal">
        <div className="usp-bar-wrapper">
          <div className="usp-bar-item">
            <UserCheck size={20} className="usp-bar-icon" />
            <div>
              <strong>{t("Atendimento personalizado", "Personalized service")}</strong>
              <p>{t("Cuidamos de cada detalhe da sua viagem do início ao fim.", "We take care of every detail of your trip from start to finish.")}</p>
            </div>
          </div>
          <div className="usp-bar-item">
            <Compass size={20} className="usp-bar-icon" />
            <div>
              <strong>{t("Experiências autênticas", "Authentic experiences")}</strong>
              <p>{t("Vivencie o destino de forma única e verdadeira.", "Experience the destination in a unique and true way.")}</p>
            </div>
          </div>
          <div className="usp-bar-item">
            <Heart size={20} className="usp-bar-icon" />
            <div>
              <strong>{t("Parcerias de confiança", "Trusted partnerships")}</strong>
              <p>{t("Trabalhamos com os melhores fornecedores locais.", "We work with the best local suppliers.")}</p>
            </div>
          </div>
          <div className="usp-bar-item">
            <Shield size={20} className="usp-bar-icon" />
            <div>
              <strong>{t("Suporte completo", "Complete support")}</strong>
              <p>{t("Estamos com você antes, durante e depois da viagem.", "We are with you before, during, and after the trip.")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DETALHE DO DESTINO */}
      {activeDestination && (
        <div className="modal-backdrop" onClick={() => setActiveDestination(null)}>
          <div className="modal-content glass-card animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveDestination(null)}>
              <X size={20} />
            </button>

            <div className="modal-body">
              {/* Imagem Superior */}
              <div className="modal-header-image" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75)), url(${activeDestination.image})` }}>
                <div className="modal-header-text">
                  {!isCountryRedundant(activeDestination.country, activeDestination.title) && (
                    <span className="modal-badge-country">{t(activeDestination.country)}</span>
                  )}
                  <h2>{t(activeDestination.title)}</h2>
                  <div className="modal-quick-meta" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {activeDestination.tags && activeDestination.tags.map((tag, i) => (
                      <span key={i} className="route-chip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Informações detalhadas */}
              <div className="modal-inner-content">
                <div className="modal-details-left">
                  <h3>{t("Sobre o Destino", "About the Destination")}</h3>
                  <p className="modal-description">{t(activeDestination.description)}</p>

                  {activeDestination.highlights && activeDestination.highlights.length > 0 && (
                    <>
                      <h3 style={{ marginTop: '28px' }}>{t("Destaques e Experiências", "Highlights & Experiences")}</h3>
                      <div className="modal-route-chips" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                        {activeDestination.highlights.map((highlight, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-gold)', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>{t(highlight)}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="modal-details-sidebar">
                  <div className="sidebar-box-gold">
                    <h4>{t("Planeje sua Viagem", "Plan your Trip")}</h4>
                    <p className="sidebar-price-info" style={{ fontSize: '0.9rem', marginBottom: '20px', color: 'var(--color-dark-green-dark)' }}>
                      {t(
                        "Esse é um de nossos destinos exclusivos. Podemos criar um roteiro sob medida para você ou incluir você em nossos próximos grupos.",
                        "This is one of our exclusive destinations. We can create a tailor-made itinerary for you or include you in our next groups."
                      )}
                    </p>
                    
                    <button 
                      onClick={() => openWhatsApp(t(activeDestination.title))} 
                      className="btn btn-primary w-full btn-sidebar-cta"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <span>{t("Personalizar Roteiro", "Customize Itinerary")}</span>
                      <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESTILOS DA PÁGINA DESTINOS */}
      <style>{`
        .destinos-page-wrapper {
          padding-bottom: 60px;
        }

        /* 1. HERO HEADER BANNER */
        .destinos-hero {
          position: relative;
          background-size: cover;
          background-position: center 30%;
          height: 450px;
          padding-top: var(--header-height);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Transição em curva assimétrica para a próxima seção */
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

        .destinos-hero-content {
          max-width: 800px;
        }

        .destinos-hero-content h1 {
          font-family: var(--font-title);
          font-size: 4.5rem;
          color: #FFFFFF;
          font-weight: 400;
          margin-bottom: 16px;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .destinos-hero-content p {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          line-height: 1.6;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        /* 2. FILTROS POR PILLS */
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

        /* 3. CARD GRID LAYOUT */
        .destinations-cards-section {
          margin-bottom: 50px;
        }

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .destination-card {
          background-color: var(--color-bg-white);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(197, 168, 128, 0.1);
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .destination-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(197, 168, 128, 0.3);
        }

        .card-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s ease;
        }

        .destination-card:hover .card-image {
          transform: scale(1.08);
        }

        .card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          color: var(--color-bg-light);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 6px 12px;
          border-radius: 2px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .card-badge.badge-ativo {
          background-color: var(--color-dark-green);
        }

        .card-badge.badge-vagas-limitadas {
          background-color: var(--color-accent-red);
        }

        .card-badge.badge-esgotado {
          background-color: var(--color-text-muted);
        }

        .destination-card.esgotado .card-image {
          filter: grayscale(0.5) contrast(0.9) brightness(0.8);
        }

        .card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-country {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-primary-gold-dark);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 6px;
        }

        .card-title {
          font-family: var(--font-title);
          font-size: 1.8rem;
          color: var(--color-dark-green);
          margin-bottom: 10px;
          font-weight: 400;
        }

        .card-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 24px;
          color: var(--color-text-muted);
          flex-grow: 1;
        }

        .card-saiba-mais-btn {
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          color: var(--color-primary-gold-dark);
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0;
          cursor: pointer;
          transition: var(--transition-fast);
          align-self: flex-start;
        }

        .destination-card:hover .card-saiba-mais-btn {
          color: var(--color-dark-green);
        }

        /* 4. BOTÃO CONVERSAR COM ESPECIALISTA CENTRAL */
        .text-cta-wrapper {
          margin: 40px auto 70px auto;
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
          position: relative;
          overflow: hidden;
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

        /* 5. BANNER CONSULTA PERSONALIZADA */
        .custom-route-banner-section {
          margin-bottom: 80px;
        }

        .custom-route-card {
          background-color: var(--color-bg-cream);
          border: 1px solid var(--color-primary-gold-light);
          padding: 30px 48px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .custom-route-text {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .compass-icon-wrapper {
          color: var(--color-primary-gold-dark);
          flex-shrink: 0;
        }

        .custom-route-text h3 {
          font-family: var(--font-title);
          font-size: 1.8rem;
          color: var(--color-dark-green-dark);
          margin-bottom: 4px;
          font-weight: 400;
        }

        .custom-route-text p {
          font-size: 0.95rem;
          color: var(--color-text-muted);
        }

        .btn-outline-gold-whatsapp {
          background: none;
          border: 1px solid var(--color-primary-gold-dark);
          color: var(--color-primary-gold-dark);
          padding: 12px 24px;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: var(--transition-smooth);
        }

        .btn-outline-gold-whatsapp:hover {
          background-color: var(--color-primary-gold-dark);
          color: #FFFFFF;
        }

        .whatsapp-icon-gold-btn {
          filter: brightness(0.4) sepia(1) saturate(5) hue-rotate(10deg);
          transition: var(--transition-fast);
        }

        .btn-outline-gold-whatsapp:hover .whatsapp-icon-gold-btn {
          filter: brightness(0) invert(1);
        }

        /* 6. USP HORIZONTAL BAR */
        .usp-bar-section {
          border-top: 1px solid var(--color-bg-cream);
          padding-top: 40px;
          margin-bottom: 40px;
        }

        .usp-bar-wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .usp-bar-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .usp-bar-icon {
          color: var(--color-primary-gold-dark);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .usp-bar-item strong {
          display: block;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-dark-green);
          margin-bottom: 4px;
          letter-spacing: 0.02em;
        }

        .usp-bar-item p {
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--color-text-muted);
        }

        /* MODAL BACKDROP & DETAILS */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(26, 38, 29, 0.65);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .modal-content {
          background-color: var(--color-bg-light);
          width: 100%;
          max-width: 1000px;
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-premium);
          position: relative;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: rgba(0,0,0,0.5);
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

        .modal-close-btn:hover {
          background-color: rgba(0,0,0,0.8);
          transform: scale(1.1);
        }

        .modal-body {
          overflow-y: auto;
          flex-grow: 1;
        }

        .modal-header-image {
          height: 320px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 40px;
          color: #FFFFFF;
        }

        .modal-header-text {
          position: relative;
          z-index: 10;
        }

        .modal-badge-country {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-primary-gold);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 8px;
        }

        .modal-header-text h2 {
          font-family: var(--font-title);
          font-size: 2.8rem;
          color: #FFFFFF;
          margin-bottom: 16px;
          line-height: 1.1;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .modal-quick-meta {
          display: flex;
          gap: 24px;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .modal-quick-meta span {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-inner-content {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 48px;
          padding: 40px;
        }

        .modal-description {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-text-muted);
        }

        .modal-route-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .route-chip {
          background-color: var(--color-bg-cream);
          color: var(--color-dark-green);
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 30px;
          border: 1px solid rgba(197, 168, 128, 0.15);
        }

        /* ITINERARY */
        .itinerary-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 18px;
          position: relative;
        }

        .itinerary-list::before {
          content: '';
          position: absolute;
          top: 0;
          left: 45px;
          width: 1px;
          height: 100%;
          background-color: var(--color-primary-gold-light);
          z-index: 1;
        }

        .itinerary-day-item {
          display: flex;
          gap: 30px;
          position: relative;
          z-index: 2;
        }

        .day-number {
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          width: 90px;
          height: 36px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .day-plan-content h4 {
          font-family: var(--font-title);
          font-size: 1.35rem;
          color: var(--color-dark-green);
          margin-bottom: 6px;
        }

        .day-plan-content p {
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* SIDEBAR */
        .sidebar-box-gold {
          background-color: var(--color-bg-cream);
          border: 1px solid var(--color-primary-gold-light);
          padding: 30px;
          border-radius: var(--border-radius-sm);
          position: sticky;
          top: 20px;
        }

        .sidebar-box-gold h4 {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary-gold-dark);
          margin-bottom: 12px;
        }

        .sidebar-price {
          font-family: var(--font-title);
          font-size: 2.5rem;
          color: var(--color-dark-green-dark);
          line-height: 1;
          margin-bottom: 8px;
        }

        .sidebar-price-info {
          font-size: 0.75rem;
          line-height: 1.4;
          margin-bottom: 24px;
        }

        .sidebar-details-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-top: 1px solid rgba(197, 168, 128, 0.2);
          padding-top: 20px;
        }

        .sidebar-detail-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .sidebar-detail-item strong {
          color: var(--color-text-dark);
        }

        .sidebar-detail-item span {
          color: var(--color-text-muted);
        }

        /* RESPONSIVIDADE */
        @media (max-width: 992px) {
          .destinos-hero-content h1 {
            font-size: 3.5rem;
          }

          .destinations-grid {
            grid-template-columns: 1fr 1fr;
          }

          .custom-route-card {
            flex-direction: column;
            text-align: center;
            padding: 30px;
          }

          .custom-route-text {
            flex-direction: column;
            gap: 10px;
          }

          .usp-bar-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .modal-inner-content {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 30px;
          }

          .modal-header-image {
            height: 240px;
            padding: 30px;
          }

          .modal-header-text h2 {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 768px) {
          .destinos-hero {
            height: 360px;
            padding-top: var(--header-height);
          }

          .hero-divider-curve {
            height: 30px;
          }

          .destinos-hero-content h1 {
            font-size: 2.8rem;
          }

          .destinations-grid {
            grid-template-columns: 1fr;
          }

          .usp-bar-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
