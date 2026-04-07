import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Beef, Mail, Lock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
      alert('Falha ao entrar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Esquerda: Formulário */}
      <div className="flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center justify-center mb-8 gap-3">
            <Beef className="w-12 h-12 text-nature-600" />
            <h1 className="text-3xl font-extrabold text-earth-950 tracking-tighter">TrackAgro</h1>
          </div>
          
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-earth-950 mb-2">Bem-vindo de volta</h2>
            <p className="text-earth-500">Entre com suas credenciais para gerenciar sua fazenda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-earth-700 mb-2">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400 group-focus-within:text-nature-600 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-nature-500/10 focus:border-nature-500 outline-none transition-all"
                  placeholder="exemplo@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-earth-700 mb-2">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400 group-focus-within:text-nature-600 transition-colors" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-nature-500/10 focus:border-nature-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-earth-950 text-white font-bold rounded-xl hover:bg-earth-900 active:scale-95 transition-all shadow-xl shadow-earth-950/20 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Acessar Fazenda'}
            </button>
          </form>

          <p className="mt-8 text-center text-earth-500">
            Não tem uma conta? <Link to="/register" className="text-nature-600 font-bold hover:underline">Solicite acesso</Link>
          </p>
        </motion.div>
      </div>

      {/* Direita: Hero visual */}
      <div className="hidden lg:flex bg-earth-950 relative overflow-hidden flex-col justify-end p-16">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-transparent to-transparent"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-nature-500 rounded-2xl flex items-center justify-center text-earth-950">
              <Beef className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter">TrackAgro</h1>
              <p className="text-nature-400 font-medium tracking-widest uppercase text-sm">Pecuária de Precisão</p>
            </div>
          </div>
          <blockquote className="text-2xl text-earth-200 font-serif leading-relaxed italic max-w-xl">
            "A tecnologia no campo não é mais o futuro, é a ferramenta que garante a produtividade de hoje."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;
