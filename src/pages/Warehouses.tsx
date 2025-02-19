import { useState, useEffect } from 'react';
import WarehouseCard from '../components/WarehouseCard';
import AddWarehouseModal from '../components/AddWarehouseModal';
import { Warehouse } from '../types';
import { Plus, Search } from 'lucide-react';

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // Load warehouses from localStorage or use mock data if none exists
    const storedWarehouses = localStorage.getItem('warehouses');
    if (storedWarehouses) {
      setWarehouses(JSON.parse(storedWarehouses));
    } else {
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
        },
        {
          id: '4',
          name: 'LA Distribution Hub',
          totalCapacity: 120000,
          usedCapacity: 85000,
          location: 'Los Angeles, CA'
        }
      ];
      setWarehouses(mockWarehouses);
      localStorage.setItem('warehouses', JSON.stringify(mockWarehouses));
    }
  }, []);

  const handleAddWarehouse = (warehouseData: { name: string; location: string; totalCapacity: number }) => {
    const newWarehouse: Warehouse = {
      id: Date.now().toString(),
      ...warehouseData,
      usedCapacity: 0, // New warehouses start with 0 used capacity
    };

    const updatedWarehouses = [...warehouses, newWarehouse];
    setWarehouses(updatedWarehouses);
    localStorage.setItem('warehouses', JSON.stringify(updatedWarehouses));
  };

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Warehouses</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Warehouse</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search warehouses..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredWarehouses.map((warehouse) => (
          <WarehouseCard key={warehouse.id} warehouse={warehouse} />
        ))}
      </div>

      <AddWarehouseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddWarehouse}
      />
    </div>
  );
}
