import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 gold-glow">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
                alt="Kohinoor Ambiance"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-gold-500/50 rounded-tl-3xl z-0" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-gold-500/50 rounded-br-3xl z-0" />
            
            <div className="absolute -bottom-10 -left-10 glass-card p-6 z-20 hidden md:block">
              <div className="text-gold-400 text-4xl font-serif font-bold">15+</div>
              <div className="text-white/60 text-xs uppercase tracking-widest">Years of Culinary<br />Excellence</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-500 font-medium tracking-[0.3em] uppercase text-sm">Our Story</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mt-4 mb-8 gold-text-gradient leading-tight">
              A Legacy of Flavor in the Heart of Gorakhpur
            </h2>
            <div className="space-y-6 text-white/70 text-lg leading-relaxed">
              <p>
                Located in the prestigious Civil Lines area, Kohinoor Restaurant has been a beacon of fine dining for families and food enthusiasts alike. We blend traditional North Indian recipes with a modern, futuristic ambiance.
              </p>
              <p>
                Whether it's a birthday celebration, a family gathering, or a romantic dinner, our welcoming staff and elegant setting provide the perfect backdrop for your most cherished moments.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  'Family-Friendly Atmosphere',
                  'Prime Civil Lines Location',
                  'Authentic North Indian Cuisine',
                  'Perfect for Celebrations',
                  'Excellent Royal Service',
                  'Welcoming Staff'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gold-200/80">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
