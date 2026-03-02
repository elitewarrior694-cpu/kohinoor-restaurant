import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Car, Truck } from 'lucide-react';

const services = [
  {
    title: 'Dine-in Experience',
    description: 'Elegant ambiance, comfortable seating, and a warm family-friendly atmosphere for your celebrations.',
    icon: Utensils,
    delay: 0.1
  },
  {
    title: 'Drive-through',
    description: 'Quick and convenient pickup without leaving your vehicle. Quality food on the go.',
    icon: Car,
    delay: 0.2
  },
  {
    title: 'No-contact Delivery',
    description: 'Safe, hygienic, and timely doorstep delivery to enjoy our royalty at your home.',
    icon: Truck,
    delay: 0.3
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-luxury-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gold-500 font-medium tracking-[0.3em] uppercase text-sm"
          >
            Our Services
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mt-4 gold-text-gradient"
          >
            Excellence in Every Detail
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: service.delay }}
              whileHover={{ y: -10 }}
              className="glass-card p-10 group hover:border-gold-500/30 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-500">
                <service.icon className="text-gold-500 group-hover:text-luxury-black transition-colors duration-500" size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-gold-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mt-8 w-12 h-1 bg-gold-500/20 group-hover:w-full group-hover:bg-gold-500 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
