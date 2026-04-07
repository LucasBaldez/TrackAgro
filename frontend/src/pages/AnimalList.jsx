import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit2, Trash2, Beef, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data } = await api.get('/animals');
        setAnimals(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimals();
  }, []);

  const filteredAnimals = animals.filter(a => 
    a.idUnique.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.earringNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-nature-600 font-bold text-sm tracking-widest uppercase mb-1">
            <Beef className="w-4 h-4" />
            Gestão de Rebanho
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Inventário de Animais</h1>
        </div>
        <Link 
          to="/animais/novo" 
          className="flex items-center gap-2 px-6 py-4 bg-earth-950 text-white font-bold rounded-2xl hover:bg-earth-900 transition-all shadow-xl shadow-earth-950/20 active:scale-95 text-center justify-center"
        >
          <Plus className="w-5 h-5" />
          Cadastrar Bovino
        </Link>
      </header>

      {/* Busca e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por ID, Nome ou Brinco..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-14 bg-gray-50 border-none rounded-2xl pl-12 pr-4 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none text-gray-700 font-medium placeholder:text-gray-300"
          />
        </div>
        <button className="h-14 px-6 bg-gray-50 text-gray-600 rounded-2xl flex items-center gap-2 font-bold hover:bg-gray-100 transition-all border border-gray-100">
          <Filter className="w-5 h-5" />
          Filtros Avançados
        </button>
      </div>

      {/* Tabela de Animais */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Animal / ID</th>
                <th className="px-6 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Raça & Sexo</th>
                <th className="px-6 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Peso Atual</th>
                <th className="px-6 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredAnimals.map((animal, idx) => (
                  <motion.tr 
                    key={animal._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-nature-50/30 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md ring-4 ring-white border border-gray-100">
                          {animal.photo ? (
                            <img src={`http://localhost:5000${animal.photo}`} alt={animal.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-earth-100 flex items-center justify-center text-earth-800 font-black">
                              <Beef className="w-8 h-8 opacity-20" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 group-hover:text-nature-700 transition-colors">{animal.name || 'Sem Nome'}</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Brinco: {animal.earringNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-bold text-gray-700">{animal.breed}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${animal.sex === 'M' ? 'text-blue-500' : 'text-pink-500'}`}>
                        {animal.sex === 'M' ? 'Macho' : 'Fêmea'}
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-gray-900 tracking-tight">{animal.currentWeight}</span>
                        <span className="text-xs font-bold text-gray-400">kg</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        animal.status === 'Ativo' ? 'bg-nature-100 text-nature-700' : 
                        animal.status === 'Vendido' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {animal.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/animais/${animal._id}`} className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-nature-600 shadow-sm border border-transparent hover:border-nature-100 transition-all">
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link to={`/animais/editar/${animal._id}`} className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-earth-600 shadow-sm border border-transparent hover:border-earth-100 transition-all">
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-red-600 shadow-sm border border-transparent hover:border-red-100 transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Paginação Mock */}
        <div className="px-8 py-6 bg-gray-50/50 flex items-center justify-between border-t border-gray-100 font-medium text-gray-500 text-sm">
          <p>Mostrando {filteredAnimals.length} de {animals.length} animais</p>
          <div className="flex gap-2">
            <button className="p-3 hover:bg-white rounded-2xl border border-gray-200 transition-all text-gray-400 cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-white rounded-2xl border border-gray-200 transition-all text-gray-900 shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalList;
