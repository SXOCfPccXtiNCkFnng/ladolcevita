import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinos from './pages/Destinos';
import SobreNos from './pages/SobreNos';
import ProximasViagens from './pages/ProximasViagens';
import NossosMomentos from './pages/NossosMomentos';
import Contato from './pages/Contato';
import Admin from './pages/Admin';
import whatsappIcon from './assets/whatsapp.png';

import { useSettings } from './context/SettingsContext';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const { settings } = useSettings();

  // Efeito global para observer de animação de entrada (reveal scroll) nas páginas
  useEffect(() => {
    // Adiciona uma pequena folga para garantir que o DOM da nova página já esteja montado
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        { threshold: 0.1 }
      );

      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach((el) => observer.observe(el));

      return () => {
        revealElements.forEach((el) => observer.unobserve(el));
      };
    }, 150);

    return () => clearTimeout(timer);
  }, [currentTab]);

  // Listener para rota secreta de administração via hash (#painel-secreto)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#painel-secreto') {
        setCurrentTab('admin');
        window.scrollTo(0, 0);
      }
    };

    // Executa no carregamento inicial da página
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Limpa a hash do admin quando o usuário navega para outras páginas
  useEffect(() => {
    if (currentTab !== 'admin' && window.location.hash === '#painel-secreto') {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }, [currentTab]);

  // Renderiza a página com base na tab ativa
  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'destinos':
        return <Destinos />;
      case 'sobre-nos':
        return <SobreNos />;
      case 'proximas-viagens':
        return <ProximasViagens />;
      case 'nossos-momentos':
        return <NossosMomentos />;
      case 'contato':
        return <Contato />;
      case 'admin':
        return <Admin />;
      default:
        return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Olá! Acessei o site da La Dolce Vita e gostaria de planejar minha próxima viagem.");
    window.open(`https://wa.me/${settings.whatsapp || '5514999999999'}?text=${text}`, '_blank');
  };

  return (
    <div className="app-wrapper">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main className="main-content-area">
        {renderContent()}
      </main>
      
      <Footer currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Botão Flutuante do WhatsApp */}
      <button 
        onClick={openWhatsApp} 
        className="floating-whatsapp-btn"
        aria-label="Conversar no WhatsApp"
        title="Fale Conosco no WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="floating-whatsapp-icon" />
      </button>

      <style>{`
        .app-wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content-area {
          flex-grow: 1;
          padding-top: ${currentTab === 'home' || currentTab === 'destinos' || currentTab === 'proximas-viagens' || currentTab === 'nossos-momentos' || currentTab === 'contato' || currentTab === 'sobre-nos' ? '0' : 'var(--header-height)'};
        }

        .placeholder-page {
          padding: 160px 24px 100px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }

        .placeholder-page h2 {
          font-size: 3rem;
          color: var(--color-dark-green);
          margin-bottom: 16px;
        }

        .placeholder-page p {
          font-size: 1.1rem;
          max-width: 500px;
          margin-bottom: 32px;
        }

        /* Botão Flutuante do WhatsApp */
        .floating-whatsapp-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background-color: #25D366;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          z-index: 9999;
          transition: var(--transition-smooth);
          animation: pulse-whatsapp 2s infinite;
        }

        .floating-whatsapp-btn:hover {
          transform: scale(1.1) translateY(-3px);
          background-color: #128C7E;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
        }

        .floating-whatsapp-icon {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: brightness(0) invert(1); /* Torna o ícone verde em branco para visual de luxo */
        }

        @keyframes pulse-whatsapp {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @media (max-width: 768px) {
          .floating-whatsapp-btn {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
          }
          .floating-whatsapp-icon {
            width: 26px;
            height: 26px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
