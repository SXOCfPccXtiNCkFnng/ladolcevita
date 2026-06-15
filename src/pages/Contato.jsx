import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, MessageCircle } from 'lucide-react';
import lagoDeComo from '../assets/lago_de_como.png';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function Contato() {
  const { settings } = useSettings();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consulta enviada:", formData);
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(t(
      "Olá! Gostaria de conversar com um especialista da La Dolce Vita.",
      "Hello! I would like to speak with a La Dolce Vita specialist."
    ));
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${text}`, '_blank');
  };

  return (
    <div className="contato-page-wrapper animate-fade-in">
      {/* 1. HERO BANNER DE CONTATO */}
      <section className="contato-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(26, 38, 29, 0.7) 0%, rgba(26, 38, 29, 0.85) 100%), url(${lagoDeComo})` }}>
        <div className="container contato-hero-content text-center">
          <span className="hero-tag-gold">{t("Atendimento Sob Medida", "Custom Service")}</span>
          <h1 className="hero-title">{t("Fale com um Especialista", "Talk to a Specialist")}</h1>
          <p className="hero-subtitle">{t("Entre em contato para tirar dúvidas, receber orçamentos personalizados ou planejar a sua próxima grande viagem.", "Get in touch to ask questions, receive personalized quotes, or plan your next great trip.")}</p>
        </div>
        
        {/* Divisor Diagonal Geométrico */}
        <div className="hero-divider-curve">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 L1440,20 L1440,120 L0,120 Z" fill="#FAF8F5"></path>
          </svg>
        </div>
      </section>

      {/* 2. CONTEÚDO DA PÁGINA (Layout Grid) */}
      <div className="container contato-content-container">
        <div className="contato-layout-grid">
        {/* Lado Esquerdo: Info de Contato */}
        <div className="contato-info-area reveal">
          <div className="info-intro">
            <h2>{t("Vamos planejar?", "Let's plan?")}</h2>
            <p>{t("Estamos prontos para transformar seus sonhos de viagem em um itinerário perfeito sob medida.", "We are ready to turn your travel dreams into a perfect tailor-made itinerary.")}</p>
          </div>

          <div className="info-items-list">
            <div className="info-item-card glass-card reveal reveal-delay-1">
              <div className="info-icon-circle"><Phone size={20} /></div>
              <div className="info-text">
                <h3>{t("Telefone & WhatsApp", "Phone & WhatsApp")}</h3>
                <p>{settings.phone || '(14) 99999-9999'}</p>
                <button onClick={openWhatsApp} className="info-cta-link">
                  <MessageCircle size={14} style={{ marginRight: '6px' }} /> {t("Enviar Mensagem", "Send Message")}
                </button>
              </div>
            </div>

            <div className="info-item-card glass-card reveal reveal-delay-2">
              <div className="info-icon-circle"><Mail size={20} /></div>
              <div className="info-text">
                <h3>{t("E-mail", "Email")}</h3>
                <p>{settings.email || 'contato@ladolcevitaviagens.com.br'}</p>
              </div>
            </div>

            <div className="info-item-card glass-card reveal reveal-delay-3">
              <div className="info-icon-circle"><Clock size={20} /></div>
              <div className="info-text">
                <h3>{t("Horário de Atendimento", "Business Hours")}</h3>
                <p>{t(settings.hours || 'Seg - Sex: 09h às 18h', 'Mon - Fri: 9am to 6pm')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="contato-form-area glass-card reveal reveal-delay-2">
          {submitted ? (
            <div className="form-success text-center">
              <div className="success-icon-wrapper">✓</div>
              <h2>{t("Mensagem Enviada!", "Message Sent!")}</h2>
              <p>{t("Agradecemos o contato. Um de nossos concierges especializados entrará em contato em até 24 horas úteis.", "Thank you for contacting us. One of our specialized concierges will get in touch within 24 business hours.")}</p>
              <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ marginTop: '24px' }}>
                {t("Enviar Outra Mensagem", "Send Another Message")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="consultation-form">
              <h3>{t("Solicitar Consulta de Viagem", "Request Travel Consultation")}</h3>
              <p className="form-intro-desc">{t("Preencha o formulário abaixo e iniciaremos o desenho do seu roteiro.", "Fill out the form below and we will start designing your itinerary.")}</p>

              <div className="form-group-custom">
                <label htmlFor="name">{t("Nome Completo", "Full Name")}</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("Ex: Maria Silva", "E.g.: Mary Smith")}
                  required
                />
              </div>

              <div className="form-row-two-col">
                <div className="form-group-custom">
                  <label htmlFor="email">{t("E-mail", "Email")}</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("Ex: maria@email.com", "E.g.: mary@email.com")}
                    required
                  />
                </div>

                <div className="form-group-custom">
                  <label htmlFor="phone">{t("Telefone / WhatsApp", "Phone / WhatsApp")}</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("Ex: (14) 99999-9999", "E.g.: +1 (123) 456-7890")}
                    required
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label htmlFor="destination">{t("Destino de Interesse", "Destination of Interest")}</label>
                <select 
                  id="destination" 
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                >
                  <option value="">{t("Selecione um destino", "Select a destination")}</option>
                  <option value="Toscana & Vinhos (Itália)">{t("Toscana & Vinhos (Itália)", "Tuscany & Wines (Italy)")}</option>
                  <option value="Costa Amalfitana (Itália)">{t("Costa Amalfitana (Itália)", "Amalfi Coast (Italy)")}</option>
                  <option value="Portugal Completo (Portugal)">{t("Portugal Completo (Portugal)", "Complete Portugal (Portugal)")}</option>
                  <option value="Lago de Como & Milão (Itália)">{t("Lago de Como & Milão (Itália)", "Lake Como & Milan (Italy)")}</option>
                  <option value="Outro Destino Personalizado">{t("Outro Destino Personalizado", "Other Custom Destination")}</option>
                </select>
              </div>

              <div className="form-group-custom">
                <label htmlFor="message">{t("Conte-nos sobre sua viagem dos sonhos", "Tell us about your dream trip")}</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder={t(
                    "Ex: Gostaria de viajar em casal em Setembro, focando em vinhedos e experiências gastronômicas...",
                    "E.g.: I would like to travel as a couple in September, focusing on vineyards and gastronomic experiences..."
                  )}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full btn-submit-form" style={{ width: '100%', marginTop: '10px' }}>
                <span>{t("Enviar Solicitação", "Send Request")}</span>
                <Send size={16} style={{ marginLeft: '8px' }} />
              </button>
            </form>
          )}
        </div>
      </div>
      </div> {/* Fechamento do contato-content-container */}

      <style>{`
        .contato-page-wrapper {
          padding-bottom: 80px;
          background-color: var(--color-bg-light);
        }

        /* 1. HERO BANNER DE CONTATO */
        .contato-hero {
          background-size: cover;
          background-position: center 40%;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--header-height);
        }

        .contato-hero-content {
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

        .hero-title {
          font-family: var(--font-title);
          font-size: 4.5rem;
          color: #FFFFFF;
          font-weight: 400;
          margin-bottom: 16px;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .hero-subtitle {
          color: rgba(255, 255, 255, 0.95);
          font-size: 1.25rem;
          line-height: 1.6;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }

        /* Divisor Diagonal */
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

        .contato-content-container {
          margin-top: 50px;
        }

        /* Layout Grid */
        .contato-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: start;
        }

        .contato-info-area h2 {
          font-family: var(--font-title);
          font-size: 2.2rem;
          color: var(--color-dark-green);
          margin-bottom: 16px;
        }

        .info-intro p {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin-bottom: 36px;
        }

        .info-items-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-item-card {
          padding: 24px;
          border-radius: var(--border-radius-sm);
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .info-icon-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background-color: var(--color-bg-cream);
          color: var(--color-dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-text h3 {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-primary-gold-dark);
          margin-bottom: 4px;
        }

        .info-text p {
          font-size: 0.95rem;
          color: var(--color-text-dark);
          font-weight: 500;
        }

        .info-cta-link {
          background: none;
          border: none;
          color: #128C7E;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-top: 6px;
          padding: 0;
          transition: var(--transition-fast);
        }

        .info-cta-link:hover {
          color: #25D366;
        }

        /* FORM */
        .contato-form-area {
          padding: 40px;
          border-radius: var(--border-radius-md);
        }

        .consultation-form h3 {
          font-family: var(--font-title);
          font-size: 2rem;
          color: var(--color-dark-green);
          margin-bottom: 6px;
        }

        .form-intro-desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 28px;
        }

        .form-group-custom {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .form-group-custom label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
        }

        .form-group-custom input,
        .form-group-custom select,
        .form-group-custom textarea {
          padding: 12px 16px;
          border: 1px solid var(--glass-border);
          border-radius: var(--border-radius-sm);
          background-color: var(--color-bg-white);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--color-text-dark);
          outline: none;
          transition: var(--transition-fast);
        }

        .form-group-custom input:focus,
        .form-group-custom select:focus,
        .form-group-custom textarea:focus {
          border-color: var(--color-primary-gold);
          box-shadow: 0 0 0 3px rgba(197, 168, 128, 0.15);
        }

        .form-row-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Success screen */
        .form-success {
          padding: 40px 0;
        }

        .success-icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #25D366;
          color: white;
          font-size: 2.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 4px 15px rgba(37,211,102,0.2);
        }

        .form-success h2 {
          font-family: var(--font-title);
          font-size: 2.5rem;
          color: var(--color-dark-green);
          margin-bottom: 12px;
        }

        .form-success p {
          max-width: 440px;
          margin: 0 auto;
          font-size: 1rem;
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .contato-layout-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .form-row-two-col {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
}
