import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <div 
      className="lang-toggle-capsule" 
      onClick={handleToggle}
      aria-label="Toggle language / Alternar idioma"
      title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      {/* Sliding selection background */}
      <div className={`lang-toggle-slider ${language === 'en' ? 'slide-right' : 'slide-left'}`} />

      {/* Brazil Flag Container */}
      <div className={`flag-wrapper flag-pt ${language === 'pt' ? 'active' : 'inactive'}`}>
        <svg viewBox="0 0 24 24" width="24" height="24" className="flag-svg">
          <circle cx="12" cy="12" r="12" fill="#009739" />
          <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="#FEDF00" />
          <circle cx="12" cy="12" r="5.2" fill="#002776" />
          <path d="M6.8 13.5 C8 11.5 12 10.5 17.2 12.8" stroke="#FFFFFF" strokeWidth="1.1" fill="none" />
        </svg>
      </div>

      {/* US Flag Container */}
      <div className={`flag-wrapper flag-en ${language === 'en' ? 'active' : 'inactive'}`}>
        <svg viewBox="0 0 24 24" width="24" height="24" className="flag-svg">
          <defs>
            <clipPath id="circle-clip-us">
              <circle cx="12" cy="12" r="12" />
            </clipPath>
          </defs>
          <g clipPath="url(#circle-clip-us)">
            {/* White background */}
            <rect x="0" y="0" width="24" height="24" fill="#FFFFFF" />
            {/* Red stripes */}
            <rect x="0" y="0" width="24" height="1.85" fill="#B22234" />
            <rect x="0" y="3.7" width="24" height="1.85" fill="#B22234" />
            <rect x="0" y="7.4" width="24" height="1.85" fill="#B22234" />
            <rect x="0" y="11.1" width="24" height="1.85" fill="#B22234" />
            <rect x="0" y="14.8" width="24" height="1.85" fill="#B22234" />
            <rect x="0" y="18.5" width="24" height="1.85" fill="#B22234" />
            <rect x="0" y="22.2" width="24" height="1.85" fill="#B22234" />
            {/* Blue canton */}
            <rect x="0" y="0" width="12" height="13" fill="#3C3B6E" />
            {/* Star dots */}
            <circle cx="2.5" cy="3" r="0.65" fill="#FFFFFF" />
            <circle cx="6" cy="3" r="0.65" fill="#FFFFFF" />
            <circle cx="9.5" cy="3" r="0.65" fill="#FFFFFF" />
            <circle cx="4.2" cy="6.5" r="0.65" fill="#FFFFFF" />
            <circle cx="7.8" cy="6.5" r="0.65" fill="#FFFFFF" />
            <circle cx="2.5" cy="10" r="0.65" fill="#FFFFFF" />
            <circle cx="6" cy="10" r="0.65" fill="#FFFFFF" />
            <circle cx="9.5" cy="10" r="0.65" fill="#FFFFFF" />
          </g>
        </svg>
      </div>

      <style>{`
        .lang-toggle-capsule {
          width: 76px;
          height: 38px;
          background-color: #121A15;
          border: 1.5px solid rgba(197, 168, 128, 0.35);
          border-radius: 99px;
          position: relative;
          cursor: pointer;
          user-select: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .lang-toggle-capsule:hover {
          border-color: var(--color-primary-gold);
          box-shadow: 0 4px 16px rgba(197, 168, 128, 0.25);
        }

        .lang-toggle-slider {
          position: absolute;
          top: 1.5px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(197, 168, 128, 0.18);
          border: 1px solid var(--color-primary-gold);
          box-shadow: 0 0 8px rgba(197, 168, 128, 0.3);
          transition: left 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
        }

        .slide-left {
          left: 2px;
        }

        .slide-right {
          left: 39px;
        }

        .flag-wrapper {
          position: absolute;
          top: 1.5px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: filter var(--transition-smooth), transform var(--transition-smooth);
        }

        .flag-wrapper.flag-pt {
          left: 2px;
        }

        .flag-wrapper.flag-en {
          left: 39px;
        }

        .flag-wrapper.active {
          filter: grayscale(0) opacity(1);
          transform: scale(1.05);
        }

        .flag-wrapper.inactive {
          filter: grayscale(1) opacity(0.4);
          transform: scale(0.9);
        }

        .flag-svg {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
