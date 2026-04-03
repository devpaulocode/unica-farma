import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Image as ImageIcon, Sparkles, Loader2, LogIn, LogOut, Download, Plus } from 'lucide-react';
import { auth, signInWithGoogle, logout, db } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';

export default function StaffPortal() {
  const [user, setUser] = useState<User | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'assets'), orderBy('createdAt', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHistory(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const generateImage = async () => {
    if (!prompt || !user) return;
    
    // Check for API key selection as per guidelines for gemini-3.1-flash-image-preview
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // Proceeding assuming success as per guidelines
      }
    }

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [{ text: `Pharmaceutical marketing asset for Única Farma: ${prompt}. Professional, clean, medical style.` }],
        },
        config: {
          imageConfig: { aspectRatio: "1:1", imageSize: "1K" }
        }
      });

      const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (imagePart?.inlineData) {
        const base64 = imagePart.inlineData.data;
        const url = `data:image/png;base64,${base64}`;
        setGeneratedImage(url);
        
        // Save to history
        await addDoc(collection(db, 'assets'), {
          prompt,
          imageUrl: url,
          createdBy: user.email,
          createdAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
      alert('Erro ao gerar imagem. Verifique se a sua chave de API suporta este modelo.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-100"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-emerald/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <Sparkles className="text-brand-emerald w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-4">Portal do Staff</h1>
          <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
            Acesso restrito para funcionários da Única Farma. Faça login para usar o Gerador de Ativos de Marketing.
          </p>
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/20"
          >
            <LogIn size={20} />
            Entrar com Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-light min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-2">Gerador de Ativos</h1>
            <p className="text-sm md:text-base text-gray-600">Olá, {user.displayName}. Crie imagens profissionais para marketing.</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors font-medium text-sm md:text-base"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Generator Form */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <Plus className="text-brand-emerald" size={20} />
                Novo Ativo
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Descreva a imagem</label>
                  <textarea 
                    rows={4}
                    placeholder="Ex: Um farmacêutico sorridente entregando medicamentos em uma embalagem verde..."
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 outline-none transition-all resize-none text-sm md:text-base"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <button 
                  onClick={generateImage}
                  disabled={isGenerating || !prompt}
                  className="w-full bg-brand-emerald text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-lg shadow-brand-emerald/20 disabled:opacity-50 text-sm md:text-base"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                  {isGenerating ? 'Gerando...' : 'Gerar Imagem'}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-brand-dark text-white p-8 rounded-3xl">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ImageIcon size={18} />
                Dicas de Prompt
              </h3>
              <ul className="text-sm text-white/70 space-y-3 list-disc pl-4">
                <li>Seja específico sobre as cores (Verde Única Farma).</li>
                <li>Mencione o estilo "fotografia profissional".</li>
                <li>Inclua elementos como "farmácia moderna", "Luanda".</li>
              </ul>
            </div>
          </div>

          {/* Result & History */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            {/* Current Result */}
            {generatedImage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-brand-emerald/20"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-brand-dark">Resultado Gerado</h3>
                  <a 
                    href={generatedImage} 
                    download="unica-farma-asset.png"
                    className="flex items-center gap-2 text-brand-emerald hover:underline font-bold text-sm md:text-base"
                  >
                    <Download size={18} />
                    Baixar
                  </a>
                </div>
                <img src={generatedImage} alt="Generated" className="w-full rounded-2xl shadow-lg aspect-square object-cover" />
              </motion.div>
            )}

            {/* History */}
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-dark mb-6 md:mb-8">Histórico Recente</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {history.map((item) => (
                  <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                    <img src={item.imageUrl} alt={item.prompt} className="w-full aspect-square object-cover" />
                    <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-[10px] md:text-xs text-white/90 line-clamp-3 mb-4">{item.prompt}</p>
                      <a 
                        href={item.imageUrl} 
                        download 
                        className="p-2 bg-brand-emerald text-white rounded-full hover:scale-110 transition-transform"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                ))}
                {history.length === 0 && (
                  <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
                    Nenhuma imagem gerada ainda.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
