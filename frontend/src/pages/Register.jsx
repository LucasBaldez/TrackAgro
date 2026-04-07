import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password, role });
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Falha ao registrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-earth-950/10 overflow-hidden"
      >
        <div className="bg-earth-950 p-8 text-center">
          <div className="w-16 h-16 bg-nature-500 rounded-2xl flex items-center justify-center text-earth-950 mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white">Criar Nova Conta</h2>
          <p className="text-earth-400 mt-2">Junte-se à revolução na pecuária digital.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-earth-700 mb-2">Nome Completo</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400 group-focus-within:text-nature-600 transition-colors" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-nature-500/10 focus:border-nature-500 outline-none transition-all"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-semibold text-earth-700 mb-2">Permissão</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 focus:bg-white focus:ring-4 focus:ring-nature-500/10 focus:border-nature-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="employee">Funcionário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-earth-700 mb-2">E-mail Corporativo</label>
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
            <label className="block text-sm font-semibold text-earth-700 mb-2">Senha de Acesso</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400 group-focus-within:text-nature-600 transition-colors" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-nature-500/10 focus:border-nature-500 outline-none transition-all"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-nature-600 text-earth-950 font-bold text-lg rounded-2xl hover:bg-nature-500 active:scale-95 transition-all shadow-xl shadow-nature-600/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Finalizar Registro'}
          </button>

          <p className="text-center text-earth-500 mt-6">
            Já possui acesso? <Link to="/login" className="text-nature-600 font-bold hover:underline">Faça login aqui</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
