import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Review } from '../types';
import { Star, Quote } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm<{ name: string; rating: number; message: string }>();
  const ratingValue = watch('rating', 5);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(reviewList);
    });
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        ...data,
        rating: Number(data.rating),
        createdAt: Date.now()
      });
      reset();
      alert('Thank you for your royalty review!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '4.7';

  return (
    <section id="reviews" className="py-24 px-6 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Stats & Form */}
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold-500 font-medium tracking-[0.3em] uppercase text-sm"
            >
              Guest Experiences
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-8 gold-text-gradient"
            >
              What Royalty Says
            </motion.h2>

            <div className="flex items-center gap-6 mb-12 p-8 glass-card">
              <div className="text-center">
                <div className="text-5xl font-serif font-bold text-gold-400">{averageRating}</div>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(Number(averageRating)) ? "fill-gold-500 text-gold-500" : "text-white/20"} />
                  ))}
                </div>
                <div className="text-white/40 text-xs mt-2 uppercase tracking-widest">{reviews.length || 1468} Reviews</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter(r => Math.round(r.rating) === star).length;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : (star === 5 ? 85 : 5);
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-white/40 w-4">{star}★</span>
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          className="h-full bg-gold-500/50"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Share Your Experience</h3>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Your Name</label>
                <input
                  {...register('name', { required: true })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Rating ({ratingValue} Stars)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  {...register('rating', { required: true })}
                  className="w-full accent-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Review Message</label>
                <textarea
                  {...register('message', { required: true })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all resize-none"
                  placeholder="Tell us about your visit..."
                />
              </div>
              <button
                disabled={isSubmitting}
                className="w-full py-4 bg-gold-500 text-luxury-black rounded-lg font-bold gold-glow hover:bg-gold-400 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          {/* Right: Review List */}
          <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass-card p-8 relative"
              >
                <Quote className="absolute top-4 right-4 text-gold-500/10" size={48} />
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center text-gold-500 font-serif font-bold text-xl">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white">{review.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-gold-500 text-gold-500" : "text-white/20"} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/60 italic leading-relaxed">"{review.message}"</p>
                <div className="mt-4 text-[10px] uppercase tracking-widest text-white/20">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-20 text-white/20 font-serif italic">
                Be the first to leave a review...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
