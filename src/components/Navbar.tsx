import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Star } from "lucide-react";
import { cn } from "../utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled
          ? "bg-luxury-black/80 backdrop-blur-lg border-b border-white/10 py-3"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
          onClick={() => {
            const el = document.querySelector(navLinks[0].href);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center gold-glow">
            <span className="text-luxury-black font-serif font-bold text-xl">
              K
            </span>
          </div>
          <span className="text-2xl font-serif font-bold tracking-widest gold-text-gradient uppercase">
            Kohinoor
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.button
              style={{ cursor: "pointer" }}
              key={link.name}
              onClick={() => {
                const el = document.querySelector(link.href);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-medium text-white/70 hover:text-gold-400 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold-500 hover:bg-gold-400 text-luxury-black px-6 py-2 rounded-full text-sm font-bold transition-all gold-glow"
          >
            BOOK A TABLE
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-charcoal border-t border-white/10 overflow-hidden mt-4 rounded-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  onClick={() => {
                    const el = document.querySelector(link.href);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {link.name}
                </button>
              ))}
              <button className="bg-gold-500 text-luxury-black px-6 py-3 rounded-full font-bold gold-glow">
                BOOK A TABLE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
