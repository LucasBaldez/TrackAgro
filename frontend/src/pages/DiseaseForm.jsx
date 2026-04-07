import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { 
  ArrowLeft, Save, Calendar, Activity, 
  Stethoscope, Pill, Thermometer, AlertCircle, Loader2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const DiseaseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [animal, setAnimal] = useState(null);

  const [formData, setFormData] = useState({
    type: '',
    diagnosisDate: new Date().toISOString().split('T')[0],
    treatment: '',
    medication: '',
    dosage: '',
    route: 'Intramuscular',
    vet: '',
    status: 'Em tratamento',
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
      await api.post('/diseases', formData);
      navigate(`/animais/${id}`);
    } catch (error) {
      console.error('Erro ao salvar registro:', error);
      alert('Erro ao salvar registro clínico.');
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
            className="p-4 bg-white shadow-lg shadow-gray-200/50 rounded-2xl hover:bg-red-50 text-red-600 transition-all group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Registro Clínico</h1>
            <p className="text-sm font-bold text-red-600 uppercase tracking-widest mt-1">
              Ocorrência Sanitária: {animal.name || 'Sem Nome'} ({animal.idUnique})
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Coluna 1: Diagnóstico */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-red-600 mb-2">
            <Stethoscope className="w-6 h-6" />
            <h3 className="text-xl font-black tracking-tight text-gray-900">Diagnóstico</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Patologia / Doença</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Mastite, Tristeza Parasitária..."
                className="input-field h-14"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Data do Diagnóstico</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-600" />
                  <input 
                    required
                    type="date" 
                    className="input-field h-14 pl-12"
                    value={formData.diagnosisDate}
                    onChange={(e) => setFormData({...formData, diagnosisDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Status Clínico</label>
                <select 
                  className={`input-field h-14 font-black uppercase text-[10px] tracking-widest ${
                    formData.status === 'Em tratamento' ? 'bg-amber-50 text-amber-700' : 
                    formData.status === 'Curado' ? 'bg-nature-50 text-nature-700' : 'bg-red-50 text-red-700'
                  }`}
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Em tratamento">🟡 Em tratamento</option>
                  <option value="Curado">🟢 Curado</option>
                  <option value="Crítico">🔴 Crítico</option>
                  <option value="Crônico">🟠 Crônico</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Descrição do Tratamento</label>
              <textarea 
                required
                rows="4"
                className="input-field p-4 resize-none"
                placeholder="Procedimentos realizados, limpeza, isolamento..."
                value={formData.treatment}
                onChange={(e) => setFormData({...formData, treatment: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Coluna 2: Medicamentos e Profissional */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-amber-600 mb-2">
              <Pill className="w-6 h-6" />
              <h3 className="text-xl font-black tracking-tight text-gray-900">Protocolo de Medicamentos</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Medicamento Principal</label>
                <input 
                  type="text" 
                  placeholder="Ex: Terramicina, Banamine..."
                  className="input-field h-14"
                  value={formData.medication}
                  onChange={(e) => setFormData({...formData, medication: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Dosagem</label>
                  <input 
                    type="text" 
                    placeholder="Ex: 20ml dose única"
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
                    <option>Intramuscular</option>
                    <option>Subcutânea</option>
                    <option>Oral</option>
                    <option>Topical</option>
                    <option>Intrauterina</option>
                    <option>Outra</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Veterinário Responsável</label>
                <div className="relative">
                  <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Nome do profissional"
                    className="input-field h-14 pl-12"
                    value={formData.vet}
                    onChange={(e) => setFormData({...formData, vet: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-red-600 text-white font-black text-lg rounded-[2rem] shadow-xl shadow-red-950/20 hover:bg-red-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Salvar Registro Clínico
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiseaseForm;
