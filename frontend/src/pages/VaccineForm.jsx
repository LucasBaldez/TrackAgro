import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { 
  ArrowLeft, Save, Calendar, Syringe, 
  Beaker, UserCheck, ClipboardList, Loader2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const VaccineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    applicationDate: new Date().toISOString().split('T')[0],
    nextDose: '',
    batch: '',
    dosage: '',
    route: 'Subcutânea',
    manufacturer: '',
    expiryDate: '',
    veterinarian: '',
    observations: '',
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
      await api.post('/vaccines', formData);
      navigate(`/animais/${id}`);
    } catch (error) {
      console.error('Erro ao salvar vacina:', error);
      alert('Erro ao salvar registro de vacina.');
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
            className="p-4 bg-white shadow-lg shadow-gray-200/50 rounded-2xl hover:bg-nature-50 text-nature-600 transition-all group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Registro de Vacinação</h1>
            <p className="text-sm font-bold text-nature-600 uppercase tracking-widest mt-1">
              Animal: {animal.name || 'Sem Nome'} ({animal.idUnique})
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Card Principal: Informações da Vacina */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-nature-600 mb-2">
            <Syringe className="w-6 h-6" />
            <h3 className="text-xl font-black tracking-tight text-gray-900">Detalhes da Dose</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Nome da Vacina / Medicamento</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Aftosa, Brucelose..."
                className="input-field h-14"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Data de Aplicação</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nature-600" />
                  <input 
                    required
                    type="date" 
                    className="input-field h-14 pl-12"
                    value={formData.applicationDate}
                    onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Próxima Dose</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                  <input 
                    type="date" 
                    className="input-field h-14 pl-12"
                    value={formData.nextDose}
                    onChange={(e) => setFormData({...formData, nextDose: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Dosagem (ml/cc)</label>
                <input 
                  type="text" 
                  placeholder="Ex: 5ml"
                  className="input-field h-14"
                  value={formData.dosage}
                  onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Via de Aplicação</label>
                <select 
                  className="input-field h-14 bg-gray-50"
                  value={formData.route}
                  onChange={(e) => setFormData({...formData, route: e.target.value})}
                >
                  <option>Subcutânea</option>
                  <option>Intramuscular</option>
                  <option>Oral</option>
                  <option>Inalatória</option>
                  <option>Outra</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Card Secundário: Rastreabilidade */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-blue-600 mb-2">
              <Beaker className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight text-gray-900">Rastreabilidade & Lote</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Número do Lote</label>
                  <input 
                    type="text" 
                    placeholder="Ex: LT-2024-X"
                    className="input-field h-14"
                    value={formData.batch}
                    onChange={(e) => setFormData({...formData, batch: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Validade do Frasco</label>
                  <input 
                    type="date" 
                    className="input-field h-14"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Fabricante / Laboratório</label>
                <input 
                  type="text" 
                  placeholder="Ex: Zoetis, MSD..."
                  className="input-field h-14"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Veterinário Responsável</label>
                <div className="relative">
                  <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Nome do profissional"
                    className="input-field h-14 pl-12"
                    value={formData.veterinarian}
                    onChange={(e) => setFormData({...formData, veterinarian: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-4">
            <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest px-1">
              <ClipboardList className="w-4 h-4" />
              Observações Adicionais
            </label>
            <textarea 
              rows="3"
              className="input-field p-4 resize-none"
              placeholder="Notas sobre a reação do animal ou condições de aplicação..."
              value={formData.observations}
              onChange={(e) => setFormData({...formData, observations: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-nature-600 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-nature-950/20 hover:bg-nature-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Salvar Registro Sanitário
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VaccineForm;
