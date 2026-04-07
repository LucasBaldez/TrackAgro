import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
  ArrowLeft, Edit2, Beef, Calendar, Activity, 
  ArrowLeftRight, Heart, Loader2, Plus, 
  ExternalLink, CheckCircle2, AlertTriangle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryCard = ({ title, icon: Icon, children, onAdd }) => (
  <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 flex flex-col h-full">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-nature-50 text-nature-600 rounded-2xl ring-4 ring-nature-50/50">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight">{title}</h3>
      </div>
      <button 
        onClick={onAdd}
        className="p-2 hover:bg-nature-50 text-nature-600 rounded-xl transition-all border border-transparent hover:border-nature-100"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
    <div className="flex-1 space-y-4">
      {children}
    </div>
  </div>
);

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [repro, setRepro] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animalRes, vaccinesRes, diseasesRes, reproRes, movementsRes] = await Promise.all([
          api.get(`/animals/${id}`),
          api.get(`/vaccines/animal/${id}`),
          api.get(`/diseases/animal/${id}`),
          api.get(`/reproduction/animal/${id}`),
          api.get(`/movements/animal/${id}`),
        ]);
        setAnimal(animalRes.data);
        setVaccines(vaccinesRes.data);
        setDiseases(diseasesRes.data);
        setRepro(reproRes.data);
        setMovements(movementsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen font-black text-nature-600 animate-pulse">CARREGANDO DADOS...</div>;
  if (!animal) return <div className="p-20 text-center font-black text-red-500">ANIMAL NÃO ENCONTRADO</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header com Cover */}
      <header className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-900/10 border-4 border-white">
        <div className="absolute inset-0 bg-earth-950/20 z-10"></div>
        <img 
          src={animal.photo ? `http://localhost:5000${animal.photo}` : 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80'} 
          className="w-full h-full object-cover blur-[2px] opacity-80"
          alt="Cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-between px-12 pt-10">
          <Link to="/animais" className="p-4 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-2xl transition-all border border-white/20 group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link to={`/animais/editar/${animal._id}`} className="flex items-center gap-3 px-8 py-4 bg-nature-600 text-white font-black rounded-2xl hover:bg-nature-700 transition-all shadow-xl shadow-nature-950/20 active:scale-95">
            <Edit2 className="w-5 h-5" />
            Editar Registro
          </Link>
        </div>
      </header>

      {/* Info Principal */}
      <div className="relative -mt-32 z-30 px-12 pb-10 grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
            <div className="aspect-square bg-gray-50 rounded-[2rem] overflow-hidden border-2 border-white shadow-inner">
              {animal.photo ? (
                <img src={`http://localhost:5000${animal.photo}`} alt={animal.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-earth-100"><Beef className="w-24 h-24 text-earth-800 opacity-10" /></div>
              )}
            </div>
          </div>
          <div className="mt-8 bg-earth-950 text-white p-8 rounded-[2.5rem] shadow-xl shadow-earth-950/20">
            <h2 className="text-3xl font-black tracking-tighter mb-1">{animal.name || 'Sem Nome'}</h2>
            <p className="text-nature-400 font-bold uppercase tracking-widest text-[10px]">Identificação SISBOV</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black uppercase tracking-tighter">
              <span className="bg-earth-800 px-3 py-1.5 rounded-lg border border-earth-700 tracking-widest leading-none flex items-center min-h-[2rem]">{animal.idUnique}</span>
              <span className={`px-3 py-1.5 rounded-lg border tracking-widest leading-none flex items-center min-h-[2rem] ${animal.status === 'Ativo' ? 'bg-nature-900/50 border-nature-600 text-nature-400' : 'bg-red-900/50 border-red-600 text-red-400'}`}>
                {animal.status}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 grid md:grid-cols-3 gap-6 auto-rows-max">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-center">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Raça do Bovino</p>
            <p className="text-2xl font-black text-gray-900">{animal.breed}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-center">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Idade Aproximada</p>
            <p className="text-2xl font-black text-gray-900">
              {Math.floor((new Date() - new Date(animal.birthDate)) / (1000 * 60 * 60 * 24 * 365))} Anos
            </p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-center">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Peso de Registro</p>
            <p className="text-2xl font-black text-gray-900">{animal.currentWeight} kg</p>
          </div>

          {/* Histórico e Registros */}
          <div className="md:col-span-3 grid md:grid-cols-2 gap-8">
            {/* Reprodução */}
            <HistoryCard 
              title="Reprodução" 
              icon={Heart}
              onAdd={() => navigate(`/animais/${animal.id}/reproducao`)}
            >
              {repro.length > 0 ? repro.map(r => (
                <div key={r._id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-pink-600 font-black shadow-sm group-hover:scale-110 transition-transform">R</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{r.type}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(r.date).toLocaleDateString()} - {r.status}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-pink-600" />
                </div>
              )) : <p className="text-sm text-gray-400 font-medium italic">Nenhum registro de reprodução.</p>}
            </HistoryCard>

            {/* Movimentação */}
            <HistoryCard 
              title="Movimentação" 
              icon={ArrowLeftRight}
              onAdd={() => navigate(`/animais/${animal.id}/movimentar`)}
            >
              {movements.length > 0 ? movements.map(m => (
                <div key={m._id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-earth-600 font-black shadow-sm group-hover:scale-110 transition-transform">M</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{m.to}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(m.date).toLocaleDateString()} - {m.reason}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-earth-600" />
                </div>
              )) : <p className="text-sm text-gray-400 font-medium italic">Nenhum registro de movimentação.</p>}
            </HistoryCard>

            {/* Vacinas */}
            <HistoryCard 
              title="Vacinas" 
              icon={Calendar} 
              onAdd={() => navigate(`/animais/${animal.id}/vacinar`)}
            >
              {vaccines.length > 0 ? vaccines.map(v => (
                <div key={v._id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-nature-600 font-black shadow-sm group-hover:scale-110 transition-transform">V</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{v.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(v.applicationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-nature-600" />
                </div>
              )) : <p className="text-sm text-gray-400 font-medium italic">Nenhum registro de vacina.</p>}
            </HistoryCard>

            {/* Doenças / Tratamentos */}
            <HistoryCard 
              title="Saúde & Doenças" 
              icon={Activity}
              onAdd={() => navigate(`/animais/${animal.id}/diagnosticar`)}
            >
              {diseases.length > 0 ? diseases.map(d => (
                <div key={d._id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-600 font-black shadow-sm group-hover:scale-110 transition-transform">D</div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{d.type}</h4>
                      <p className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md mt-1 inline-block ${d.status === 'Curado' ? 'bg-nature-100 text-nature-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status}
                      </p>
                    </div>
                  </div>
                  <AlertTriangle className={`w-5 h-5 ${d.status === 'Curado' ? 'text-nature-600' : 'text-red-600'}`} />
                </div>
              )) : <p className="text-sm text-gray-400 font-medium italic">Histórico de saúde limpo.</p>}
            </HistoryCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;
