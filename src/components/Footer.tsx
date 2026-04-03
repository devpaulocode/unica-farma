import { Link } from 'react-router-dom';
import { Pill, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-brand-emerald p-1.5 rounded-lg">
                <Pill className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold">Única Farma</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Especialistas na distribuição de medicamentos com qualidade, rapidez e confiança. Atendimento 24 horas por dia em Luanda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Links Rápidos</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-brand-emerald transition-colors">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-brand-emerald transition-colors">Sobre Nós</Link></li>
              <li><Link to="/#servicos" className="hover:text-brand-emerald transition-colors">Serviços</Link></li>
              <li><Link to="/contacto" className="hover:text-brand-emerald transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contacto</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-emerald shrink-0" />
                <a href="tel:+244933777333" className="hover:text-white transition-colors">+244 933 777 333</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-emerald shrink-0" />
                <a href="mailto:geral@unicafarma.ao" className="hover:text-white transition-colors">geral@unicafarma.ao</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-emerald shrink-0" />
                <span>Aberto 24 Horas / 7 Dias</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-bold mb-6">Localização</h3>
            <div className="flex items-start gap-3 text-gray-400">
              <MapPin className="w-5 h-5 text-brand-emerald shrink-0" />
              <span>Av. Pedro de Castro Van-Dúnem Loy, Palanca, Luanda, Angola</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Única Farma, Lda. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
