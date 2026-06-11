import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Compass, PlusSquare } from 'lucide-react';

export default function PwaPrompt() {
  const [isInstalled, setIsInstalled] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const [isPushSubscribed, setIsPushSubscribed] = useState(true); // Inicializa como true para evitar flash visual

  useEffect(() => {
    // 1. Detecta se está rodando em modo standalone (PWA instalado)
    const checkStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || window.navigator.standalone 
      || document.referrer.includes('android-app://');
    
    setIsInstalled(checkStandalone);

    // 2. Detecta sistema operacional
    const userAgent = window.navigator.userAgent.toLowerCase();
    const detectIOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(detectIOS);

    // 3. Se não estiver instalado E for um dispositivo móvel/tablet, mostra o banner de sugestão de instalação
    const isMobileDevice = /iphone|ipad|ipod|android|webos|blackberry|iemobile|opera mini/i.test(navigator.userAgent)
      || (window.matchMedia && window.matchMedia('(max-width: 992px)').matches);

    if (!checkStandalone && isMobileDevice) {
      // Exibe o aviso após 3 segundos para não sobrecarregar na entrada
      const timer = setTimeout(() => {
        // Verifica se o usuário já fechou o banner nesta sessão
        const bannerClosed = sessionStorage.getItem('la-dolce-vita-pwa-prompt-closed');
        if (!bannerClosed) {
          setShowPrompt(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 4. Captura o prompt de instalação nativo no Android / Chrome
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // 5. Inicialização automática do OneSignal apenas quando o PWA for instalado (standalone) ou em modo teste (?test-push=true)
  useEffect(() => {
    const isTestMode = window.location.search.includes('test-push=true');
    const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
    console.log('[PwaPrompt Debug] useEffect. isInstalled:', isInstalled, 'isTestMode:', isTestMode, 'appId:', appId);
    if (isInstalled || isTestMode) {
      if (appId && appId !== 'YOUR_APP_ID_HERE') {
        if (!window.OneSignal) {
          console.log('[PwaPrompt Debug] Appending OneSignal script...');
          const script = document.createElement('script');
          script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
          script.defer = true;
          script.onload = () => {
            window.OneSignal = window.OneSignal || [];
            window.OneSignal.push(async () => {
              await window.OneSignal.init({
                appId: appId,
                notifyButton: {
                  enable: false
                },
                welcomeNotification: {
                  title: "La Dolce Vita",
                  message: "Inscrição realizada com sucesso! Avisaremos por aqui quando houver novidades."
                }
              });

              // Verifica o status de inscrição inicial
              const optedIn = window.OneSignal.User.pushSubscription.optedIn;
              setIsPushSubscribed(optedIn);

              const hasClosedPrompt = sessionStorage.getItem('la-dolce-vita-push-prompt-closed') === 'true';
              if (!optedIn && !hasClosedPrompt) {
                setShowPushPrompt(true);
              }

              // Ouvir mudanças na inscrição
              window.OneSignal.User.pushSubscription.addEventListener('change', (event) => {
                const isSubbed = event.current.optedIn;
                setIsPushSubscribed(isSubbed);
                if (isSubbed) {
                  setShowPushPrompt(false);
                }
              });
            });
          };
          document.head.appendChild(script);
        }
      }
    }
  }, [isInstalled]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA instalado com sucesso pelo prompt nativo.');
          setIsInstalled(true);
          setShowPrompt(false);
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleClosePrompt = () => {
    sessionStorage.setItem('la-dolce-vita-pwa-prompt-closed', 'true');
    setShowPrompt(false);
  };

  const handleAcceptPush = async () => {
    if (window.OneSignal) {
      try {
        await window.OneSignal.Notifications.requestPermission();
        setShowPushPrompt(false);
      } catch (err) {
        console.error('Erro ao solicitar permissão de notificações:', err);
      }
    }
  };

  const handleDeclinePush = () => {
    sessionStorage.setItem('la-dolce-vita-push-prompt-closed', 'true');
    setShowPushPrompt(false);
  };

  if (!showPrompt && !showPushPrompt) return null;

  return (
    <>
      {showPrompt && !isInstalled && (
        <div className="pwa-install-prompt-bar glass-card animate-fade-in-up">
          <button onClick={handleClosePrompt} className="pwa-close-btn" aria-label="Fechar">
            <X size={16} />
          </button>

          <div className="pwa-prompt-header">
            <div className="pwa-icon-wrapper">
              <Smartphone size={22} className="pwa-phone-icon" />
            </div>
            <div className="pwa-title-area">
              <h4>Instalar o Aplicativo</h4>
              <p>Instale em sua tela de início para acessar offline e ativar as notificações de novas viagens.</p>
            </div>
          </div>

          <div className="pwa-instructions-area">
            {isIOS ? (
              <div className="ios-instructions">
                <p className="instruction-step">
                  <Compass size={14} className="step-icon" />
                  1. Toque no botão de <strong>Compartilhar</strong> (ícone de quadrado com seta para cima no Safari).
                </p>
                <p className="instruction-step">
                  <PlusSquare size={14} className="step-icon" />
                  2. Role para baixo e selecione <strong>Adicionar à Tela de Início</strong>.
                </p>
              </div>
            ) : deferredPrompt ? (
              <button onClick={handleInstallClick} className="btn btn-pwa-install">
                <Download size={15} style={{ marginRight: '8px' }} />
                <span>Baixar Aplicativo</span>
              </button>
            ) : (
              <div className="generic-instructions">
                <p>Clique nas opções do navegador (três pontos) e selecione <strong>Adicionar à tela inicial</strong> ou <strong>Instalar Aplicativo</strong>.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showPushPrompt && (
        <div className="push-prompt-bar glass-card animate-fade-in-up">
          <button onClick={handleDeclinePush} className="pwa-close-btn" aria-label="Fechar">
            <X size={16} />
          </button>

          <div className="pwa-prompt-header">
            <div className="pwa-icon-wrapper">
              <Smartphone size={22} className="pwa-phone-icon" />
            </div>
            <div className="pwa-title-area">
              <h4 className="push-prompt-title">Ativar Notificações</h4>
              <p className="push-prompt-desc">Deseja ser notificado sobre novas viagens exclusivas diretamente no seu celular?</p>
            </div>
          </div>

          <div className="push-prompt-buttons">
            <button onClick={handleAcceptPush} className="btn-push-accept">
              Ativar
            </button>
            <button onClick={handleDeclinePush} className="btn-push-decline">
              Depois
            </button>
          </div>
        </div>
      )}

      <style>{`
        .pwa-install-prompt-bar {
          position: fixed;
          bottom: 30px;
          right: 30px;
          max-width: 420px;
          padding: 24px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-radius: var(--border-radius-md);
          background: rgba(26, 38, 29, 0.95);
          border: 1px solid rgba(197, 168, 128, 0.3);
          backdrop-filter: blur(12px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          color: #ffffff;
        }

        .push-prompt-bar {
          position: fixed;
          bottom: 30px;
          left: 30px;
          max-width: 420px;
          padding: 24px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-radius: var(--border-radius-md);
          background: rgba(26, 38, 29, 0.96);
          border: 1px solid rgba(197, 168, 128, 0.35);
          backdrop-filter: blur(12px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.45);
          color: #ffffff;
        }

        .push-prompt-title {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--color-primary-gold);
        }

        .push-prompt-desc {
          font-size: 0.78rem;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.75);
          margin: 0;
        }

        .push-prompt-buttons {
          display: flex;
          gap: 12px;
          margin-top: 4px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 14px;
        }

        .btn-push-accept {
          background-color: var(--color-primary-gold);
          color: var(--color-dark-green-dark);
          border: 1px solid var(--color-primary-gold);
          padding: 10px 18px;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-smooth);
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-push-accept:hover {
          background-color: transparent;
          color: #ffffff;
          border-color: #ffffff;
        }

        .btn-push-decline {
          background-color: transparent;
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 10px 18px;
          font-weight: 600;
          font-size: 0.8rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: var(--transition-smooth);
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-push-decline:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.5);
        }

        .pwa-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .pwa-close-btn:hover {
          color: #ffffff;
        }

        .pwa-prompt-header {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding-right: 16px;
        }

        .pwa-icon-wrapper {
          background-color: rgba(197, 168, 128, 0.2);
          border-radius: var(--border-radius-sm);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--color-primary-gold);
          border: 1px solid rgba(197, 168, 128, 0.2);
        }

        .pwa-title-area h4 {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--color-primary-gold);
        }

        .pwa-title-area p {
          font-size: 0.78rem;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.75);
          margin: 0;
        }

        .pwa-instructions-area {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 14px;
        }

        .ios-instructions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .instruction-step {
          font-size: 0.76rem;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-icon {
          color: var(--color-primary-gold);
          flex-shrink: 0;
        }

        .btn-pwa-install {
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

        .btn-pwa-install:hover {
          background-color: transparent;
          color: #ffffff;
          border-color: #ffffff;
        }

        .generic-instructions p {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 576px) {
          .pwa-install-prompt-bar, .push-prompt-bar {
            bottom: 20px;
            left: 20px;
            right: 20px;
            max-width: calc(100% - 40px);
          }
          .push-prompt-buttons {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </>
  );
}
