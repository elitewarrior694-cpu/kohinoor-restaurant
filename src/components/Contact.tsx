import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, Navigation } from 'lucide-react';

export default function Contact() {
  return (
    <footer id="contact" className="bg-luxury-charcoal pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center gold-glow">
                <span className="text-luxury-black font-serif font-bold text-2xl">K</span>
              </div>
              <span className="text-3xl font-serif font-bold tracking-widest gold-text-gradient uppercase">
                Kohinoor
              </span>
            </motion.div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-1">Our Location</h4>
                  <p className="text-white/60">10, Park Rd, Civil Lines, Gorakhpur, Uttar Pradesh 273001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-1">Call Us</h4>
                  <p className="text-white/60">+91 96216 43648</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-500 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-serif font-bold text-lg mb-1">Open Hours</h4>
                  <p className="text-white/60">Open Daily: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-12">
              <motion.a
                href="tel:+919621643648"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-gold-500 text-luxury-black px-6 py-3 rounded-full font-bold gold-glow"
              >
                <Phone size={18} /> Call Now
              </motion.a>
              <motion.a
                href="https://wa.me/919621643648"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              >
                <MessageCircle size={18} /> WhatsApp
              </motion.a>
              <motion.a
                href="https://goo.gl/maps/your-link"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-bold border border-white/10"
              >
                <Navigation size={18} /> Directions
              </motion.a>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden h-[400px] glass-card border-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.903824330689!2d83.3712103753361!3d26.74744787674646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399144673854694b%3A0x868453f08077598!2sKohinoor%20Restaurant!5e0!3m2!1sen!2sin!4v1709369000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-sm">
            © 2024 Kohinoor Restaurant Gorakhpur. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-white/30 text-sm">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="/admin" className="hover:text-gold-400 transition-colors">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
