import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { MenuItem, GalleryImage, Review } from '../types';
import { uploadToCloudinary, cn } from '../utils';
import { Plus, Trash2, Image as ImageIcon, LogOut, LayoutDashboard, Utensils, Star, Camera } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'menu' | 'gallery' | 'reviews'>('menu');
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubMenu = onSnapshot(query(collection(db, 'menu'), orderBy('title')), (s) => {
      setMenuItems(s.docs.map(d => ({ id: d.id, ...d.data() } as MenuItem)));
    });
    const unsubGallery = onSnapshot(collection(db, 'gallery'), (s) => {
      setGalleryImages(s.docs.map(d => ({ id: d.id, ...d.data() } as GalleryImage)));
    });
    const unsubReviews = onSnapshot(query(collection(db, 'reviews'), orderBy('createdAt', 'desc')), (s) => {
      setReviews(s.docs.map(d => ({ id: d.id, ...d.data() } as Review)));
    });

    return () => {
      unsubMenu();
      unsubGallery();
      unsubReviews();
    };
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleAddMenu = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    
    setIsUploading(true);
    try {
      let imageUrl = '';
      if (file && file.size > 0) {
        imageUrl = await uploadToCloudinary(file);
      }

      await addDoc(collection(db, 'menu'), {
        title: formData.get('title'),
        description: formData.get('description'),
        price: formData.get('price'),
        category: formData.get('category'),
        image: imageUrl
      });
      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to add menu item');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      await addDoc(collection(db, 'gallery'), {
        url: imageUrl,
        caption: formData.get('caption')
      });
      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to add gallery image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (window.confirm('Are you sure?')) {
      await deleteDoc(doc(db, coll, id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-black px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 gold-glow">
              <span className="text-luxury-black font-serif font-bold text-2xl">K</span>
            </div>
            <h1 className="text-3xl font-serif font-bold gold-text-gradient">Admin Portal</h1>
            <p className="text-white/40 text-sm mt-2">Kohinoor Restaurant Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full py-4 bg-gold-500 text-luxury-black rounded-lg font-bold gold-glow hover:bg-gold-400 transition-all">
              Login to Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-luxury-charcoal border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center gold-glow">
            <span className="text-luxury-black font-serif font-bold text-sm">K</span>
          </div>
          <span className="text-xl font-serif font-bold gold-text-gradient">Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'menu', name: 'Menu Items', icon: Utensils },
            { id: 'gallery', name: 'Gallery', icon: Camera },
            { id: 'reviews', name: 'Reviews', icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                activeTab === tab.id ? "bg-gold-500 text-luxury-black gold-glow" : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all mt-auto"
        >
          <LogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-white capitalize">{activeTab} Management</h2>
          <div className="text-white/40 text-sm">Welcome back, Admin</div>
        </header>

        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Add Form */}
            <div className="lg:col-span-1">
              <form onSubmit={handleAddMenu} className="glass-card p-8 space-y-6 sticky top-10">
                <h3 className="text-xl font-serif font-bold text-gold-400 flex items-center gap-2">
                  <Plus size={20} /> Add Menu Item
                </h3>
                <div className="space-y-4">
                  <input name="title" required placeholder="Item Title" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-gold-500" />
                  <textarea name="description" required placeholder="Description" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-gold-500 h-24" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="price" required placeholder="Price (₹)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-gold-500" />
                    <input name="category" required placeholder="Category" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-gold-500" />
                  </div>
                  <div className="relative border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-gold-500/50 transition-all">
                    <input type="file" name="image" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <ImageIcon className="mx-auto text-white/20 mb-2" />
                    <span className="text-xs text-white/40">Click to upload item image</span>
                  </div>
                </div>
                <button disabled={isUploading} className="w-full py-3 bg-gold-500 text-luxury-black rounded-lg font-bold gold-glow disabled:opacity-50">
                  {isUploading ? 'Uploading...' : 'Save Item'}
                </button>
              </form>
            </div>
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {menuItems.map(item => (
                <div key={item.id} className="glass-card p-4 flex items-center gap-6">
                  <img src={item.image} className="w-20 h-20 rounded-lg object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-white">{item.title}</h4>
                    <p className="text-white/40 text-xs">{item.category} • ₹{item.price}</p>
                  </div>
                  <button onClick={() => handleDelete('menu', item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <form onSubmit={handleAddGallery} className="glass-card p-8 space-y-6 sticky top-10">
                <h3 className="text-xl font-serif font-bold text-gold-400 flex items-center gap-2">
                  <Plus size={20} /> Add Gallery Image
                </h3>
                <div className="space-y-4">
                  <input name="caption" required placeholder="Image Caption" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-gold-500" />
                  <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-gold-500/50 transition-all">
                    <input type="file" name="image" required accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Camera className="mx-auto text-white/20 mb-2" size={32} />
                    <span className="text-xs text-white/40">Click to upload high-res photo</span>
                  </div>
                </div>
                <button disabled={isUploading} className="w-full py-3 bg-gold-500 text-luxury-black rounded-lg font-bold gold-glow disabled:opacity-50">
                  {isUploading ? 'Uploading...' : 'Add to Gallery'}
                </button>
              </form>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {galleryImages.map(img => (
                <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-video">
                  <img src={img.url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <button onClick={() => handleDelete('gallery', img.id)} className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="glass-card p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-serif font-bold text-white">{review.name}</h4>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-gold-500 text-gold-500" : "text-white/10"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/60 text-sm italic">"{review.message}"</p>
                  <span className="text-[10px] text-white/20 uppercase tracking-widest mt-2 block">
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </div>
                <button onClick={() => handleDelete('reviews', review.id)} className="p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
