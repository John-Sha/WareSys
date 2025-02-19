import { useState, useEffect } from 'react';
import { Client } from '../types';
import { Mail, MapPin, Plus, Search } from 'lucide-react';
import AddClientModal from '../components/AddClientModal';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    // Load clients from localStorage or use mock data if none exists
    const storedClients = localStorage.getItem('clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    } else {
      const mockClients: Client[] = [
        {
          id: '1',
          name: 'Acme Corporation',
          email: 'contact@acme.com',
          allocatedSpace: 15000,
          warehouseId: '1'
        },
        {
          id: '2',
          name: 'TechStart Industries',
          email: 'operations@techstart.com',
          allocatedSpace: 25000,
          warehouseId: '2'
        },
        {
          id: '3',
          name: 'Global Logistics Co',
          email: 'support@globallogistics.com',
          allocatedSpace: 35000,
          warehouseId: '1'
        }
      ];
      setClients(mockClients);
      localStorage.setItem('clients', JSON.stringify(mockClients));
    }
  }, []);

  const handleAddClient = (clientData: { name: string; email: string; allocatedSpace: number; warehouseId: string }) => {
    const newClient: Client = {
      id: Date.now().toString(), // Generate a unique ID
      ...clientData
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Allocated Space: {client.allocatedSpace.toLocaleString()} sqft
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddClient}
      />
    </div>
  );
}
