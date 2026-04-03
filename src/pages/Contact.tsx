import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formState,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormState({ name: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-emerald py-16 md:py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Fale Connosco
          </motion.h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contacto por qualquer um dos nossos canais ou envie uma mensagem direta.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-brand-light p-6 md:p-8 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-emerald p-3 rounded-2xl text-white">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark">Telefone</h3>
                </div>
                <a href="tel:+244933777333" className="text-xl md:text-2xl font-display font-bold text-brand-emerald hover:underline break-words">
                  +244 933 777 333
                </a>
                <p className="text-gray-500 mt-2 text-sm md:text-base">Disponível 24/7 para urgências.</p>
              </div>

              <div className="bg-brand-dark p-6 md:p-8 rounded-3xl text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#25D366] p-3 rounded-2xl text-white">
                    <MessageCircle size={24} fill="currentColor" />
                  </div>
                  <h3 className="text-xl font-bold">WhatsApp</h3>
                </div>
                <a 
                  href="https://wa.me/244933777333" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-dark transition-all w-full justify-center sm:w-auto shadow-lg shadow-[#25D366]/20"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                    alt="" 
                    className="w-5 h-5 brightness-0 invert"
                    referrerPolicy="no-referrer"
                  />
                  Iniciar Conversa
                </a>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="text-brand-emerald shrink-0" />
                    <div>
                      <p className="font-bold text-brand-dark">Localização</p>
                      <p className="text-gray-600">Av. Pedro de Castro Van-Dúnem Loy, Palanca, Luanda</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="text-brand-emerald shrink-0" />
                    <div>
                      <p className="font-bold text-brand-dark">Horário</p>
                      <p className="text-gray-600">Aberto 24 Horas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100"
              >
                <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-8">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Nome Completo</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Maria Silva"
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 outline-none transition-all"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Telefone</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="Ex: +244 933..."
                        className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 outline-none transition-all"
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Mensagem</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Como podemos ajudar?"
                      className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 outline-none transition-all resize-none"
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-dark text-white py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/20 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                  {success && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-brand-emerald font-bold mt-4"
                    >
                      Mensagem enviada com sucesso! Entraremos em contacto em breve.
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
