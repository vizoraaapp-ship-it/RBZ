'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { BlogPost } from '@/data/blogs';

export default function BlogDetailClient({ blog }: { blog: BlogPost }) {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      <Section background="surface" className="pt-32 md:pt-48 pb-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Article Header */}
          <header className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="material-symbols-outlined text-sm">auto_stories</span>
              Latest Insights
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-on-surface leading-[1.1]">
              {blog.title}
            </h1>
          </header>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-outline-variant/10"
          >
            <Image 
              src={blog.image} 
              alt={blog.title} 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content Body */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-on-surface prose-p:text-on-surface prose-p:font-medium prose-p:leading-relaxed prose-li:text-on-surface prose-li:font-medium prose-strong:text-on-surface prose-strong:font-black"
          >
            {blog.content.split(/\n\s*\n/).map((paragraph, i) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="text-3xl md:text-4xl font-black text-on-surface mt-16 mb-8 scroll-mt-40">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('#### ')) {
                return <h4 key={i} className="text-xl md:text-2xl font-black text-on-surface mt-12 mb-6">{paragraph.replace('#### ', '')}</h4>;
              }
              
              const lines = paragraph.split('\n');
              const hasBullets = lines.some(line => line.trim().startsWith('- ') || line.trim().startsWith('● '));
              
              if (hasBullets) {
                const introLines: string[] = [];
                const listItems: string[] = [];
                
                lines.forEach(line => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('- ') || trimmed.startsWith('● ')) {
                    listItems.push(trimmed.replace(/^[-●]\s+/, ''));
                  } else if (trimmed) {
                    introLines.push(line);
                  }
                });

                return (
                  <div key={i} className="my-10 space-y-4">
                    {introLines.length > 0 && (
                      <div className="space-y-4 mb-4">
                        {introLines.map((line, idx) => (
                          <p key={idx} className="text-lg md:text-xl font-medium text-on-surface leading-relaxed">
                            {line.split('**').map((part, pidx) => 
                              pidx % 2 === 1 ? <strong key={pidx} className="font-black">{part}</strong> : part
                            )}
                          </p>
                        ))}
                      </div>
                    )}
                    <ul className="space-y-4 list-none p-0 ml-4 md:ml-8">
                      {listItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="w-2 h-2 rounded-full bg-on-surface shrink-0 mt-2.5 shadow-sm" />
                          <span className="text-lg md:text-xl font-medium text-on-surface leading-relaxed">
                            {item.split('**').map((part, pidx) => 
                              pidx % 2 === 1 ? <strong key={pidx} className="font-black">{part}</strong> : part
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return (
                <p key={i} className="text-lg md:text-xl text-on-surface font-medium leading-relaxed mb-8 whitespace-pre-line">
                  {paragraph.split('**').map((part, pidx) => 
                    pidx % 2 === 1 ? <strong key={pidx} className="font-black">{part}</strong> : part
                  )}
                </p>
              );
            })}
          </motion.div>

          {/* Footer of Content */}
          <div className="pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap gap-2">
              {blog.keywords.slice(0, 5).map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-black uppercase tracking-wider text-on-surface-variant opacity-60">
                  #{tag.replace(/\s+/g, '')}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button href="/contact" variant="primary">Book This Service</Button>
              <Button href="/" variant="outline">Back to Home</Button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
