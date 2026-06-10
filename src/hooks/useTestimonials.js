import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { mockTestimonials } from '../data/mockData';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && db) {
      const ref = collection(db, 'testimonials');
      const unsubscribe = onSnapshot(ref, (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ 
            docId: doc.id, 
            id: data.id || doc.id,
            name: data.name || '',
            location: data.location || '',
            trip: data.trip || '',
            stars: Number(data.stars) || 5,
            text: data.text || ''
          });
        });
        
        setTestimonials(list);
        setLoading(false);
      }, (error) => {
        console.error("Erro ao carregar depoimentos do Firestore:", error);
        setTestimonials([]);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setTestimonials(mockTestimonials);
      setLoading(false);
    }
  }, []);

  return { testimonials, loading };
}
