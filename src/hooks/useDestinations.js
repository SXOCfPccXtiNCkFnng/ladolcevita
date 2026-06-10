import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { mockDestinations } from '../data/mockData';

export function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && db) {
      const destinationsRef = collection(db, 'destinations');
      const unsubscribe = onSnapshot(destinationsRef, (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ 
            docId: doc.id, 
            id: data.id || doc.id,
            title: data.title || '',
            country: data.country || '',
            description: data.description || '',
            image: data.image || '',
            tags: data.tags || [],
            highlights: data.highlights || []
          });
        });
        
        // Se o banco de dados do Firestore estiver conectado mas vazio, fallback para mockDestinations
        if (list.length === 0) {
          setDestinations(mockDestinations);
        } else {
          setDestinations(list);
        }
        setLoading(false);
      }, (error) => {
        console.error("Erro ao carregar destinos do Firestore:", error);
        setDestinations(mockDestinations);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setDestinations(mockDestinations);
      setLoading(false);
    }
  }, []);

  return { destinations, loading };
}
