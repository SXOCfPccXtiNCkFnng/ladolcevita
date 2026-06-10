import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import whatsappIcon from '../assets/whatsapp.png';
import { useSettings } from '../context/SettingsContext';

export default function Header({ currentTab, setCurrentTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSettings();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'destinos', label: 'Destinos' },
    { id: 'sobre-nos', label: 'Sobre Nós' },
    { id: 'proximas-viagens', label: 'Próximas Viagens' },
    { id: 'nossos-momentos', label: 'Nossos Momentos' },
    { id: 'contato', label: 'Contato' }
  ];

  // Efeito de rolagem para controle de transparência da Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (currentTab === 'home' || currentTab === 'destinos' || currentTab === 'proximas-viagens' || currentTab === 'nossos-momentos' || currentTab === 'contato' || currentTab === 'sobre-nos') {
      window.addEventListener('scroll', handleScroll);
      // Inicializa o estado com base na posição de rolagem atual
      setScrolled(window.scrollY > 30);
    } else {
      setScrolled(true); // Sempre sólida em outras páginas
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentTab]);

  const handleNavClick = (id) => {
    window.scrollTo(0, 0);
    setCurrentTab(id);
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Olá! Acessei o site da La Dolce Vita e gostaria de conversar com um especialista em viagens.");
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${message}`, '_blank');
  };

  return (
    <header className={`header-container ${scrolled || isMenuOpen ? 'scrolled' : ''}`}>
      <div className="container header-content">
        {/* Logo */}
        <div className="logo-area" onClick={() => handleNavClick('home')}>
          <img src={logo} alt="La Dolce Vita" className="logo-img" />
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-link-btn ${currentTab === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* WhatsApp CTA button */}
        <div className="header-cta">
          <button onClick={openWhatsApp} className="btn header-whatsapp-btn">
            <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon-img" />
            <span>Falar com Especialista</span>
          </button>
          
          {/* Mobile menu trigger */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Alternar Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`mobile-nav-link ${currentTab === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li style={{ marginTop: '24px', padding: '0 24px' }}>
              <button 
                onClick={openWhatsApp} 
                className="btn header-whatsapp-btn w-full"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon-img" style={{ filter: 'brightness(0) invert(1)' }} />
                <span>Falar com Especialista</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* CSS específico do Header */}
      <style>{`
        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height);
          background-color: transparent;
          border-bottom: 1px solid transparent;
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: var(--transition-smooth);
          box-shadow: none;
        }

        .header-container.scrolled {
          background-color: var(--color-bg-cream);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: var(--shadow-subtle);
          height: 70px; /* Reduz ligeiramente a altura da barra ao rolar */
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
        }

        .logo-area {
          cursor: pointer;
        }

        .logo-img {
          max-height: 46px;
          object-fit: contain;
          transition: var(--transition-smooth);
          filter: brightness(0) invert(1) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3));
        }

        .header-container.scrolled .logo-img {
          max-height: 38px;
          filter: none;
        }

        .desktop-nav ul {
          display: flex;
          list-style: none;
          gap: 22px;
        }

        .nav-link-btn {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #FFFFFF;
          text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          padding: 8px 0;
          position: relative;
          transition: var(--transition-fast);
        }

        .header-container.scrolled .nav-link-btn {
          color: var(--color-dark-green);
          text-shadow: none;
        }

        .nav-link-btn:hover {
          color: var(--color-primary-gold);
        }

        .header-container.scrolled .nav-link-btn:hover {
          color: var(--color-primary-gold-dark);
        }

        .nav-link-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--color-primary-gold);
          transition: var(--transition-smooth);
        }

        .nav-link-btn.active {
          color: var(--color-primary-gold) !important;
          text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
        }

        .header-container.scrolled .nav-link-btn.active {
          color: var(--color-primary-gold-dark) !important;
          text-shadow: none;
        }

        .header-cta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-whatsapp-btn {
          background-color: var(--color-dark-green);
          border: 1px solid var(--color-dark-green);
          color: #FFFFFF;
          border-radius: var(--border-radius-sm);
          padding: 8px 18px;
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: var(--transition-smooth);
        }

        .header-whatsapp-btn:hover {
          background-color: var(--color-primary-gold);
          border-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
        }

        /* Adaptações do botão de WhatsApp para o cabeçalho transparente */
        .header-container:not(.scrolled) .header-whatsapp-btn {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.8);
          color: #FFFFFF;
          backdrop-filter: blur(4px);
        }

        .header-container:not(.scrolled) .header-whatsapp-btn:hover {
          background-color: #FFFFFF;
          border-color: #FFFFFF;
          color: var(--color-dark-green);
        }

        .whatsapp-icon-img {
          width: 15px;
          height: 15px;
          margin-right: 6px;
          object-fit: contain;
          filter: brightness(0) invert(1);
          transition: var(--transition-fast);
        }

        .header-whatsapp-btn:hover .whatsapp-icon-img {
          filter: none;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--color-dark-green);
          cursor: pointer;
        }

        /* Menu Mobile Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 100%;
          height: 0;
          background: var(--color-bg-light);
          overflow: hidden;
          transition: var(--transition-smooth);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border-bottom: 0px solid var(--glass-border);
          z-index: 999;
        }

        .mobile-nav-drawer.open {
          height: auto;
          max-height: calc(100vh - var(--header-height));
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 30px;
        }

        .mobile-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          padding: 16px 0;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-dark);
          width: 100%;
          text-align: left;
          padding: 14px 28px;
          cursor: pointer;
          transition: var(--transition-fast);
          border-left: 3px solid transparent;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background-color: var(--color-bg-cream);
          color: var(--color-dark-green);
          border-left-color: var(--color-primary-gold);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
          filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.5));
        }

        .header-container.scrolled .mobile-menu-toggle {
          color: var(--color-dark-green);
          filter: none;
        }

        /* Menu Mobile Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 100%;
          height: 0;
          background: var(--color-bg-light);
          overflow: hidden;
          transition: var(--transition-smooth);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border-bottom: 0px solid var(--glass-border);
          z-index: 999;
        }

        .header-container.scrolled + .mobile-nav-drawer {
          top: 70px;
        }

        .mobile-nav-drawer.open {
          height: auto;
          max-height: calc(100vh - var(--header-height));
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 30px;
        }

        .mobile-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          padding: 16px 0;
        }

        .mobile-nav-link {
          background: none;
          border: none;
          font-family: var(--font-body);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-dark);
          width: 100%;
          text-align: left;
          padding: 14px 28px;
          cursor: pointer;
          transition: var(--transition-fast);
          border-left: 3px solid transparent;
        }

        .mobile-nav-link:hover, .mobile-nav-link.active {
          background-color: var(--color-bg-cream);
          color: var(--color-dark-green);
          border-left-color: var(--color-primary-gold);
        }

        @media (max-width: 1200px) {
          .desktop-nav ul {
            gap: 14px;
          }
          .nav-link-btn {
            font-size: 0.75rem;
          }
          .header-whatsapp-btn {
            padding: 8px 14px;
            font-size: 0.72rem;
          }
        }

        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .header-whatsapp-btn span {
            display: none;
          }
          
          .header-whatsapp-btn {
            padding: 10px;
            border-radius: 50%;
          }
          
          .header-whatsapp-btn .whatsapp-icon-img {
            margin-right: 0 !important;
          }
        }
      `}</style>
    </header>
  );
}
