import { useEffect, useState } from 'react';
import WarehouseCard from '../components/WarehouseCard';
import RevenueChart from '../components/RevenueChart';
import { Warehouse } from '../types';
import { ChartBar, Package, TrendingUp, Users } from 'lucide-react';

export default function Dashboard() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    // Simulated data - in a real app, this would come from an API
    const mockWarehouses: Warehouse[] = [
      {
        id: '1',
        name: 'North Seattle Warehouse',
        totalCapacity: 50000,
        usedCapacity: 35000,
        location: 'Seattle, WA'
      },
      {
        id: '2',
        name: 'Portland Distribution Center',
        totalCapacity: 75000,
        usedCapacity: 60000,
        location: 'Portland, OR'
      },
      {
        id: '3',
        name: 'Bay Area Facility',
        totalCapacity: 100000,
        usedCapacity: 95000,
        location: 'San Francisco, CA'
      }
    ];
    setWarehouses(mockWarehouses);
  }, []);

  const stats = [
    { name: 'Lifetime Orders', value: '1,234', icon: Package },
    { name: 'Active Clients', value: '56', icon: Users },
    { name: 'Utilization Rate', value: '78%', icon: ChartBar },
    { name: 'Monthly Growth', value: '+12%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <stat.icon className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <RevenueChart />

      <div>
        <h2 className="text-xl font-semibold mb-4">Warehouse Capacity Overview</h2>
        <div className="grid grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <WarehouseCard key={warehouse.id} warehouse={warehouse} />
          ))}
        </div>
      </div>
    </div>
  );
}
