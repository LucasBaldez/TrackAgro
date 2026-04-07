import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Beef, Calendar, Activity, ArrowLeftRight, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Rebanho', path: '/animais', icon: Beef },
    { name: 'Vacinas', path: '/vacinas', icon: Calendar },
    { name: 'Saúde', path: '/doencas', icon: Activity },
    { name: 'Movimentação', path: '/movimentacao', icon: ArrowLeftRight },
  ];

  return (
    <aside className="w-64 bg-earth-950 text-white min-h-screen flex flex-col shadow-xl">
      <div className="p-6 border-b border-earth-800">
        <h1 className="text-2xl font-bold text-nature-400 tracking-tight flex items-center gap-2">
          <Beef className="w-8 h-8" />
          TrackAgro
        </h1>
        <p className="text-xs text-earth-400 mt-1 uppercase tracking-widest font-semibold font-mono">
          Gestão de Pecuária
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-nature-600 text-white shadow-lg shadow-nature-900/20' 
                  : 'text-earth-300 hover:bg-earth-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-earth-800 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 bg-earth-900 rounded-2xl mb-4">
          <div className="w-10 h-10 rounded-full bg-nature-500 flex items-center justify-center text-earth-950 font-bold uppercase ring-2 ring-nature-600/30">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate leading-none">{user?.name}</p>
            <p className="text-[10px] text-earth-400 uppercase mt-1 tracking-wider">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-4 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all group lg:min-w-0 min-w-0"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium truncate">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
