import { motion } from 'framer-motion';
import { Sparkles, Eye, Target, Award, Heart } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const About = () => {
  useSEO({
    title: 'About Us - Our Story & Values',
    description: 'Learn about the story, vision, mission, and traditional Kannauj perfumery craftsmanship of CEZLIAR Organics.'
  });
  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-20 pt-12">
          <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">The Cezliar Way</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-text mt-2 mb-6"
          >
            The Story of Cezliar
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-gold mx-auto mb-6"
          ></motion.div>
        </div>

        {/* Our Story Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-28">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 aspect-square max-h-[500px] rounded-3xl overflow-hidden shadow-luxury border border-gold/10 relative"
          >
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'%3E%3Crect width='800' height='800' fill='%23F4EFE6'/%3E%3Ccircle cx='400' cy='400' r='200' fill='%230F4D3C' fill-opacity='0.05'/%3E%3Ctext x='50%25' y='50%25' font-family='serif' font-size='40' fill='%230F4D3C' text-anchor='middle' font-weight='bold'%3EOur Story%3C/text%3E%3C/svg%3E"
              alt="Cezliar Heritage"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/5" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Our Roots</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Redefining Luxury and Purity</h2>
            <p className="text-base md:text-lg text-gray-700 font-body leading-relaxed mb-6">
              CEZLIAR was born from a singular, uncompromising vision: to bridge the gap between traditional Indian artisanal heritage and modern, non-toxic chemistry. We believe that true luxury lies in the meticulous journey of creation and the absolute purity of the final formulation.
            </p>
            <p className="text-base text-gray-500 font-body leading-relaxed">
              Every bottle of our concentrated attars, every stick of our natural dhoop, and every formula in our high-performance home care line is a testament to our commitment to excellence. We respect time-tested methods, utilizing hydro-distillation in copper vessels while employing modern testing to verify that no synthetic irritants or harmful compounds enter your life.
            </p>
          </motion.div>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 md:p-12 rounded-3xl shadow-luxury border border-gold/10 flex flex-col h-full"
          >
            <div className="w-14 h-14 rounded-2xl bg-section flex items-center justify-center text-primary mb-6 border border-gold/10">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-600 font-body leading-relaxed text-sm md:text-base">
              To be recognized globally as the ultimate standard of luxury Indian craftsmanship in home and body care. We envision a future where high performance and natural purity coexist seamlessly, enriching daily routines into premium, elevated rituals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white p-10 md:p-12 rounded-3xl shadow-luxury border border-gold/10 flex flex-col h-full"
          >
            <div className="w-14 h-14 rounded-2xl bg-section flex items-center justify-center text-primary mb-6 border border-gold/10">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">Our Mission</h3>
            <p className="text-gray-600 font-body leading-relaxed text-sm md:text-base">
              To curate and distribute organic, chemical-safe, and high-performance products by combining traditional hydro-distillation with advanced chemistry. We commit to zero compromise on sustainability, organic sourcing, and customer satisfaction.
            </p>
          </motion.div>
        </div>

        {/* Why Choose CEZLIAR Section */}
        <div className="bg-section p-12 md:p-20 rounded-3xl border border-gold/10">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Our Core Values</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-2">Why Choose CEZLIAR</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Traditional Craftsmanship",
                desc: "We work directly with heritage distillers in Kannauj and Mysore, keeping ancient, wood-fired hydro-distillation methods alive."
              },
              {
                icon: Sparkles,
                title: "Non-Toxic Formulations",
                desc: "Our home care range is strictly charcoal-free, acid-free, and organic, ensuring maximum safety for kids and pets."
              },
              {
                icon: Heart,
                title: "Conscious Luxury",
                desc: "From hand-cut crystal bottles to biodegradable packaging, our operations respect the planet and local farming communities."
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gold/5 flex flex-col h-full text-center items-center"
              >
                <div className="w-12 h-12 rounded-full bg-section flex items-center justify-center text-primary mb-4">
                  <value.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-heading font-bold text-text mb-3">{value.title}</h4>
                <p className="text-xs text-gray-500 font-body leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
