import { BLOGS_DATA } from '@/data/blogs';
import BlogDetailClient from '@/components/blog/BlogDetailClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = BLOGS_DATA.find(b => b.slug === slug);
  
  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    keywords: blog.keywords,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.image],
      type: 'article',
      locale: 'en_CA',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: [blog.image],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = BLOGS_DATA.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}

export async function generateStaticParams() {
  return BLOGS_DATA.map((blog) => ({
    slug: blog.slug,
  }));
}
