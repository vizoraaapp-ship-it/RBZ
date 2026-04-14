'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';

interface Banner {
  id: string;
  image_url: string;
  file_path: string;
  is_active: boolean;
  banner_type: 'image_only' | 'with_text';
  badge: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  accent_color: string;
  created_at: string;
}

const INITIAL_FORM_STATE = {
  banner_type: 'with_text' as const,
  badge: '',
  title: '',
  description: '',
  cta_text: 'Get a Free Quote',
  cta_link: '/contact',
  secondary_cta_text: 'Explore Services',
  secondary_cta_link: '/services',
  accent_color: 'from-primary to-primary-dim',
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching banners:', error);
    } else {
      setBanners(data || []);
    }
    setLoading(false);
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      banner_type: banner.banner_type || 'with_text',
      badge: banner.badge || '',
      title: banner.title || '',
      description: banner.description || '',
      cta_text: banner.cta_text || 'Get a Free Quote',
      cta_link: banner.cta_link || '/contact',
      secondary_cta_text: banner.secondary_cta_text || 'Explore Services',
      secondary_cta_link: banner.secondary_cta_link || '/services',
      accent_color: banner.accent_color || 'from-primary to-primary-dim',
    });
    setIsModalOpen(true);
  };

  const handleSaveBanner = async () => {
    if (!editingBanner) return;
    
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('banners')
        .update(formData)
        .eq('id', editingBanner.id);

      if (error) throw error;
      
      setIsModalOpen(false);
      fetchBanners();
    } catch (error: any) {
      alert(`Error saving banner: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(filePath);

      const { data: newBanner, error: dbError } = await supabase.from('banners').insert({
        image_url: publicUrl,
        file_path: filePath,
        is_active: true,
        ...INITIAL_FORM_STATE
      }).select().single();

      if (dbError) throw dbError;

      fetchBanners();
      if (newBanner) openEditModal(newBanner);
    } catch (error: any) {
      alert(`Error uploading: ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('banners')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      alert(`Error updating banner: ${error.message}`);
    } else {
      fetchBanners();
    }
  };

  const handleDelete = async (id: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const { error: storageError } = await supabase.storage
        .from('banners')
        .remove([filePath]);

      if (storageError) console.error('Storage deletion failed, continuing with DB removal');

      const { error: dbError } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      fetchBanners();
    } catch (error: any) {
      alert(`Error deleting banner: ${error.message}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/20 pb-6">
        <div>
          <h1 className="text-3xl font-black text-on-surface tracking-tight mb-2">Manage Banners</h1>
          <p className="text-on-surface-variant font-medium">Upload and manage rotating banners for the Home page hero section.</p>
          <div className="flex gap-4 mt-3">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Dynamic Text</span>
            <span className="bg-secondary-fixed/10 text-secondary-fixed px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Full Aspect Control</span>
          </div>
        </div>
        
        <div className="relative">
          <label className="cursor-pointer bg-primary text-white px-8 py-4 rounded-2xl font-black hover:bg-primary-dim transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center gap-3">
            <span className="material-symbols-outlined font-bold">add_photo_alternate</span>
            {uploading ? 'Processing Image...' : 'New Banner'}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : banners.length === 0 ? (
        <div className="bg-surface-container py-32 text-center rounded-[3rem] border-2 border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/40 mb-6 scale-125">landscape</span>
          <h3 className="text-2xl font-black text-on-surface">Your Hero stage is empty</h3>
          <p className="text-on-surface-variant font-medium mt-2">Upload your first high-fidelity banner to bring your site to life.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {banners.map((banner) => (
            <div key={banner.id} className={`group bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5 ${banner.is_active ? 'border-primary/20 bg-surface-container-lowest' : 'border-outline-variant/20 opacity-80'}`}>
              <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden">
                <Image src={banner.image_url} alt="Banner" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-1/3 animate-[loading_2s_infinite]"></div>
                   </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${banner.banner_type === 'with_text' ? 'bg-primary/90 text-white' : 'bg-white/90 text-on-surface'}`}>
                     {banner.banner_type === 'with_text' ? 'Overlay active' : 'Image only'}
                   </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-black text-on-surface line-clamp-1 text-lg">{banner.title || 'Untitled Banner'}</h4>
                  <p className="text-on-surface-variant text-sm font-medium opacity-70 mt-0.5">{banner.badge || 'No badge set'}</p>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <button onClick={() => openEditModal(banner)} className="flex-grow flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-3 rounded-xl font-bold transition-all hover:scale-[1.02]">
                    <span className="material-symbols-outlined text-[20px]">edit</span> Edit Details
                  </button>
                  <button onClick={() => toggleActive(banner.id, banner.is_active)} className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${banner.is_active ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-outline-variant/10 text-on-surface-variant hover:bg-outline-variant/20'}`}>
                    <span className="material-symbols-outlined">{banner.is_active ? 'visibility' : 'visibility_off'}</span>
                  </button>
                  <button onClick={() => handleDelete(banner.id, banner.file_path)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-error/10 text-error hover:bg-error/20 transition-all">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Configure Banner">
        <div className="space-y-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-black text-on-surface-variant uppercase tracking-wider">Display Type</label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-surface-container-low rounded-2xl">
                <button 
                  onClick={() => setFormData({...formData, banner_type: 'with_text'})}
                  className={`py-3 px-4 rounded-xl font-bold flex flex-col items-center gap-1 transition-all ${formData.banner_type === 'with_text' ? 'bg-white shadow-md text-primary' : 'text-on-surface-variant opacity-60'}`}
                >
                  <span className="material-symbols-outlined">text_fields</span>
                  <span className="text-[10px] uppercase">With Text</span>
                </button>
                <button 
                  onClick={() => setFormData({...formData, banner_type: 'image_only'})}
                  className={`py-3 px-4 rounded-xl font-bold flex flex-col items-center gap-1 transition-all ${formData.banner_type === 'image_only' ? 'bg-white shadow-md text-primary' : 'text-on-surface-variant opacity-60'}`}
                >
                  <span className="material-symbols-outlined">image</span>
                  <span className="text-[10px] uppercase">Image Only</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-black text-on-surface-variant uppercase tracking-wider">Accent Color Theme</label>
              <select 
                value={formData.accent_color}
                onChange={(e) => setFormData({...formData, accent_color: e.target.value})}
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary/30 focus:bg-white rounded-2xl p-4 font-bold transition-all outline-none"
              >
                <option value="from-primary to-primary-dim">Primary (Blue)</option>
                <option value="from-slate-950 via-slate-900 to-slate-800">Neutral (Dark)</option>
                <option value="from-secondary-fixed to-primary">Vibrant (Gold/Blue)</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {formData.banner_type === 'with_text' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6 pt-6 border-t border-outline-variant/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-primary ml-1">Badge Text (Top line)</label>
                    <input type="text" value={formData.badge} onChange={(e) => setFormData({...formData, badge: e.target.value})} className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-xl p-4 font-bold outline-none" placeholder="#1 HVAC Service..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-primary ml-1">Main Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-xl p-4 font-bold outline-none" placeholder="Enter H1 Heading..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-primary ml-1">Hero Description</label>
                  <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-surface-container-low focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-xl p-4 font-bold outline-none resize-none" placeholder="Explain the value proposition..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 bg-surface-container-low rounded-[2rem] space-y-4">
                      <label className="text-xs font-black uppercase text-on-surface opacity-50 block mb-2">Primary Button</label>
                      <input type="text" value={formData.cta_text} onChange={(e) => setFormData({...formData, cta_text: e.target.value})} className="w-full bg-white rounded-xl p-3 font-bold text-sm outline-none border border-outline-variant/20" placeholder="Button Label" />
                      <input type="text" value={formData.cta_link} onChange={(e) => setFormData({...formData, cta_link: e.target.value})} className="w-full bg-white rounded-xl p-3 font-medium text-xs outline-none border border-outline-variant/20" placeholder="/services-page" />
                   </div>
                   <div className="p-6 bg-surface-container-low rounded-[2rem] space-y-4">
                      <label className="text-xs font-black uppercase text-on-surface opacity-50 block mb-2">Secondary Button</label>
                      <input type="text" value={formData.secondary_cta_text} onChange={(e) => setFormData({...formData, secondary_cta_text: e.target.value})} className="w-full bg-white rounded-xl p-3 font-bold text-sm outline-none border border-outline-variant/20" placeholder="Button Label" />
                      <input type="text" value={formData.secondary_cta_link} onChange={(e) => setFormData({...formData, secondary_cta_link: e.target.value})} className="w-full bg-white rounded-xl p-3 font-medium text-xs outline-none border border-outline-variant/20" placeholder="/learn-more" />
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-6 flex justify-end gap-3 sticky bottom-[-2.5rem] bg-white/80 backdrop-blur-md pb-6">
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-4 rounded-2xl font-black text-on-surface-variant hover:bg-surface-container transition-colors">Cancel</button>
            <button 
              onClick={handleSaveBanner} 
              disabled={isSaving}
              className="px-10 py-4 bg-primary text-white rounded-2xl font-black hover:bg-primary-dim transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
            >
              {isSaving && <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>}
              {isSaving ? 'Synchronizing...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
