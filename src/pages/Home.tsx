import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to WMS Portal</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/dashboard"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">View Dashboard</h2>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-600">Get an overview of warehouse operations and key metrics</p>
        </Link>

        <Link
          to="/warehouses"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Warehouses</h2>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-600">View and manage warehouse space and inventory</p>
        </Link>

        <Link
          to="/clients"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Client Portal</h2>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-600">Manage client accounts and space allocation</p>
        </Link>

        <Link
          to="/settings"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 transition-colors"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">System Settings</h2>
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-600">Configure system preferences and integrations</p>
        </Link>
      </div>
    </div>
  );
}
