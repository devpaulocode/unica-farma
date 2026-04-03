import { motion } from 'motion/react';
import { ArrowRight, Clock, Shield, Truck, Star, Pill, Hospital, MessageCircle, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const services = [
  {
    title: 'Distribuição de Medicamentos',
    desc: 'Amplo stock de medicamentos essenciais e especializados.',
    icon: Pill,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Fornecimento para Clínicas',
    desc: 'Parceiro estratégico para unidades de saúde em toda Luanda.',
    icon: Hospital,
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    title: 'Atendimento 24 Horas',
    desc: 'Estamos disponíveis a qualquer hora para as suas urgências.',
    icon: Clock,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    title: 'Entregas Rápidas',
    desc: 'Logística eficiente para garantir que o medicamento chegue a tempo.',
    icon: Truck,
    color: 'bg-purple-50 text-purple-600'
  }
];

const reviews = [
  { name: 'Maria Silva', text: 'A melhor de todos, sempre encontro o que preciso.', stars: 5 },
  { name: 'João Paulo', text: 'Muito boa, atendimento rápido e profissional.', stars: 5 },
  { name: 'Clínica Esperança', text: 'Muito bom, fornecedor de confiança para nossa unidade.', stars: 5 }
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 to-brand-emerald/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Pharmacy background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-sm font-bold">5.0 | Aberto 24 Horas</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Distribuição de Medicamentos com <span className="text-brand-emerald">Rapidez</span> e Confiança
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-2xl">
              Atendimento 24h para clínicas, farmácias e clientes em Luanda. Qualidade garantida em cada entrega.
            </p>

            <div className="flex flex-col sm:row gap-4">
              <a 
                href="https://wa.me/244933777333" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:bg-white hover:text-brand-dark transition-all shadow-xl shadow-[#25D366]/30 group"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  alt="" 
                  className="w-6 h-6 brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
                Falar no WhatsApp
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white/20 transition-all"
              >
                Solicitar Cotação
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-brand-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-emerald/10 rounded-full blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional service" 
                className="rounded-2xl shadow-2xl relative z-10 w-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-brand-emerald/10 p-3 rounded-full">
                    <Shield className="text-brand-emerald w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Qualidade</p>
                    <p className="text-lg sm:text-xl font-bold text-brand-dark">100% Certificada</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-brand-emerald font-bold tracking-widest uppercase text-sm mb-4 block">Sobre Nós</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-8">
                Compromisso com a sua Saúde em Luanda
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A Única Farma, Lda. é uma empresa especializada na distribuição de medicamentos com qualidade, rapidez e confiança, atendendo 24 horas por dia. Nossa missão é garantir que clínicas, farmácias e pacientes tenham acesso imediato aos tratamentos de que precisam.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Clock, label: '24h Atendimento' },
                  { icon: Shield, label: 'Qualidade' },
                  { icon: Truck, label: 'Entrega Rápida' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <item.icon className="text-brand-emerald w-8 h-8 mb-2" />
                    <span className="text-sm font-bold text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">Nossos Serviços</h2>
            <p className="text-lg text-gray-600">Oferecemos soluções completas para o setor farmacêutico, com foco na eficiência e no suporte contínuo aos nossos parceiros.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", service.color)}>
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">O que nossos clientes dizem</h2>
            <div className="flex justify-center gap-1 text-yellow-400 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg italic mb-6 text-white/90">"{review.text}"</p>
                <p className="font-bold text-brand-emerald">— {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-brand-emerald">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
            Precisa de medicamentos com urgência?
          </h2>
          <a 
            href="https://wa.me/244933777333" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-brand-dark transition-all shadow-2xl animate-pulse-soft border-4 border-white/20"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="" 
              className="w-7 h-7 brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            Falar no WhatsApp Agora
          </a>
        </div>
      </section>

      {/* Location Section */}
      <section id="contacto" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-display font-bold text-brand-dark mb-8">Onde Estamos</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-emerald/10 p-3 rounded-full shrink-0">
                    <MapPin className="text-brand-emerald" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Endereço</h4>
                    <p className="text-gray-600">Av. Pedro de Castro Van-Dúnem Loy, Palanca, Luanda, Angola</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-emerald/10 p-3 rounded-full shrink-0">
                    <Phone className="text-brand-emerald" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Telefone</h4>
                    <a href="tel:+244933777333" className="text-gray-600 hover:text-brand-emerald">+244 933 777 333</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-brand-emerald/10 p-3 rounded-full shrink-0">
                    <Clock className="text-brand-emerald" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Horário</h4>
                    <p className="text-gray-600">Aberto 24 Horas / 7 Dias por semana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.158342416147!2d13.245842!3d-8.864234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f3d8a7c00001%3A0x0!2zOMKwNTEnNTEuMiJTIDEzwrAxNCc0NS4wIkU!5e0!3m2!1spt-BR!2sao!4v1700000000000!5m2!1spt-BR!2sao" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
