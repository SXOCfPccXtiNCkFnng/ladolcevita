import React, { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies anteriormente
    const consent = localStorage.getItem('la-dolce-vita-cookies');
    if (!consent) {
      // Pequeno delay para aparecer após carregar a página de forma sutil
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('la-dolce-vita-cookies', 'accepted');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="cookie-consent-bar glass-card animate-fade-in-up">
      <div className="cookie-content">
        <div className="cookie-icon-wrapper">
          <Cookie size={20} className="cookie-shield-icon" />
        </div>
        <div className="cookie-text">
          <h4>{t("Nós valorizamos a sua privacidade", "We value your privacy")}</h4>
          <p>
            {t(
              "Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar nossos serviços de viagens de luxo. Ao navegar, você concorda com nosso uso de cookies.",
              "We use cookies to improve your experience, analyze site traffic, and personalize our luxury travel services. By browsing, you agree to our use of cookies."
            )}
          </p>
        </div>
      </div>
      <button onClick={handleAccept} className="btn btn-cookie-accept">
        <Check size={16} style={{ marginRight: '6px' }} />
        <span>{t("Aceitar e Continuar", "Accept & Continue")}</span>
      </button>

      <style>{`
        .cookie-consent-bar {
          position: fixed;
          bottom: 30px;
          left: 30px;
          max-width: 480px;
          padding: 24px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-radius: var(--border-radius-md);
          background: rgba(26, 38, 29, 0.9);
          border: 1px solid rgba(197, 168, 128, 0.25);
          backdrop-filter: blur(16px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          color: #ffffff;
        }

        .cookie-content {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .cookie-icon-wrapper {
          background-color: rgba(197, 168, 128, 0.15);
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--color-primary-gold);
        }

        .cookie-text h4 {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--color-primary-gold);
        }

        .cookie-text p {
          font-size: 0.8rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .btn-cookie-accept {
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          border: 1px solid var(--color-primary-gold);
          padding: 10px 20px;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: var(--border-radius-sm);
          width: 100%;
          cursor: pointer;
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-cookie-accept:hover {
          background-color: transparent;
          color: #ffffff;
          border-color: #ffffff;
        }

        @media (max-width: 576px) {
          .cookie-consent-bar {
            bottom: 20px;
            left: 20px;
            right: 20px;
            max-width: calc(100% - 40px);
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
