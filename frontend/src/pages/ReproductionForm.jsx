import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { 
  ArrowLeft, Save, Calendar, Heart, 
  Baby, Search, AlertCircle, Loader2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReproductionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Inseminação',
    status: 'Programado',
    notes: '',
    animalId: id
  });

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const { data } = await api.get(`/animals/${id}`);
        setAnimal(data);
      } catch (error) {
        console.error('Erro ao buscar animal:', error);
      }
    };
    fetchAnimal();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/reproduction', formData);
      navigate(`/animais/${id}`);
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
      alert('Erro ao salvar registro reprodutivo.');
    } finally {
      setLoading(false);
    }
  };

  if (!animal) return <div className="p-20 text-center animate-pulse font-black text-nature-600">CARREGANDO...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to={`/animais/${id}`} 
            className="p-4 bg-white shadow-lg shadow-gray-200/50 rounded-2xl hover:bg-pink-50 text-pink-600 transition-all group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Evento Reprodutivo</h1>
            <p className="text-sm font-bold text-pink-600 uppercase tracking-widest mt-1">
              Manejo Reprodutivo: {animal.name || 'Sem Nome'} ({animal.idUnique})
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-pink-600 mb-2">
            <Heart className="w-6 h-6" />
            <h3 className="text-xl font-black tracking-tight text-gray-900">Tipo de Evento</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Natureza da Atividade</label>
              <select 
                className="input-field h-14 bg-gray-50 font-bold"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="Inseminação">🧬 Inseminação Artificial</option>
                <option value="Monta Natural">🐂 Monta Natural</option>
                <option value="Cio">🚩 CIO (Detecção)</option>
                <option value="Parto">🍼 Parto</option>
                <option value="Aborto">⚠️ Aborto</option>
                <option value="Diagnóstico de Gestação">🔍 Diagnóstico de Gestação (Toque/Ultrassom)</option>
                <option value="Secagem">🥛 Secagem (Fim da Lactação)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Data do Evento</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-600" />
                <input 
                  required
                  type="date" 
                  className="input-field h-14 pl-12"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Status / Resultado</label>
              <select 
                className="input-field h-14 bg-gray-50"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Confirmada">✅ Prenhez Confirmada</option>
                <option value="Vazia">❌ Vazia</option>
                <option value="Em Observação">⏳ Em Observação</option>
                <option value="Sucesso">🎉 Sucesso (Nascimento)</option>
                <option value="Programado">📅 Programado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6 h-full justify-between">
            <div>
              <div className="flex items-center gap-3 text-gray-600 mb-6">
                <Baby className="w-6 h-6" />
                <h3 className="text-xl font-black tracking-tight text-gray-900">Observações Técnicas</h3>
              </div>
              <textarea 
                rows="6"
                className="input-field p-4 resize-none"
                placeholder="Detalhes sobre o sêmen, touro, complicações no parto ou recomendações do médico..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-16 bg-pink-600 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-pink-950/20 hover:bg-pink-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Salvar Registro Reprodutivo
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReproductionForm;
