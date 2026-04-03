import { motion } from 'motion/react';
import { Shield, Target, Eye, Award, CheckCircle2 } from 'lucide-react';

const values = [
  { title: 'Confiança', icon: Shield, desc: 'Relações sólidas baseadas na transparência.' },
  { title: 'Qualidade', icon: Award, desc: 'Medicamentos certificados e seguros.' },
  { title: 'Rapidez', icon: CheckCircle2, desc: 'Logística ágil para atender urgências.' },
  { title: 'Compromisso', icon: Target, desc: 'Dedicados à saúde da nossa comunidade.' }
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-dark py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-emerald/20 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Sobre a Única Farma</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Conheça a nossa história, os nossos valores e o compromisso que temos com a saúde de todos os angolanos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-3xl bg-brand-light border border-gray-100"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-emerald/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                <Target className="text-brand-emerald w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-4 md:mb-6">Nossa Missão</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Fornecer medicamentos com qualidade e rapidez, garantindo que cada paciente e unidade de saúde em Luanda tenha o suporte necessário para salvar vidas e promover o bem-estar.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-3xl bg-brand-dark text-white"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8">
                <Eye className="text-brand-emerald w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 md:mb-6">Nossa Visão</h2>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Ser a referência número um no setor de distribuição farmacêutica em Angola, reconhecida pela excelência operacional, inovação logística e integridade inabalável.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">Nossos Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Os pilares que sustentam cada decisão e cada entrega que realizamos.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-brand-emerald w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
