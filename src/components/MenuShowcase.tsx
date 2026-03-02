import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { MenuItem } from '../types';
import { Star } from 'lucide-react';

export default function MenuShowcase() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'menu'), orderBy('title'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const menuItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setItems(menuItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', ...new Set(items.map(item => item.category))];
  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 bg-luxury-charcoal/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-500 font-medium tracking-[0.3em] uppercase text-sm"
          >
            Culinary Masterpieces
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mt-4 gold-text-gradient"
          >
            Our Signature Menu
          </motion.h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat 
                  ? 'bg-gold-500 text-luxury-black border-gold-500 gold-glow' 
                  : 'border-white/10 text-white/60 hover:border-gold-500/50 hover:text-gold-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="glass-card overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop'}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 bg-gold-500 text-luxury-black px-3 py-1 rounded-full font-bold text-sm gold-glow">
                    ₹{item.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-white/50 text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <button className="w-full py-2 border border-gold-500/30 text-gold-500 rounded-lg text-sm font-bold hover:bg-gold-500 hover:text-luxury-black transition-all">
                    Order Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && !loading && (
          <div className="text-center py-20 text-white/30 font-serif italic text-xl">
            Our chefs are preparing the menu...
          </div>
        )}
      </div>
    </section>
  );
}
