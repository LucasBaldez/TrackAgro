import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, Save, Upload, Beef, Trash2, Loader2, Calendar, Scale, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const AnimalForm = () => {
  const [formData, setFormData] = useState({
    idUnique: '',
    name: '',
    earringNumber: '',
    birthDate: '',
    sex: 'M',
    breed: '',
    currentWeight: '',
    status: 'Ativo',
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchAnimal = async () => {
        setFetching(true);
        try {
          const { data } = await api.get(`/animals/${id}`);
          setFormData({
            idUnique: data.idUnique,
            name: data.name || '',
            earringNumber: data.earringNumber,
            birthDate: data.birthDate.split('T')[0],
            sex: data.sex,
            breed: data.breed,
            currentWeight: data.currentWeight,
            status: data.status,
          });
          if (data.photo) setPreview(`http://localhost:5000${data.photo}`);
        } catch (error) {
          console.error(error);
        } finally {
          setFetching(false);
        }
      };
      fetchAnimal();
    }
  }, [id, isEdit]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (photo) data.append('photo', photo);

    try {
      if (isEdit) {
        await api.put(`/animals/${id}`, data);
      } else {
        await api.post('/animals', data);
      }
      navigate('/animais');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar animal. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-nature-600" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-bottom-10 duration-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/animais" className="p-3 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all group">
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-nature-600 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              {isEdit ? 'Editar Bovino' : 'Registrar Novo Animal'}
            </h1>
            <p className="text-gray-400 font-medium">Preencha os campos abaixo com as informações do animal.</p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Upload de Foto */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
            <label className="cursor-pointer group block">
              <div className="relative w-full aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-nature-400 group-hover:bg-nature-50/50">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-nature-600" />
                    </div>
                    <p className="text-sm font-bold text-gray-500">Enviar Foto</p>
                    <p className="text-[10px] text-gray-300 font-bold uppercase mt-1">JPG, PNG (Max 5MB)</p>
                  </>
                )}
                <input type="file" className="hidden" onChange={handlePhotoChange} />
              </div>
            </label>
            {preview && (
              <button 
                onClick={() => {setPreview(null); setPhoto(null);}} 
                className="mt-4 text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 justify-center mx-auto"
              >
                <Trash2 className="w-4 h-4" /> Remover Foto
              </button>
            )}
          </div>
        </div>

        {/* Formulário Principal */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4" /> ID Único SISBOV
                </label>
                <input 
                  type="text" 
                  value={formData.idUnique}
                  onChange={(e) => setFormData({...formData, idUnique: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none font-bold text-gray-900"
                  placeholder="EX: SYS-12345"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Número do Brinco
                </label>
                <input 
                  type="text" 
                  value={formData.earringNumber}
                  onChange={(e) => setFormData({...formData, earringNumber: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none font-bold text-gray-900"
                  placeholder="EX: 450"
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Beef className="w-4 h-4" /> Nome / Identificação
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none font-bold text-gray-900"
                  placeholder="EX: Mimosa (Opcional)"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Data Nascimento
                </label>
                <input 
                  type="date" 
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none font-bold text-gray-900"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   Sexo
                </label>
                <div className="grid grid-cols-2 gap-4 h-14">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, sex: 'M'})}
                    className={`rounded-2xl font-bold transition-all border-2 ${formData.sex === 'M' ? 'bg-nature-600 text-white border-nature-600' : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'}`}
                  >
                    Macho
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, sex: 'F'})}
                    className={`rounded-2xl font-bold transition-all border-2 ${formData.sex === 'F' ? 'bg-pink-600 text-white border-pink-600' : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'}`}
                  >
                    Fêmea
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  Raça
                </label>
                <input 
                  type="text" 
                  value={formData.breed}
                  onChange={(e) => setFormData({...formData, breed: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none font-bold text-gray-900"
                  placeholder="EX: Nelore"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Peso Atual (kg)
                </label>
                <input 
                  type="number" 
                  value={formData.currentWeight}
                  onChange={(e) => setFormData({...formData, currentWeight: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none font-bold text-gray-900"
                  placeholder="EX: 450"
                  required
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  Status do Animal
                </label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-4 focus:ring-nature-500/10 focus:bg-white transition-all outline-none font-bold text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="Ativo">Ativo no Rebanho</option>
                  <option value="Vendido">Vendido / Abatido</option>
                  <option value="Morto">Morte Natural / Acidental</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-nature-600 text-white font-black text-xl rounded-2xl hover:bg-nature-700 active:scale-95 transition-all shadow-2xl shadow-nature-600/30 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                <><Save className="w-6 h-6" /> {isEdit ? 'Atualizar Dados' : 'Finalizar Cadastro'}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnimalForm;
