import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import blogsData from '../data/blogs.json';
import Button from '../components/Button';
import { ArrowLeft, Clock, User, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  useSEO({
    title: selectedBlog ? selectedBlog.title : 'Blogs & Chronicles',
    description: selectedBlog ? selectedBlog.excerpt : 'Read our stories, performance guides, and updates on luxury traditional Indian attars and home care safety.'
  });

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {!selectedBlog ? (
            // Blog Listing State
            <motion.div
              key="listing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-20 pt-12">
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Cezliar Chronicles</span>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-text mt-2 mb-6">
                  Stories & Musings
                </h1>
                <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto font-body leading-relaxed">
                  Delve into the science, heritage, and philosophy behind premium fragrances, traditional Indian perfumery, and chemical-safe living.
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {blogsData.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover border border-gold/5 hover:border-gold/20 transition-all duration-500 flex flex-col h-full group"
                  >
                    {/* Image container */}
                    <div className="aspect-[16/10] overflow-hidden bg-section relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-body font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gold" /> {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold" /> {blog.readTime}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-heading font-bold text-text mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                      
                      <p className="text-sm text-gray-500 line-clamp-3 mb-6 font-body leading-relaxed">
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400 font-body flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gold" /> By {blog.author.split(' ')[0]}
                        </span>
                        <button
                          onClick={() => setSelectedBlog(blog)}
                          className="text-xs font-bold text-gold hover:text-primary uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          Read Article <ArrowRight className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Blog Detail State
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold hover:text-primary transition-colors mb-12"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Articles
              </button>

              {/* Meta */}
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 font-body font-semibold">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4.5 h-4.5 text-gold" /> {selectedBlog.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4.5 h-4.5 text-gold" /> {selectedBlog.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4.5 h-4.5 text-gold" /> By {selectedBlog.author}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-text leading-tight mb-8">
                {selectedBlog.title}
              </h1>

              {/* Hero Image */}
              <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-section mb-12 shadow-luxury border border-gold/10">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Paragraphs */}
              <div className="prose max-w-none text-gray-700 font-body text-base md:text-lg leading-relaxed space-y-6">
                {selectedBlog.paragraphs.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "text-lg md:text-xl font-heading text-primary font-semibold leading-relaxed" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Author box */}
              <div className="mt-16 p-8 bg-section rounded-3xl border border-gold/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-heading font-bold">
                  {selectedBlog.author.charAt(selectedBlog.author.length - 1) === 'a' || selectedBlog.author.includes('Mehta') ? 'AM' : 'SN'}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary">{selectedBlog.author}</h4>
                  <p className="text-xs text-gray-500 font-body">Cezliar Editorial Contributor</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blogs;
