import React, { useRef } from 'react';
import { Mail, Clock } from 'lucide-react';
import logo from '../assets/logo.png';
import whatsappIcon from '../assets/whatsapp.png';
import { useSettings } from '../context/SettingsContext';

export default function Footer({ currentTab, setCurrentTab }) {
  const { settings } = useSettings();

  const lastClickRef = useRef(0);

  // Clique duplo secreto no Copyright para abrir o Admin (funciona em Desktop e Mobile)
  const handleCopyrightClick = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 350; // ms
    if (now - lastClickRef.current < DOUBLE_TAP_DELAY) {
      window.location.hash = 'painel-secreto';
    }
    lastClickRef.current = now;
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Gostaria de conversar com um especialista da La Dolce Vita.");
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${message}`, '_blank');
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content">
        {/* Coluna 1: Branding */}
        <div className="footer-col branding">
          <div className="footer-logo" onClick={() => setCurrentTab('home')}>
            <img src={logo} alt="La Dolce Vita" className="footer-logo-img" />
          </div>
          <p className="branding-text">
            Criamos viagens inesquecíveis com atenção a cada detalhe para você aproveitar o melhor de cada destino de forma autêntica e luxuosa.
          </p>
          <p className="partnership-text" style={{ fontSize: '0.82rem', color: 'rgba(250, 248, 245, 0.45)', margin: '-16px 0 24px 0', lineHeight: '1.5' }}>
            Operado em parceria com a <a href="https://www.instagram.com/capturviagens/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-gold)', textDecoration: 'underline', transition: 'var(--transition-fast)' }} className="partner-link">Captur Viagens</a>.
          </p>
          <div className="social-icons">
            <a href={settings.instagram || "https://www.instagram.com/ladolcevitaviagens/"} target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href={settings.facebook || "https://facebook.com"} target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Coluna 2: Contato */}
        <div className="footer-col contacts">
          <h4 className="footer-title">Fale Conosco</h4>
          <ul className="contact-list">
            <li>
              <button onClick={openWhatsApp} className="contact-item-btn">
                <img src={whatsappIcon} alt="WhatsApp" className="footer-whatsapp-icon" />
                <span>Fale no WhatsApp</span>
              </button>
            </li>
            <li>
              <a href={`mailto:${settings.email || 'contato@ladolcevitaviagens.com.br'}`} className="contact-item">
                <Mail size={16} className="contact-icon" />
                <span>{settings.email || 'contato@ladolcevitaviagens.com.br'}</span>
              </a>
            </li>
            <li className="contact-item">
              <Clock size={16} className="contact-icon" />
              <span>{settings.hours || 'Seg - Sex: 09h às 18h'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright e Atalho Secreto Centralizado */}
      <div className="footer-bottom">
        <div className="container bottom-content">
          <span 
            className="copyright" 
            onClick={handleCopyrightClick}
          >
            © {new Date().getFullYear()} La Dolce Vita. Todos os direitos reservados. | Desenvolvido por <a href="https://domutech.digital/" target="_blank" rel="noopener noreferrer" className="credit-link">Alan Felipe</a>
          </span>
        </div>
      </div>

      {/* Estilos específicos do Footer */}
      <style>{`
        .footer-container {
          background-color: var(--color-dark-green-dark);
          color: var(--color-bg-light);
          padding: 80px 0 0 0;
          border-top: 1px solid rgba(197, 168, 128, 0.1);
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 80px;
          padding-bottom: 60px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          cursor: pointer;
          margin-bottom: 24px;
          align-self: flex-start;
        }

        .footer-logo-img {
          max-height: 56px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.85;
          transition: var(--transition-smooth);
        }

        .footer-logo:hover .footer-logo-img {
          opacity: 1;
        }

        .branding-text {
          color: rgba(250, 248, 245, 0.65);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 28px;
          max-width: 480px;
        }

        .social-icons {
          display: flex;
          gap: 16px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(197, 168, 128, 0.2);
          color: var(--color-primary-gold);
          transition: var(--transition-smooth);
        }

        .social-link:hover {
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          transform: translateY(-3px);
        }

        .footer-title {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-primary-gold);
          margin-bottom: 24px;
        }

        .contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 18px !important;
        }

        .contact-item-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(250, 248, 245, 0.65);
          font-family: var(--font-body);
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .contact-item-btn:hover {
          color: #25D366;
        }

        .footer-whatsapp-icon {
          width: 18px;
          height: 18px;
          object-fit: contain;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(250, 248, 245, 0.65);
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .contact-item:hover {
          color: var(--color-primary-gold-light);
        }

        .contact-icon {
          color: var(--color-primary-gold);
        }

        .footer-bottom {
          margin-top: 60px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px 0;
          font-size: 0.85rem;
          color: rgba(250, 248, 245, 0.4);
        }

        .bottom-content {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .copyright {
          cursor: default;
          user-select: none;
        }

        .credit-link {
          color: inherit;
          text-decoration: underline;
          transition: var(--transition-fast);
          display: inline-block;
          cursor: pointer;
        }

        .credit-link:hover {
          color: var(--color-primary-gold) !important;
        }

        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </footer>
  );
}
