'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface Banner {
  id: string;
  image_url: string;
  file_path: string;
  is_active: boolean;
  created_at: string;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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

      // 1. Upload to Supabase Storage Bucket "banners"
      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(filePath);

      // 3. Save to database
      const { error: dbError } = await supabase.from('banners').insert({
        image_url: publicUrl,
        file_path: filePath,
        is_active: true,
      });

      if (dbError) {
        throw dbError;
      }

      alert('Banner uploaded successfully!');
      fetchBanners();
    } catch (error: any) {
      alert(`Error uploading: ${error.message}`);
    } finally {
      setUploading(false);
      // Reset file input
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
      // 1. Delete from storage
      const { error: storageError } = await supabase.storage
        .from('banners')
        .remove([filePath]);

      if (storageError) throw storageError;

      // 2. Delete from database
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
          <p className="text-primary text-xs font-bold mt-2 uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">info</span>
            Recommended: Square (1:1 ratio, e.g. 1200x1200px)
          </p>
        </div>
        
        <div>
          <label className="cursor-pointer bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dim transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">upload</span>
            {uploading ? 'Uploading...' : 'Upload New Banner'}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-surface-container py-20 text-center rounded-3xl border border-dashed border-outline-variant/40">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4 opacity-50">crop_original</span>
          <h3 className="text-xl font-bold text-on-surface">No banners found</h3>
          <p className="text-on-surface-variant mt-2">Upload an image to start showing banners on the home page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm ${banner.is_active ? 'border-primary/30 ring-2 ring-primary/10' : 'border-outline-variant/20 opacity-75'}`}>
              <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden group">
                <Image 
                  src={banner.image_url} 
                  alt="Banner" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                />
                {!banner.is_active && (
                  <div className="absolute inset-0 z-20 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-white/90 text-on-surface px-4 py-1.5 rounded-full font-bold text-sm">Inactive</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex items-center justify-between bg-surface-container-lowest">
                <button
                  onClick={() => toggleActive(banner.id, banner.is_active)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                    banner.is_active 
                      ? 'bg-success/10 text-success hover:bg-success/20' 
                      : 'bg-surface-container text-on-surface-variant hover:bg-outline-variant/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {banner.is_active ? 'visibility' : 'visibility_off'}
                  </span>
                  {banner.is_active ? 'Active' : 'Hidden'}
                </button>

                <button
                  onClick={() => handleDelete(banner.id, banner.file_path)}
                  className="p-2 text-error/70 hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                  title="Delete Banner"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
