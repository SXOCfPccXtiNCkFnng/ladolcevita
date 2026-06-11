import React, { useState, useEffect } from 'react';
import { UserCheck, Compass, Heart, Shield, ArrowRight, Star } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';
import { useDestinations } from '../hooks/useDestinations';
import { useTestimonials } from '../hooks/useTestimonials';

// Importando imagens
import heroTuscany from '../assets/hero_tuscany.png';
import costaAmalfitana from '../assets/costa_amalfitana.png';
import lagoDeComo from '../assets/lago_de_como.png';
import portugalCompleto from '../assets/portugal_completo.png';
import sobreNosTable from '../assets/sobre_nos_table.png';
import whatsappIcon from '../assets/whatsapp.png';

import { useSettings } from '../context/SettingsContext';


export default function Home({ setCurrentTab }) {
  const { settings } = useSettings();
  const { destinations } = useDestinations();
  const { testimonials } = useTestimonials();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Controle de arrastar com o dedo (Swipe) no Mobile
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [testTouchStartX, setTestTouchStartX] = useState(null);
  const [testTouchEndX, setTestTouchEndX] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEndHero = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    } else if (isRightSwipe) {
      setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
  };

  const onTestTouchStart = (e) => {
    setTestTouchEndX(null);
    setTestTouchStartX(e.targetTouches[0].clientX);
  };

  const onTestTouchMove = (e) => {
    setTestTouchEndX(e.targetTouches[0].clientX);
  };

  const onTestTouchEnd = () => {
    if (!testTouchStartX || !testTouchEndX || testimonials.length === 0) return;
    const distance = testTouchStartX - testTouchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const featuredDestinations = destinations.slice(0, 3);




  const heroSlides = [
    {
      image: heroTuscany,
      tag: "Itália | Toscana",
      title: "Roteiros que ficam na memória",
      subtitle: "Descubra vilas medievais, vinhedos deslumbrantes e a autêntica culinária toscana em uma viagem sob medida."
    },
    {
      image: costaAmalfitana,
      tag: "Costa Amalfitana",
      title: "Cenários de tirar o fôlego",
      subtitle: "Navegue por águas cristalinas, explore falésias coloridas e desfrute do charme do Mediterrâneo com exclusividade."
    },
    {
      image: lagoDeComo,
      tag: "Norte da Itália | Como",
      title: "A Verdadeira La Dolce Vita",
      subtitle: "Hospede-se em palácios históricos e sinta a sofisticação de um dos destinos mais elegantes do norte italiano."
    }
  ];

  // Slideshow do Hero Banner
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  // Slideshow automático de Depoimentos
  useEffect(() => {
    if (testimonials.length === 0) return;
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(testimonialInterval);
  }, [testimonials]);

  const openWhatsApp = (tripName = null) => {
    let text = "Olá! Acessei o site da La Dolce Vita e gostaria de planejar minha próxima viagem.";
    if (tripName) {
      text = `Olá! Vi o roteiro de "${tripName}" no site da La Dolce Vita e gostaria de receber mais informações.`;
    }
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="home-container animate-fade-in">
      {/* 1. HERO SECTION (DYNAMIC BACKGROUND CAROUSEL WITH SWIPE) */}
      <section 
        className="hero-section"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHero}
      >
        {/* Background Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(26, 38, 29, 0.75) 0%, rgba(26, 38, 29, 0.45) 50%, rgba(26, 38, 29, 0.85) 100%), url(${slide.image})`
            }}
          />
        ))}

        {/* Text Content overlaying the slides */}
        <div className="container hero-content-container">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-text-content-block ${index === activeSlide ? 'active' : ''}`}
            >
              <span className="hero-tag-premium">{slide.tag}</span>
              <h1 className="hero-title-premium">{slide.title}</h1>
              
              <div className="hero-divider-premium">
                <div className="divider-line-gold"></div>
                <div className="divider-diamond-gold">♦</div>
                <div className="divider-line-gold"></div>
              </div>
              
              <p className="hero-subtitle-premium">{slide.subtitle}</p>
              
              <div className="hero-ctas-premium">
                <button onClick={() => openWhatsApp(slide.title)} className="btn btn-primary hero-btn-gold">
                  <span>Planejar Minha Viagem</span>
                  <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators / Dots */}
        <div className="slide-indicators-premium">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot-premium ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Transição em onda orgânica e elegante */}
        <div className="hero-divider-curve">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C320,100 640,10 960,60 C1200,90 1320,70 1440,40 L1440,120 L0,120 Z" fill="#FFFFFF"></path>
          </svg>
        </div>
      </section>

      {/* 2. USP SECTION (DIFERENCIAIS) */}
      <section className="usp-section">
        <div className="container">
          <div className="usp-grid">
            <div className="usp-card reveal reveal-delay-1">
              <div className="usp-icon-wrapper">
                <UserCheck size={28} />
              </div>
              <h3 className="usp-card-title">Atendimento Personalizado</h3>
              <p className="usp-card-desc">Cuidamos de cada detalhe do planejamento à execução do seu roteiro.</p>
            </div>

            <div className="usp-card reveal reveal-delay-2">
              <div className="usp-icon-wrapper">
                <Compass size={28} />
              </div>
              <h3 className="usp-card-title">Experiências Autênticas</h3>
              <p className="usp-card-desc">Vivencie o destino além do óbvio, conectando-se à cultura local.</p>
            </div>

            <div className="usp-card reveal reveal-delay-3">
              <div className="usp-icon-wrapper">
                <Heart size={28} />
              </div>
              <h3 className="usp-card-title">Parcerias de Confiança</h3>
              <p className="usp-card-desc">Trabalhamos em conjunto com os melhores hotéis e guias locais.</p>
            </div>

            <div className="usp-card reveal reveal-delay-3">
              <div className="usp-icon-wrapper">
                <Shield size={28} />
              </div>
              <h3 className="usp-card-title">Suporte Completo</h3>
              <p className="usp-card-desc">Oferecemos suporte em tempo integral durante toda a sua viagem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESTINOS DESTAQUE */}
      <section className="destinations-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-tag">Destinos em Destaque</span>
            <h2 className="section-title">Lugares para se apaixonar</h2>
          </div>

          <div className="destinations-grid">
            {featuredDestinations.map((dest, idx) => {
              return (
                <div key={dest.id} className={`destination-card reveal reveal-delay-${idx + 1}`}>
                  <div className="card-image-wrapper">
                    <img src={dest.image} alt={dest.title} className="card-image" />
                  </div>
                  <div className="card-content">
                    <span className="card-country">{dest.country}</span>
                    <h3 className="card-title">{dest.title}</h3>
                    <p className="card-desc">{dest.description}</p>

                    <button 
                      onClick={() => openWhatsApp(dest.title)} 
                      className="btn btn-secondary card-btn"
                    >
                      <span>Solicitar Roteiro</span>
                      <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center reveal" style={{ marginTop: '48px' }}>
            <button onClick={() => setCurrentTab('destinos')} className="btn btn-primary btn-with-icon">
              <span>Ver todos os destinos</span>
              <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. SEÇÃO "MAIS QUE ROTEIROS, VIVÊNCIAS" */}
      <section className="experience-showcase-section">
        <div className="container">
          <div className="experience-wrapper">
            <div className="experience-text reveal">
              <span className="section-tag">Viagens Feitas Para Você</span>
              <h2 className="section-title">Mais que roteiros, vivências.</h2>
              <p className="experience-desc">
                Acreditamos que viajar é criar memórias que duram a vida inteira. Não vendemos apenas passagens ou hotéis, criamos uma imersão completa e luxuosa nos destinos mais belos do mundo.
              </p>
              <p className="experience-desc">
                Desfrute de almoços em vinhedos privativos na Toscana, navegue pelas águas cristalinas do Lago de Como, ou explore as vilas históricas de Portugal com o suporte de quem entende cada detalhe do destino.
              </p>
              <button onClick={() => setCurrentTab('sobre-nos')} className="btn btn-secondary btn-with-icon" style={{ marginTop: '20px' }}>
                <span>Saiba mais sobre nós</span>
                <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
            <div className="experience-image-area reveal reveal-delay-2">
              <img src={sobreNosTable} alt="Jantar no vinhedo" className="experience-img" />
              <div className="experience-card-floating glass-card">
                <span className="floating-tag">Gastronomia</span>
                <h4 className="floating-title">Vinho & Alta Culinária</h4>
                <p className="floating-desc">Roteiros gastronômicos exclusivos com visitas guiadas a vinícolas premiadas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEPOIMENTOS CARROSSEL */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center reveal">
            <span className="section-tag">O que nossos viajantes dizem</span>
            <h2 className="section-title">Histórias Reais</h2>
          </div>

          <div 
            className="testimonials-slider-wrapper reveal reveal-delay-1"
            onTouchStart={onTestTouchStart}
            onTouchMove={onTestTouchMove}
            onTouchEnd={onTestTouchEnd}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-slide ${index === activeTestimonial ? 'active' : ''}`}
              >
                <div className="stars-wrapper">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} size={18} fill="#C5A880" color="#C5A880" />
                  ))}
                </div>
                <blockquote className="testimonial-quote">
                  <span className="quote-mark-bg">“</span>
                  <span className="quote-text">{testimonial.text}</span>
                </blockquote>
                <div className="testimonial-author">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <span className="author-details">{testimonial.location} | Viagem: {testimonial.trip}</span>
                </div>
              </div>
            ))}

            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`test-dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP & INSTAGRAM GRID FOOTER */}
      <section className="cta-bottom-section">
        <div className="container">
          <div className="cta-bottom-card reveal">
            <div className="cta-bottom-text">
              <h2 className="cta-title">Vamos planejar sua próxima viagem?</h2>
              <p className="cta-desc">Fale agora mesmo com um de nossos especialistas em viagens personalizadas e comece a desenhar o seu roteiro perfeito.</p>
              <button onClick={() => openWhatsApp()} className="btn btn-whatsapp-premium btn-large">
                <img src={whatsappIcon} alt="WhatsApp" className="cta-whatsapp-icon" style={{ width: '22px', height: '22px', marginRight: '10px', objectFit: 'contain' }} />
                <span>Conversar com especialista</span>
              </button>
            </div>
            <div className="cta-bottom-gallery">
              <img src={heroTuscany} alt="Toscana" className="gallery-img img-1" />
              <img src={costaAmalfitana} alt="Amalfi" className="gallery-img img-2" />
              <img src={lagoDeComo} alt="Como" className="gallery-img img-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Estilos específicos da Home */}
      <style>{`
        /* 1. HERO CAROUSEL BACKGROUND DESIGN */
        .hero-section {
          position: relative;
          height: 650px; /* Altura ideal aumentada para destacar mais as belas paisagens */
          width: 100%;
          overflow: hidden;
          background-color: var(--color-dark-green-dark);
          display: flex;
          align-items: center;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center center;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          z-index: 1;
        }

        .hero-slide.active {
          opacity: 1;
          z-index: 2;
        }

        .hero-content-container {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding-top: var(--header-height); /* Balanço visual para a navbar transparente */
        }

        .hero-text-content-block {
          position: absolute;
          max-width: 760px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
          z-index: 1;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-text-content-block.active {
          opacity: 1;
          transform: translateY(0);
          z-index: 5;
          pointer-events: auto;
        }

        .hero-tag-premium {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-primary-gold);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 16px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }

        .hero-title-premium {
          font-family: var(--font-title);
          font-size: 3.8rem;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 1.15;
          margin-bottom: 0px;
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.6);
        }

        .hero-divider-premium {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 15px;
          margin: 20px 0 28px 0;
          width: 100%;
          max-width: 320px;
        }

        .divider-line-gold {
          height: 1px;
          background-color: var(--color-primary-gold);
          flex-grow: 1;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .divider-diamond-gold {
          color: var(--color-primary-gold);
          font-size: 0.75rem;
          line-height: 1;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle-premium {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 38px;
          font-weight: 400;
          max-width: 580px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .hero-ctas-premium {
          display: flex;
          gap: 16px;
        }

        .hero-btn-gold {
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          border: 1px solid var(--color-primary-gold);
          font-weight: 700;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          padding: 16px 32px;
          border-radius: var(--border-radius-sm);
        }

        .hero-btn-gold:hover {
          background-color: transparent;
          color: #FFFFFF;
          border-color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
        }

        .slide-indicators-premium {
          position: absolute;
          bottom: 45px; /* Ajustado para ficar acima da curva */
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          display: flex;
          gap: 12px;
        }

        .indicator-dot-premium {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.45);
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .indicator-dot-premium.active {
          background-color: var(--color-primary-gold);
          width: 24px;
          border-radius: 4px;
        }

        /* Transição em curva para a próxima seção */
        .hero-divider-curve {
          position: absolute;
          bottom: -1px; /* Evita frestas de 1px */
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

        .btn-with-icon {
          display: inline-flex;
          align-items: center;
        }

        /* Responsividade do Hero */
        @media (max-width: 992px) {
          .hero-section {
            height: 580px;
          }

          .hero-title-premium {
            font-size: 3rem;
          }

          .hero-text-content-block {
            max-width: 90%;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            height: 500px;
          }

          .hero-divider-premium {
            margin: 20px 0;
          }

          .hero-subtitle-premium {
            margin-bottom: 28px;
            font-size: 1rem;
          }

          .hero-ctas-premium {
            justify-content: flex-start;
          }
        }

        /* USP Section */
        .usp-section {
          background-color: var(--color-bg-white);
          border-bottom: 1px solid var(--color-bg-cream);
          padding: 60px 0;
        }

        .usp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .usp-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 30px 24px;
          border-radius: var(--border-radius-md);
          background-color: transparent;
          border: 1px solid transparent;
          transition: var(--transition-smooth);
        }

        .usp-card:hover {
          background-color: var(--color-bg-white);
          border-color: var(--color-bg-cream);
          box-shadow: var(--shadow-medium);
          transform: translateY(-5px);
        }

        .usp-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--color-bg-cream);
          color: var(--color-dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: var(--transition-smooth);
        }

        .usp-card:hover .usp-icon-wrapper {
          background-color: var(--color-primary-gold);
          color: var(--color-bg-light);
          transform: translateY(-5px);
        }

        .usp-card-title {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-dark-green);
          margin-bottom: 12px;
        }

        .usp-card-desc {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        /* Destinations section */
        .destinations-section {
          background-color: var(--color-bg-light);
        }

        .text-center {
          text-align: center;
        }

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 50px;
        }

        .destination-card {
          background-color: var(--color-bg-white);
          border-radius: var(--border-radius-sm);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(197, 168, 128, 0.1);
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }

        .destination-card:hover {
          transform: translateY(-10px);
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
          transform: scale(1.1);
        }

        .card-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          color: var(--color-bg-light);
          font-size: 0.7rem;
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
          padding: 28px;
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
          margin-bottom: 8px;
          display: block;
        }

        .card-title {
          font-family: var(--font-title);
          font-size: 1.8rem;
          color: var(--color-dark-green);
          margin-bottom: 12px;
        }

        .card-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--color-bg-cream);
          margin-bottom: 20px;
          font-size: 0.85rem;
        }

        .meta-item {
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .meta-price {
          color: var(--color-text-dark);
        }

        .meta-price strong {
          color: var(--color-primary-gold-dark);
          font-size: 1.05rem;
        }

        .card-btn {
          width: 100%;
        }

        /* Experience Showcase */
        .experience-showcase-section {
          background-color: var(--color-bg-cream);
          overflow: hidden;
        }

        .experience-wrapper {
          display: grid;
          grid-template-columns: 1.1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .experience-desc {
          margin-bottom: 20px;
          font-size: 1rem;
          line-height: 1.7;
        }

        .experience-image-area {
          position: relative;
        }

        .experience-img {
          width: 100%;
          height: 480px;
          border-radius: var(--border-radius-sm);
          box-shadow: var(--shadow-medium);
        }

        .experience-card-floating {
          position: absolute;
          bottom: -30px;
          left: -40px;
          max-width: 320px;
          padding: 28px;
          border-radius: var(--border-radius-sm);
          box-shadow: var(--shadow-premium);
        }

        .floating-tag {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-primary-gold-dark);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          display: block;
        }

        .floating-title {
          font-family: var(--font-title);
          font-size: 1.5rem;
          color: var(--color-dark-green);
          margin-bottom: 8px;
        }

        .floating-desc {
          font-size: 0.8rem;
          line-height: 1.5;
        }

        /* Testimonials Section */
        .testimonials-section {
          background-color: var(--color-bg-white);
          border-bottom: 1px solid var(--color-bg-cream);
        }

        .testimonials-slider-wrapper {
          max-width: 800px;
          margin: 50px auto 0 auto;
          position: relative;
          text-align: center;
          min-height: 250px;
        }

        .testimonial-slide {
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: absolute;
          width: 100%;
          pointer-events: none;
        }

        .testimonial-slide.active {
          opacity: 1;
          transform: translateY(0);
          position: relative;
          pointer-events: auto;
        }

        .stars-wrapper {
          display: flex;
          justify-content: center;
          gap: 4px;
          margin-bottom: 24px;
        }

        .testimonial-quote {
          position: relative;
          font-family: var(--font-title);
          font-size: 1.8rem;
          font-style: italic;
          line-height: 1.5;
          color: var(--color-dark-green);
          margin-bottom: 28px;
          display: inline-block;
          max-width: 720px;
          padding: 0 40px;
        }

        .quote-mark-bg {
          position: absolute;
          top: -45px;
          left: 0;
          font-family: var(--font-title);
          font-size: 8rem;
          color: var(--color-primary-gold);
          opacity: 0.15;
          line-height: 1;
          user-select: none;
        }

        .quote-text {
          position: relative;
          z-index: 2;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text-dark);
        }

        .author-details {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .test-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-bg-cream);
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .test-dot.active {
          background-color: var(--color-primary-gold-dark);
          transform: scale(1.25);
        }

        /* CTA Bottom Section */
        .cta-bottom-section {
          background-color: var(--color-bg-light);
          padding: 80px 0;
        }

        .cta-bottom-card {
          background-color: var(--color-dark-green);
          border-radius: var(--border-radius-sm);
          padding: 60px;
          color: var(--color-bg-light);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          box-shadow: var(--shadow-premium);
          overflow: hidden;
        }

        .cta-title {
          font-family: var(--font-title);
          font-size: 2.8rem;
          color: var(--color-bg-light);
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .cta-desc {
          color: rgba(250, 248, 245, 0.75);
          font-size: 1rem;
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 0.95rem;
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
          color: #FFFFFF;
          border-color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
        }

        .cta-whatsapp-icon {
          filter: brightness(0);
          transition: var(--transition-fast);
        }

        .btn-whatsapp-premium:hover .cta-whatsapp-icon {
          filter: brightness(0) invert(1);
        }

        .cta-bottom-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          height: 260px;
          position: relative;
        }

        .gallery-img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          object-fit: cover;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          transition: var(--transition-smooth);
        }

        .gallery-img:hover {
          transform: scale(1.05) translateY(-5px);
        }

        .gallery-img.img-1 {
          transform: translateY(20px);
        }

        .gallery-img.img-2 {
          transform: translateY(-10px);
        }

        .gallery-img.img-3 {
          transform: translateY(10px);
        }

        /* Responsividade */
        @media (max-width: 992px) {
          .usp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .destinations-grid {
            grid-template-columns: 1fr 1fr;
          }

          .experience-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .experience-img {
            height: 350px;
          }

          .experience-card-floating {
            left: 20px;
            bottom: -20px;
          }

          .cta-bottom-card {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 40px;
          }

          .cta-bottom-gallery {
            height: 180px;
          }
        }

        @media (max-width: 768px) {
          .usp-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .destinations-grid {
            grid-template-columns: 1fr;
          }
          
          .testimonial-quote {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
}
