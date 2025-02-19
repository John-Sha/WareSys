import { Database } from 'lucide-react';
import { useState } from 'react';
import IMSModal from '../components/IMSModal';

export default function Inventories() {
  const [isIMSModalOpen, setIsIMSModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventories</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Database className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect to IMS</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          To access inventory management features, you need to connect your Inventory Management System (IMS).
        </p>
        <button
          onClick={() => setIsIMSModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center space-x-2"
        >
          <span>Connect IMS</span>
        </button>
      </div>

      <IMSModal isOpen={isIMSModalOpen} onClose={() => setIsIMSModalOpen(false)} />
    </div>
  );
}
