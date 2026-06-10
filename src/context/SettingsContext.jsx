import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const SettingsContext = createContext();

const defaultSettings = {
  facebook: 'https://facebook.com',
  instagram: 'https://www.instagram.com/ladolcevitaviagens/',
  email: 'contato@ladolcevitaviagens.com.br',
  phone: '(14) 99999-9999',
  whatsapp: '5514999999999', // Apenas números para link wa.me
  hours: 'Seg - Sex: 09h às 18h'
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'settings', 'contact');
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        } else {
          // Cria o documento com padrões no Firestore se ele não existir
          setDoc(docRef, defaultSettings).catch(err => console.error("Erro ao inicializar settings:", err));
          setSettings(defaultSettings);
        }
        setLoading(false);
      }, (error) => {
        console.error("Erro ao carregar settings do Firestore:", error);
        setSettings(defaultSettings);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Offline fallback: tenta ler do localStorage local
      const local = localStorage.getItem('local_settings');
      if (local) {
        try {
          setSettings(JSON.parse(local));
        } catch (e) {
          setSettings(defaultSettings);
        }
      } else {
        setSettings(defaultSettings);
      }
      setLoading(false);
    }
  }, []);

  const updateSettings = async (newSettings) => {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'settings', 'contact');
      await setDoc(docRef, newSettings);
    } else {
      // Salva localmente em caso de fallback
      setSettings(newSettings);
      localStorage.setItem('local_settings', JSON.stringify(newSettings));
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings deve ser usado dentro de um SettingsProvider');
  }
  return context;
}
