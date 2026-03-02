import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { GalleryImage } from '../types';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'gallery'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const galleryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setImages(galleryList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="gallery" className="py-24 px-6 bg-luxury-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-500 font-medium tracking-[0.3em] uppercase text-sm"
          >
            Visual Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mt-4 gold-text-gradient"
          >
            The Kohinoor Ambiance
          </motion.h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6">
                <p className="text-gold-400 font-serif text-xl text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
