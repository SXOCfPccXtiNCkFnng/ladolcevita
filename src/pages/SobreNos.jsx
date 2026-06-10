import React from 'react';
import { Shield, Compass, Heart, Globe, Navigation, Plane, Clock } from 'lucide-react';

// Importando imagens
import toscanaStreetVertical from '../assets/toscana_street_vertical.png';
import sobreNosTable from '../assets/sobre_nos_table.png';
import whatsappIcon from '../assets/whatsapp.png';
import pugliaDestination from '../assets/puglia_destination.png';

import { useSettings } from '../context/SettingsContext';

export default function SobreNos() {
  const { settings } = useSettings();

  const openWhatsApp = (context = "") => {
    let message = "Olá! Gostaria de conversar com um especialista da La Dolce Vita.";
    if (context) {
      message = `Olá! Vi a seção de "${context}" no site da La Dolce Vita e gostaria de planejar meu roteiro.`;
    }
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="sobre-nos-page-wrapper animate-fade-in">
      {/* 1. HERO HEADER BANNER (Editorial com imagem de fundo) */}
      <section className="sobre-nos-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(26, 38, 29, 0.7) 0%, rgba(26, 38, 29, 0.85) 100%), url(${pugliaDestination})` }}>
        <div className="container sobre-nos-hero-content text-center">
          <span className="hero-tag-gold">Nossa Essência</span>
          <h1>Sobre Nós</h1>
          <p>Compartilhamos o que há de mais belo no mundo: lugares, culturas, sabores e histórias que ficam para sempre na memória.</p>
        </div>
        
        {/* Divisor de onda orgânica suave */}
        <div className="hero-divider-curve">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,90 1080,10 1440,30 L1440,120 L0,120 Z" fill="#FAF8F5"></path>
          </svg>
        </div>
      </section>

      {/* 2. CONTEÚDO (Story Intro Split) */}
      <section className="container hero-split-section reveal" style={{ marginTop: '50px' }}>
        <div className="hero-split-left">
          <h2 className="hero-tagline">Somos apaixonados por viagens e por criar experiências que transformam.</h2>
          
          <p className="hero-desc">
            Acreditamos que cada viagem é única e deve refletir os sonhos e o estilo de cada viajante. Por isso, cuidamos de cada detalhe para que você viva momentos inesquecíveis com segurança e tranquilidade.
          </p>
        </div>
        
        <div className="hero-split-right">
          <img src={toscanaStreetVertical} alt="Rua medieval na Toscana" className="hero-vertical-img" />
        </div>
      </section>

      {/* 2. USP BAR HORIZONTAL */}
      <section className="container usp-bar-section reveal">
        <div className="usp-bar-wrapper">
          <div className="usp-bar-item">
            <div className="usp-bar-icon-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l3 3"></path>
              </svg>
            </div>
            <div>
              <strong>Atendimento personalizado</strong>
              <p>Cuidamos de cada detalhe da sua viagem do início ao fim.</p>
            </div>
          </div>
          <div className="usp-bar-item">
            <div className="usp-bar-icon-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div>
              <strong>Experiências autênticas</strong>
              <p>Vivencie o destino de forma única e verdadeira.</p>
            </div>
          </div>
          <div className="usp-bar-item">
            <div className="usp-bar-icon-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <div>
              <strong>Parcerias de confiança</strong>
              <p>Trabalhamos com os melhores fornecedores locais.</p>
            </div>
          </div>
          <div className="usp-bar-item">
            <div className="usp-bar-icon-wrapper">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div>
              <strong>Suporte completo</strong>
              <p>Estamos com você antes, durante e depois da viagem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HISTÓRIA & MÉTRICAS */}
      <section className="nossa-historia-section reveal">
        <div className="container text-center historia-content">
          <span className="section-tag-small">NOSSA HISTÓRIA</span>
          <div className="gold-diamond-divider center-align">
            <div className="divider-line"></div>
            <div className="divider-diamond">♦</div>
            <div className="divider-line"></div>
          </div>
          
          <h2 className="editorial-title">Viajar é criar memórias para a vida toda</h2>
          
          <p className="editorial-p">
            A La Dolce Vita nasceu do desejo de compartilhar o que há de mais belo no mundo: lugares, culturas, sabores e histórias que ficam para sempre na memória.
          </p>
          
          <p className="editorial-p">
            Mais do que roteiros, entregamos vivências. Planejamos cada viagem com carinho, atenção e conhecimento para que você aproveite o melhor de cada destino com tranquilidade.
          </p>

          {/* Métricas */}
          <div className="stats-row">
            <div className="stat-card reveal reveal-delay-1">
              <div className="stat-icon-wrapper"><Globe size={24} /></div>
              <h3>+15</h3>
              <p>destinos incríveis</p>
            </div>

            <div className="stat-card reveal reveal-delay-2">
              <div className="stat-icon-wrapper"><Navigation size={24} /></div>
              <h3>+300</h3>
              <p>viagens realizadas</p>
            </div>

            <div className="stat-card reveal reveal-delay-3">
              <div className="stat-icon-wrapper"><Heart size={24} /></div>
              <h3>100%</h3>
              <p>clientes satisfeitos</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROPÓSITO SECTION */}
      <section className="nosso-proposito-section reveal">
        <div className="container proposito-wrapper">
          <div className="proposito-image">
            <img src={sobreNosTable} alt="Jantar sob as videiras da Toscana" className="proposito-img-card" />
          </div>
          
          <div className="proposito-text-block">
            <span className="section-tag-small">NOSSO PROPÓSITO</span>
            <div className="gold-diamond-divider">
              <div className="divider-line"></div>
              <div className="divider-diamond">♦</div>
              <div className="divider-line"></div>
            </div>
            
            <h2>Conectar pessoas ao que há de mais especial no mundo.</h2>
            
            <p>
              Nosso propósito é transformar viagens em experiências inesquecíveis, conectando pessoas à cultura, à natureza e à essência de cada lugar.
            </p>
            
            <button onClick={() => openWhatsApp("Nosso Propósito")} className="btn btn-whatsapp-premium btn-large">
              <img src={whatsappIcon} alt="WhatsApp" className="cta-whatsapp-icon" style={{ width: '20px', height: '20px', marginRight: '10px', objectFit: 'contain' }} />
              <span>Fale com um especialista</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. QUEM ESTÁ POR TRÁS */}
      <section className="quem-somos-section reveal">
        <div className="container text-center">
          <span className="section-tag-small">QUEM ESTÁ POR TRÁS</span>
          <div className="gold-diamond-divider center-align">
            <div className="divider-line"></div>
            <div className="divider-diamond">♦</div>
            <div className="divider-line"></div>
          </div>
          
          <h2 className="editorial-title">Uma equipe que ama o que faz</h2>
          
          <p className="editorial-subtitle-max">
            Somos especialistas em criar roteiros personalizados e proporcionar experiências únicas. Cada viagem planejada carrega o nosso compromisso com excelência e paixão por viajar.
          </p>

          {/* Cards de Valores */}
          <div className="values-three-col">
            <div className="value-item-box reveal reveal-delay-1">
              <div className="value-icon"><Plane size={24} /></div>
              <h3>Conhecimento</h3>
              <p>Especialistas com experiência nos destinos que oferecem.</p>
            </div>

            <div className="value-item-box reveal reveal-delay-2">
              <div className="value-icon"><Heart size={24} /></div>
              <h3>Paixão</h3>
              <p>Amamos viajar e compartilhar o que há de melhor no mundo.</p>
            </div>

            <div className="value-item-box reveal reveal-delay-3">
              <div className="value-icon"><Compass size={24} /></div>
              <h3>Propósito</h3>
              <p>Transformar sonhos de viagem em memórias inesquecíveis.</p>
            </div>
          </div>

          {/* Refinamento Sugerido: Caixa do Fundador / Curador de Viagens */}
          <div className="founder-quote-card glass-card reveal">
            <div className="founder-avatar-circle">LDV</div>
            <div className="founder-quote-text">
              <blockquote className="founder-quote">
                "Nosso compromisso é desenhar roteiros que fujam do óbvio. Queremos que você se sinta um convidado especial na Europa, seja degustando um vinho raro com o próprio produtor na Toscana ou navegando em um barco privativo no Lago de Como."
              </blockquote>
              <cite className="founder-cite">
                <strong>La Dolce Vita</strong>
                <span>Curadores de Roteiros</span>
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARCERIA DE CONFIANÇA */}
      <section className="parceria-section reveal">
        <div className="container text-center">
          <span className="section-tag-small">PARCEIRO OFICIAL</span>
          <div className="gold-diamond-divider center-align">
            <div className="divider-line"></div>
            <div className="divider-diamond">♦</div>
            <div className="divider-line"></div>
          </div>
          
          <h2 className="editorial-title" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>Operação e Suporte de Confiança</h2>
          <p className="editorial-subtitle-max" style={{ marginBottom: '30px', maxWidth: '780px', margin: '0 auto 30px auto' }}>
            Nossas viagens de grupo e serviços de consultoria são operados em parceria oficial com a <strong>Captur Viagens</strong>. Essa colaboração une a curadoria sofisticada da La Dolce Vita à robustez e segurança operacional de uma operadora registrada, garantindo tranquilidade total em cada etapa do seu roteiro.
          </p>
          
          <a href="https://www.instagram.com/capturviagens/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Conhecer a Captur Viagens no Instagram
          </a>
        </div>
      </section>

      {/* ESTILOS SOBRE NÓS */}
      <style>{`
        .sobre-nos-page-wrapper {
          padding-bottom: 80px;
          background-color: var(--color-bg-light);
        }

        /* 1. HERO HEADER BANNER */
        .sobre-nos-hero {
          background-size: cover;
          background-position: center 40%;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--header-height);
        }

        .sobre-nos-hero-content {
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

        .sobre-nos-hero-content h1 {
          font-family: var(--font-title);
          font-size: 4.5rem;
          color: #FFFFFF;
          font-weight: 400;
          margin-bottom: 16px;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .sobre-nos-hero-content p {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          line-height: 1.6;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        /* Divisor de Onda */
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

        /* 2. STORY INTRO SPLIT */
        .hero-split-section {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 60px;
        }

        .gold-diamond-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 15px 0 30px 0;
          max-width: 220px;
        }

        .gold-diamond-divider.center-align {
          margin-left: auto;
          margin-right: auto;
        }

        .divider-line {
          height: 1px;
          background-color: var(--color-primary-gold);
          flex-grow: 1;
        }

        .divider-diamond {
          color: var(--color-primary-gold);
          font-size: 0.7rem;
        }

        .hero-tagline {
          font-family: var(--font-title);
          font-size: 2.2rem;
          color: var(--color-dark-green-dark);
          line-height: 1.25;
          font-weight: 400;
          margin-bottom: 24px;
        }

        .hero-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-text-muted);
        }

        .hero-vertical-img {
          width: 100%;
          height: 520px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: var(--shadow-medium);
        }

        /* 2. USP BAR HORIZONTAL */
        .usp-bar-section {
          border-top: 1px solid var(--color-bg-cream);
          border-bottom: 1px solid var(--color-bg-cream);
          padding: 30px 0;
          margin-bottom: 80px;
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

        .usp-bar-icon-wrapper {
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
        }

        .usp-bar-item p {
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--color-text-muted);
        }

        /* 3. HISTÓRIA & METRICAS */
        .nossa-historia-section {
          background-color: var(--color-bg-light);
          padding: 20px 0 80px 0;
        }

        .section-tag-small {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-primary-gold-dark);
          letter-spacing: 0.2em;
          display: block;
        }

        .editorial-title {
          font-family: var(--font-title);
          font-size: 2.8rem;
          color: var(--color-dark-green);
          margin-bottom: 24px;
          font-weight: 400;
        }

        .editorial-p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          max-width: 780px;
          margin: 0 auto 20px auto;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 800px;
          margin: 60px auto 0 auto;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-icon-wrapper {
          color: var(--color-primary-gold-dark);
          margin-bottom: 16px;
        }

        .stat-card h3 {
          font-family: var(--font-body);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--color-dark-green-dark);
          line-height: 1;
          margin-bottom: 6px;
        }

        .stat-card p {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* 4. PROPÓSITO */
        .nosso-proposito-section {
          background-color: var(--color-bg-cream);
          padding: 80px 0;
          margin-bottom: 80px;
        }

        .proposito-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 60px;
          align-items: center;
        }

        .proposito-img-card {
          width: 100%;
          height: 380px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: var(--shadow-medium);
        }

        .proposito-text-block h2 {
          font-family: var(--font-title);
          font-size: 2.5rem;
          color: var(--color-dark-green);
          line-height: 1.2;
          font-weight: 400;
          margin-bottom: 20px;
        }

        .proposito-text-block p {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin-bottom: 30px;
        }

        /* 5. QUEM SOMOS & VALORES */
        .quem-somos-section {
          padding-bottom: 80px;
        }

        .editorial-subtitle-max {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          max-width: 760px;
          margin: 0 auto 50px auto;
        }

        .values-three-col {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 70px;
        }

        .value-item-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .value-icon {
          color: var(--color-primary-gold-dark);
          margin-bottom: 20px;
        }

        .value-item-box h3 {
          font-family: var(--font-body);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-dark-green);
          margin-bottom: 12px;
        }

        .value-item-box p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          max-width: 280px;
        }

        /* FOUNDER BIO CARD */
        .founder-quote-card {
          max-width: 860px;
          margin: 0 auto;
          padding: 40px;
          border-radius: var(--border-radius-md);
          display: flex;
          align-items: center;
          gap: 36px;
          text-align: left;
          border-color: var(--color-primary-gold-light);
        }

        .founder-avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body);
          font-weight: 800;
          font-size: 1.8rem;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(197, 168, 128, 0.25);
        }

        .founder-quote {
          font-family: var(--font-title);
          font-size: 1.45rem;
          font-style: italic;
          line-height: 1.5;
          color: var(--color-dark-green);
          margin-bottom: 16px;
        }

        .founder-cite {
          display: flex;
          flex-direction: column;
          font-style: normal;
        }

        .founder-cite strong {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-dark-green-dark);
        }

        .founder-cite span {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        /* RESPONSIVIDADE */
        @media (max-width: 992px) {
          .hero-split-section {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .hero-vertical-img {
            height: 380px;
          }

          .usp-bar-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .proposito-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .proposito-img-card {
            height: 300px;
          }

          .values-three-col {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .founder-quote-card {
            flex-direction: column;
            text-align: center;
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .sobre-nos-hero {
            height: 360px;
            padding-top: var(--header-height);
          }

          .sobre-nos-hero-content h1 {
            font-size: 2.8rem;
          }

          .sobre-nos-hero-content p {
            font-size: 1.1rem;
          }

          .hero-tagline {
            font-size: 1.7rem;
          }

          .editorial-title {
            font-size: 2.2rem;
          }

          .stats-row {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .proposito-text-block h2 {
            font-size: 2rem;
          }

          .founder-quote {
            font-size: 1.25rem;
          }
        }

        /* ESTILOS DA SEÇÃO DE PARCERIA */
        .parceria-section {
          background-color: var(--color-bg-cream);
          padding: 80px 0;
          border-top: 1px solid var(--color-primary-gold-light);
          border-bottom: 1px solid var(--color-primary-gold-light);
          margin-top: 80px;
        }
      `}</style>
    </div>
  );
}
