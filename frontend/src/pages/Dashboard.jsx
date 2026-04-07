import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Beef, Activity, Calendar, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardCard = ({ title, value, icon: Icon, color, subtext }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 flex items-start gap-5"
  >
    <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600 ring-4 ring-${color.split('-')[1]}-50/50`}>
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <p className="text-gray-500 font-medium text-sm mb-1 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
      <p className="text-xs text-gray-400 mt-1 font-medium">{subtext}</p>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAnimals: 0,
    activeAnimals: 0,
    sickAnimals: 0,
    pendingVaccines: 0,
    upcomingBirths: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const dummyChartData = [
    { name: 'Jan', weight: 400 },
    { name: 'Fev', weight: 420 },
    { name: 'Mar', weight: 450 },
    { name: 'Abr', weight: 480 },
    { name: 'Mai', weight: 510 },
    { name: 'Jun', weight: 550 },
  ];

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Activity className="animate-spin text-nature-600" /></div>;

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Painel de Controle</h1>
          <p className="text-gray-500 mt-1 font-medium italic">Monitoramento em tempo real do seu rebanho.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-nature-600 text-white font-bold rounded-2xl hover:bg-nature-700 transition-all shadow-xl shadow-nature-600/20 active:scale-95">
            <Beef className="w-5 h-5" />
            Novo Registro
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Rebanho" 
          value={stats.totalAnimals} 
          icon={Beef} 
          color="bg-nature-500"
          subtext={`${stats.activeAnimals} animais ativos`}
        />
        <DashboardCard 
          title="Saúde" 
          value={stats.sickAnimals} 
          icon={Activity} 
          color="bg-red-500"
          subtext="Animais em tratamento"
        />
        <DashboardCard 
          title="Vacinas" 
          value={stats.pendingVaccines} 
          icon={Calendar} 
          color="bg-amber-500"
          subtext="Próximos 30 dias"
        />
        <DashboardCard 
          title="Maternidade" 
          value={stats.upcomingBirths} 
          icon={AlertCircle} 
          color="bg-blue-500"
          subtext="Partos previstos"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Gráfico de Evolução */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Evolução de Peso Médio</h3>
              <p className="text-gray-400 text-sm font-medium">Histórico semestral (kg)</p>
            </div>
            <div className="flex items-center gap-2 text-nature-600 bg-nature-50 px-3 py-1.5 rounded-xl text-sm font-bold border border-nature-100">
              <TrendingUp className="w-4 h-4" />
              +12.4% este mês
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyChartData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#89b224" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#89b224" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                  itemStyle={{ color: '#89b224', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="weight" stroke="#89b224" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertas Rápidos */}
        <div className="bg-earth-950 p-8 rounded-[2.5rem] shadow-2xl shadow-earth-950/20 text-white relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <AlertCircle className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex-1">
            <h3 className="text-xl font-bold mb-6 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Alertas Prioritários
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-earth-900 border border-earth-800 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-earth-800 transition-all">
                <div className="w-12 h-12 bg-red-500/20 flex items-center justify-center rounded-xl text-red-400 font-bold group-hover:scale-110 transition-transform">V42</div>
                <div>
                  <h4 className="text-sm font-bold">Febre Aftosa</h4>
                  <p className="text-xs text-earth-400">Vence em 2 dias • Lote A12</p>
                </div>
              </div>
              <div className="p-4 bg-earth-900 border border-earth-800 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-earth-800 transition-all">
                <div className="w-12 h-12 bg-amber-500/20 flex items-center justify-center rounded-xl text-amber-400 font-bold group-hover:scale-110 transition-transform">098</div>
                <div>
                  <h4 className="text-sm font-bold">Prenhez Confirmada</h4>
                  <p className="text-xs text-earth-400">Parto previsto p/ amanhã</p>
                </div>
              </div>
              <div className="p-4 bg-earth-900 border border-earth-800 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-earth-800 transition-all">
                <div className="w-12 h-12 bg-blue-500/20 flex items-center justify-center rounded-xl text-blue-400 font-bold group-hover:scale-110 transition-transform">102</div>
                <div>
                  <h4 className="text-sm font-bold">Transferência Lote</h4>
                  <p className="text-xs text-earth-400">Pasto 4 → Curral Manejo</p>
                </div>
              </div>
            </div>
          </div>
          <button className="relative z-10 mt-8 w-full py-4 bg-earth-800 hover:bg-earth-700 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all group">
            Ver Todos Alertas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
