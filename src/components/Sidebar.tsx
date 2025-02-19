import { Database, House, LayoutDashboard, Link, Package, Settings, Users, Warehouse } from 'lucide-react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import IMSModal from './IMSModal';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isIMSModalOpen, setIsIMSModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const navigation = [
    { name: 'Home', icon: House, path: '/' },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Warehouses', icon: Warehouse, path: '/warehouses' },
    { name: 'Clients', icon: Users, path: '/clients' },
    { name: 'Orders', icon: Package, path: '/orders' },
    { name: 'Inventories', icon: Database, path: '/inventories' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-white">WMS Portal</h1>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <RouterLink
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </RouterLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        {user && (
          <div className="space-y-1">
            <p className="font-medium text-white">{user.companyName}</p>
            <p className="text-sm text-slate-400">{user.name}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <button
            onClick={() => setIsIMSModalOpen(true)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Link className="w-4 h-4" />
            <span>Connect IMS</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      <IMSModal isOpen={isIMSModalOpen} onClose={() => setIsIMSModalOpen(false)} />
    </div>
  );
}
