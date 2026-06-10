import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { mockMoments } from '../data/mockData';

export function useMoments() {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && db) {
      const momentsRef = collection(db, 'moments');
      const unsubscribe = onSnapshot(momentsRef, (snapshot) => {
        const list = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ 
            docId: doc.id, 
            id: data.id || doc.id,
            type: data.type || 'photo',
            category: data.category || 'Experiências',
            title: data.title || '',
            location: data.location || '',
            date: data.date || '',
            description: data.description || '',
            image: data.image || '',
            videoUrl: data.videoUrl || ''
          });
        });
        
        setMoments(list);
        setLoading(false);
      }, (error) => {
        console.error("Erro ao carregar momentos do Firestore:", error);
        setMoments([]);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setMoments(mockMoments);
      setLoading(false);
    }
  }, []);

  return { moments, loading };
}
