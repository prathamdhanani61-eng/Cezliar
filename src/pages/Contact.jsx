import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, Clock } from 'lucide-react';
import Button from '../components/Button';
import { useSEO } from '../hooks/useSEO';

const Contact = () => {
  useSEO({
    title: 'Contact Concierge',
    description: 'Contact the CEZLIAR boutique team. Reach out for luxury product details, press inquiries, or support requests.'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    }
  };

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-20 pt-12">
          <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">Concierge Services</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-text mt-2 mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-1 bg-gold mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto font-body leading-relaxed"
          >
            We would love to hear from you. Our dedicated concierge team is available to assist you with product details, order inquiries, or brand collaborations.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3"
          >
            <div className="bg-white p-10 rounded-3xl shadow-luxury h-full border border-gold/5 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-8">Boutique Office</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-section flex items-center justify-center shrink-0 border border-gold/10">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-text mb-1 text-base">Jaipur Flagship</h4>
                      <p className="text-gray-500 text-sm font-body leading-relaxed">
                        123 Palace Road,<br/>
                        Heritage District,<br/>
                        Jaipur, Rajasthan 302001, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-section flex items-center justify-center shrink-0 border border-gold/10">
                      <Phone className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-text mb-1 text-base">Call Concierge</h4>
                      <p className="text-gray-500 text-sm font-body">+91 141 123 4567</p>
                      <span className="text-gray-400 text-xs font-body block mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Mon-Sat 10am-7pm IST
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-section flex items-center justify-center shrink-0 border border-gold/10">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-text mb-1 text-base">Electronic Mail</h4>
                      <p className="text-gray-500 text-sm font-body">concierge@cezliar.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100 mt-12 text-center lg:text-left">
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-[10px] block mb-1">Authentic Quality</span>
                <p className="text-[11px] text-gray-400 font-body">CEZLIAR is a registered brand of CEZLIAR Organics Pvt. Ltd.</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-2/3"
          >
            <div className="bg-white p-10 rounded-3xl shadow-luxury border border-gold/5">
              <h3 className="text-2xl font-heading font-bold text-primary mb-8">Send a Message</h3>
              
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gold">First Name *</label>
                        <input 
                          type="text" 
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-background transition-colors font-body text-sm" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gold">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-background transition-colors font-body text-sm" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gold">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-background transition-colors font-body text-sm" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gold">Message *</label>
                      <textarea 
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5" 
                        placeholder="Write your inquiry here..."
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-background transition-colors resize-none font-body text-sm"
                      ></textarea>
                    </div>

                    <Button variant="primary" size="lg" type="submit" className="w-full uppercase tracking-widest font-bold text-xs py-4.5">
                      Submit Inquiry
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 flex flex-col items-center"
                  >
                    <CheckCircle className="w-16 h-16 text-gold mb-6" />
                    <h3 className="text-2xl font-heading font-bold text-primary mb-3">Message Received</h3>
                    <p className="text-gray-500 font-body max-w-md mx-auto leading-relaxed mb-8">
                      Thank you for contacting the CEZLIAR Concierge. A representative will review your inquiry and respond to your email address within 24 business hours.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setFormSubmitted(false)}
                      className="uppercase tracking-widest text-xs py-3 px-8"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
