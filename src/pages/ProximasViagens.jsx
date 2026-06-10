import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useTrips } from '../hooks/useTrips';
import whatsappIcon from '../assets/whatsapp.png';
import costaAmalfitana from '../assets/costa_amalfitana.png';

import { useSettings } from '../context/SettingsContext';

export default function ProximasViagens() {
  const { settings } = useSettings();
  const monthOrder = {
    "Janeiro": 1, "Fevereiro": 2, "Março": 3, "Abril": 4, "Maio": 5, "Junho": 6,
    "Julho": 7, "Agosto": 8, "Setembro": 9, "Outubro": 10, "Novembro": 11, "Dezembro": 12
  };

  const { trips } = useTrips();

  // Ordena as viagens de forma cronológica
  const sortedTrips = [...trips].sort((a, b) => {
    // Evita erros se a.date ou b.date não forem válidos
    const dateA = a.date || "";
    const dateB = b.date || "";
    const [monthA, , yearA] = dateA.split(" ");
    const [monthB, , yearB] = dateB.split(" ");
    
    const valA = (parseInt(yearA) || 0) * 12 + (monthOrder[monthA] || 0);
    const valB = (parseInt(yearB) || 0) * 12 + (monthOrder[monthB] || 0);
    
    return valA - valB;
  });

  const openWhatsApp = (trip) => {
    let text = "";
    if (trip.status === "Esgotado") {
      text = `Olá! Gostaria de entrar na lista de espera para o grupo de "${trip.title}" (${trip.date}) com a La Dolce Vita.`;
    } else {
      text = `Olá! Tenho interesse em reservar minha vaga no grupo de "${trip.title}" para ${trip.date}. Como posso proceder?`;
    }
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="proximas-viagens-page animate-fade-in">
      {/* 1. HERO HEADER BANNER */}
      <section className="viagens-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(26, 38, 29, 0.7) 0%, rgba(26, 38, 29, 0.82) 100%), url(${costaAmalfitana})` }}>
        <div className="container viagens-hero-content text-center">
          <span className="hero-tag-gold">Experiências Compartilhadas</span>
          <h1>Próximas Viagens</h1>
          <p>Roteiros exclusivos e curados em pequenos grupos de afinidade. Junte-se a nós em saídas confirmadas para os destinos mais fascinantes.</p>
        </div>
        
        {/* Divisor em Arco Romano */}
        <div className="hero-divider-curve">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,90 Q720,20 1440,90 L1440,120 L0,120 Z" fill="#FAF8F5"></path>
          </svg>
        </div>
      </section>

      {/* 2. CRONOGRAMA DE SAÍDAS */}
      <section className="timeline-section container">
        <div className="timeline-intro text-center reveal">
          <h2>Calendário de Saídas Confirmadas</h2>
          <p>Encontros sob medida com toda a logística de luxo, hospedagem charmosa e passeios privativos inclusos.</p>
        </div>

        <div className="timeline-list">
          {sortedTrips.map((trip) => {
            const [month, , year] = trip.date.split(" ");
            const shortMonth = month.substring(0, 3).toUpperCase();
            
            // Definição de cores e porcentagem das vagas preenchidas
            const spotsBooked = trip.spotsTotal - trip.spotsLeft;
            const progressPercent = Math.min(100, (spotsBooked / trip.spotsTotal) * 100);
            
            let statusIcon = <CheckCircle size={16} className="text-green" />;
            let statusClass = "status-aberto";
            let statusText = "Inscrições Abertas";

            if (trip.status === "Esgotado") {
              statusIcon = <XCircle size={16} className="text-muted" />;
              statusClass = "status-esgotado";
              statusText = "Grupo Esgotado";
            } else if (trip.status === "Vagas Limitadas" || trip.spotsLeft <= 3) {
              statusIcon = <AlertCircle size={16} className="text-red" />;
              statusClass = "status-limitado";
              statusText = "Últimas Vagas!";
            }

            const delayClass = `reveal-delay-${(sortedTrips.indexOf(trip) % 3) + 1}`;
            return (
              <div key={trip.id} className={`timeline-item ${trip.status === "Esgotado" ? "item-esgotado" : ""} reveal ${delayClass}`}>
                {/* Coluna 1: Data */}
                <div className="date-column">
                  <span className="date-month">{shortMonth}</span>
                  <span className="date-year">{year}</span>
                  <div className="date-line-connector"></div>
                </div>

                {/* Coluna 2: Card de Informações */}
                <div className="card-column glass-card">
                  <div className="trip-img-wrapper">
                    <img src={trip.image} alt={trip.title} className="trip-thumb-img" />
                    {trip.status === "Esgotado" && <span className="badge-esgotado-overlay">Esgotado</span>}
                  </div>
                  
                  <div className="trip-details-content">
                    <span className="trip-country-tag">{trip.country}</span>
                    <h3>{trip.title}</h3>
                    <p className="trip-summary-desc">{trip.description}</p>
                    
                    <div className="trip-meta-info-grid">
                      <div className="meta-info-item">
                        <Clock size={16} className="meta-icon" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="meta-info-item">
                        <MapPin size={16} className="meta-icon" />
                        <span>Partindo de {trip.departure}</span>
                      </div>
                    </div>

                    <div className="trip-route-chips-row">
                      {trip.route.slice(0, 4).map((city, idx) => (
                        <span key={idx} className="timeline-route-chip">{city}</span>
                      ))}
                      {trip.route.length > 4 && <span className="timeline-route-chip-more">+{trip.route.length - 4} mais</span>}
                    </div>
                  </div>
                </div>

                {/* Coluna 3: Indicador de Vagas e Ação */}
                <div className="action-column glass-card">
                  <div className="price-box">
                    <span className="price-label">Valor do Roteiro</span>
                    <span className="price-value">{trip.price}</span>
                    <span className="price-sub">Por pessoa em quarto duplo</span>
                  </div>

                  {/* Barra de Progresso de Vagas */}
                  <div className="spots-status-area">
                    <div className="spots-status-text">
                      <div className="status-label">
                        {statusIcon}
                        <span className={`status-badge-text ${statusClass}`}>{statusText}</span>
                      </div>
                      <span className="spots-counter">
                        {trip.status === "Esgotado" ? "Sem vagas" : `${trip.spotsLeft} de ${trip.spotsTotal} livres`}
                      </span>
                    </div>
                    <div className="spots-progress-container">
                      <div 
                        className={`spots-progress-fill ${trip.status === "Esgotado" ? "fill-esgotado" : trip.spotsLeft <= 3 ? "fill-urgente" : "fill-normal"}`} 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => openWhatsApp(trip)} 
                    className={`btn btn-timeline-cta ${trip.status === "Esgotado" ? "btn-espera" : "btn-reserva"}`}
                  >
                    <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-timeline-icon" />
                    <span>{trip.status === "Esgotado" ? "Lista de Espera" : "Quero Participar"}</span>
                    <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. BENEFÍCIOS DOS GRUPOS */}
      <section className="group-benefits-section reveal">
        <div className="container">
          <div className="text-center section-header">
            <span className="section-tag">Diferenciais</span>
            <h2 className="section-title">Como funcionam nossos grupos</h2>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card reveal reveal-delay-1">
              <div className="benefit-icon-wrapper">01</div>
              <h4>Grupos Reduzidos</h4>
              <p>Limitamos as saídas a no máximo 10 a 12 pessoas. Isso garante atenção total do guia, flexibilidade nos passeios e maior proximidade.</p>
            </div>
            <div className="benefit-card reveal reveal-delay-2">
              <div className="benefit-icon-wrapper">02</div>
              <h4>Hospedagem Charmosa</h4>
              <p>Priorizamos hotéis boutique locais, vilas históricas e estalagens repletas de história que oferecem charme e conforto no lugar de redes de hotéis padronizadas.</p>
            </div>
            <div className="benefit-card reveal reveal-delay-3">
              <div className="benefit-icon-wrapper">03</div>
              <h4>Experiências Fora do Roteiro</h4>
              <p>Nossos guias locais abrem portas para vinícolas secretas, oficinas de artesãos locais e almoços em casas de família exclusivos do nosso grupo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTILOS DA PÁGINA */}
      <style>{`
        .proximas-viagens-page {
          padding-bottom: 80px;
          background-color: var(--color-bg-light);
        }

        /* 1. HERO BANNER */
        .viagens-hero {
          background-size: cover;
          background-position: center;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--header-height);
        }

        .viagens-hero-content {
          max-width: 850px;
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

        .viagens-hero-content h1 {
          font-family: var(--font-title);
          font-size: 4.5rem;
          color: #FFFFFF;
          font-weight: 400;
          margin-bottom: 16px;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .viagens-hero-content p {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          line-height: 1.6;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        /* Divisor em Arco Romano */
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

        /* 2. TIMELINE SECTION */
        .timeline-section {
          margin-top: 60px;
          margin-bottom: 80px;
        }

        .timeline-intro {
          max-width: 700px;
          margin: 0 auto 60px auto;
        }

        .timeline-intro h2 {
          font-family: var(--font-title);
          font-size: 2.8rem;
          color: var(--color-dark-green);
          margin-bottom: 12px;
          font-weight: 400;
        }

        .timeline-intro p {
          font-size: 1.05rem;
          color: var(--color-text-muted);
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 100px 1.8fr 1fr;
          gap: 30px;
          position: relative;
        }

        /* Coluna 1: Data */
        .date-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 24px;
          position: relative;
        }

        .date-month {
          font-family: var(--font-title);
          font-size: 2.2rem;
          color: var(--color-primary-gold-dark);
          line-height: 1;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .date-year {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .date-line-connector {
          width: 1px;
          flex-grow: 1;
          background-color: var(--color-primary-gold-light);
          margin-top: 20px;
          opacity: 0.5;
        }

        .timeline-item:last-child .date-line-connector {
          display: none; /* Não exibe o conector no último item */
        }

        /* Coluna 2: Card de Detalhes */
        .card-column {
          display: grid;
          grid-template-columns: 240px 1fr;
          overflow: hidden;
          background-color: var(--color-bg-white);
          border-radius: 4px;
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(197, 168, 128, 0.1);
          transition: var(--transition-smooth);
        }

        .timeline-item:hover .card-column {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(197, 168, 128, 0.25);
        }

        .trip-img-wrapper {
          position: relative;
          height: 100%;
          min-height: 200px;
          overflow: hidden;
        }

        .trip-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s ease;
        }

        .timeline-item:hover .trip-thumb-img {
          transform: scale(1.08);
        }

        .badge-esgotado-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(26, 38, 29, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          backdrop-filter: blur(2px);
        }

        .trip-details-content {
          padding: 24px 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .trip-country-tag {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-primary-gold-dark);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 6px;
        }

        .trip-details-content h3 {
          font-family: var(--font-title);
          font-size: 2rem;
          color: var(--color-dark-green);
          font-weight: 400;
          margin-bottom: 8px;
        }

        .trip-summary-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .trip-meta-info-grid {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .meta-info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .meta-icon {
          color: var(--color-primary-gold-dark);
        }

        .trip-route-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .timeline-route-chip {
          background-color: var(--color-bg-light);
          color: var(--color-dark-green);
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 30px;
          border: 1px solid rgba(197, 168, 128, 0.1);
        }

        .timeline-route-chip-more {
          color: var(--color-primary-gold-dark);
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 6px;
          align-self: center;
        }

        /* Coluna 3: Ação e Preços */
        .action-column {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 30px;
          background-color: var(--color-bg-white);
          border-radius: 4px;
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(197, 168, 128, 0.1);
          transition: var(--transition-smooth);
        }

        .timeline-item:hover .action-column {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(197, 168, 128, 0.25);
        }

        .price-box {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2px;
        }

        .price-value {
          font-family: var(--font-title);
          font-size: 2.2rem;
          color: var(--color-dark-green-dark);
          line-height: 1.1;
          font-weight: 500;
        }

        .price-sub {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          margin-top: 2px;
        }

        /* Progresso das Vagas */
        .spots-status-area {
          margin: 16px 0;
        }

        .spots-status-text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          font-size: 0.8rem;
        }

        .status-label {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-badge-text {
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-aberto { color: #2C3D30; }
        .status-limitado { color: var(--color-accent-red); }
        .status-esgotado { color: var(--color-text-muted); }

        .spots-counter {
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .spots-progress-container {
          width: 100%;
          height: 6px;
          background-color: var(--color-bg-cream);
          border-radius: 30px;
          overflow: hidden;
        }

        .spots-progress-fill {
          height: 100%;
          border-radius: 30px;
          transition: width 1s ease-in-out;
        }

        .fill-normal { background-color: var(--color-primary-gold); }
        .fill-urgente { background-color: var(--color-accent-red); }
        .fill-esgotado { background-color: var(--color-text-muted); opacity: 0.3; }

        /* Botão CTA */
        .btn-timeline-cta {
          width: 100%;
          justify-content: center;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          padding: 12px 20px;
          border-radius: var(--border-radius-sm);
        }

        .btn-reserva {
          background-color: var(--color-dark-green);
          color: #FFFFFF;
          border-color: var(--color-dark-green);
        }

        .btn-reserva:hover {
          background-color: var(--color-primary-gold);
          border-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(197, 168, 128, 0.3);
        }

        .btn-espera {
          background-color: transparent;
          color: var(--color-text-muted);
          border: 1px solid var(--color-text-muted);
        }

        .btn-espera:hover {
          background-color: var(--color-text-muted);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .whatsapp-timeline-icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .btn-espera:hover .whatsapp-timeline-icon {
          filter: brightness(0) invert(1);
        }

        .btn-reserva:hover .whatsapp-timeline-icon {
          filter: brightness(0);
        }

        /* Estilos de Esgotado */
        .item-esgotado {
          opacity: 0.8;
        }
        
        .item-esgotado .card-column {
          border-color: rgba(0,0,0,0.05);
        }

        /* 3. BENEFICIOS SECT */
        .group-benefits-section {
          background-color: var(--color-bg-cream);
          padding: 80px 0;
          border-top: 1px solid var(--glass-border);
        }

        .section-header {
          margin-bottom: 50px;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .benefit-card {
          background-color: var(--color-bg-light);
          padding: 40px 30px;
          border-radius: 4px;
          border: 1px solid rgba(197, 168, 128, 0.15);
          box-shadow: var(--shadow-subtle);
          transition: var(--transition-smooth);
        }

        .benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-medium);
          border-color: var(--color-primary-gold);
        }

        .benefit-icon-wrapper {
          font-family: var(--font-title);
          font-size: 2.5rem;
          color: var(--color-primary-gold-dark);
          line-height: 1;
          margin-bottom: 20px;
          font-weight: 300;
        }

        .benefit-card h4 {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-dark-green);
          margin-bottom: 12px;
        }

        .benefit-card p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--color-text-muted);
        }

        /* Cores Auxiliares */
        .text-green { color: #2C3D30; }
        .text-red { color: var(--color-accent-red); }
        .text-muted { color: var(--color-text-muted); }

        /* RESPONSIVIDADE */
        @media (max-width: 1100px) {
          .timeline-item {
            grid-template-columns: 80px 1.5fr 1fr;
            gap: 20px;
          }
          .card-column {
            grid-template-columns: 180px 1fr;
          }
        }

        @media (max-width: 992px) {
          .timeline-item {
            grid-template-columns: 1fr;
            gap: 15px;
            border-bottom: 1px solid rgba(197, 168, 128, 0.15);
            padding-bottom: 40px;
          }

          .date-column {
            flex-direction: row;
            gap: 12px;
            align-items: center;
            padding-top: 0;
            justify-content: flex-start;
          }

          .date-line-connector {
            display: none !important;
          }

          .card-column {
            grid-template-columns: 1fr;
          }

          .trip-img-wrapper {
            height: 200px;
          }

          .action-column {
            gap: 20px;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .viagens-hero-content h1 {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .viagens-hero {
            height: 380px;
          }
          .viagens-hero-content h1 {
            font-size: 2.8rem;
          }
          .viagens-hero-content p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
