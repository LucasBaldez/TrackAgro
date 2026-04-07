import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { 
  ArrowLeft, Save, Calendar, ArrowLeftRight, 
  MapPin, Weight, Info, Loader2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const MovementForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    from: '',
    to: '',
    reason: 'Manejo de Pasto',
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
      await api.post('/movements', formData);
      navigate(`/animais/${id}`);
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
      alert('Erro ao salvar registro de movimentação.');
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
            className="p-4 bg-white shadow-lg shadow-gray-200/50 rounded-2xl hover:bg-earth-50 text-earth-600 transition-all group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Movimentação Animal</h1>
            <p className="text-sm font-bold text-earth-600 uppercase tracking-widest mt-1">
              Logística Interna: {animal.name || 'Sem Nome'} ({animal.idUnique})
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-earth-600 mb-2">
            <ArrowLeftRight className="w-6 h-6" />
            <h3 className="text-xl font-black tracking-tight text-gray-900">Transferência de Local</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Data da Movimentação</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-600" />
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
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Origem (Pasto/Lote anterior)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="text" 
                  placeholder="Ex: Pasto 04 ou Curral A"
                  className="input-field h-14 pl-12"
                  value={formData.from}
                  onChange={(e) => setFormData({...formData, from: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Destino (Novo local)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-earth-600" />
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Pasto 12 ou Invernada Norte"
                  className="input-field h-14 pl-12 font-bold"
                  value={formData.to}
                  onChange={(e) => setFormData({...formData, to: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-blue-600 mb-2">
              <Info className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight text-gray-900">Motivação & Notas</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Motivo do Manejo</label>
                <select 
                  className="input-field h-14 bg-gray-50 font-bold"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                >
                  <option value="Manejo de Pasto">🌱 Manejo de Pasto (Rotação)</option>
                  <option value="Troca de Lote">🔢 Troca de Lote (Categorização)</option>
                  <option value="Venda">💰 Venda / Comercialização</option>
                  <option value="Morte">🪦 Morte (Baixa no Sistema)</option>
                  <option value="Curral de Manejo">🏛️ Curral de Manejo (Pesagem/Vacina)</option>
                  <option value="Outro">⚙️ Outro Motivo</option>
                </select>
              </div>

              <textarea 
                rows="4"
                className="input-field p-4 resize-none"
                placeholder="Detalhes sobre a pesagem no manejo, frete ou comprador no caso de venda..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-earth-800 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-earth-950/20 hover:bg-earth-900 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Registrar Movimentação
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovementForm;
