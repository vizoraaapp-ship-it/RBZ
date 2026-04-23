'use client';
import React from 'react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BLOGS_DATA } from '@/data/blogs';

export default function Blogs() {
  return (
    <Section id="blogs" background="surface">
      <div className="space-y-12 md:space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Our Insights</h2>
          <h3 className="text-3xl md:text-5xl font-black text-on-surface tracking-tight">Expert HVAC Blog</h3>
          <p className="text-on-surface-variant font-bold opacity-60 max-w-xl mx-auto">Stay informed with the latest tips, guides, and expertise on home comfort and energy efficiency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {BLOGS_DATA.map((blog) => (
            <motion.div 
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-2xl transition-all group flex flex-col"
            >
              <Link href={`/blogs/${blog.slug}`} className="block relative h-64 overflow-hidden">
                <Image 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </Link>
              <div className="p-8 space-y-6 flex flex-col flex-grow">
                <Link href={`/blogs/${blog.slug}`} className="block">
                  <h4 className="text-xl md:text-2xl font-black text-on-surface leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h4>
                </Link>
                <p className="text-on-surface-variant font-medium opacity-70 line-clamp-3 leading-relaxed flex-grow">
                  {blog.excerpt}
                </p>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    href={`/blogs/${blog.slug}`}
                    className="border-primary/20 text-primary hover:bg-primary hover:text-white"
                  >
                    View Article
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
