import { Warehouse } from '../types';

interface WarehouseCardProps {
  warehouse: Warehouse;
}

export default function WarehouseCard({ warehouse }: WarehouseCardProps) {
  const usagePercentage = (warehouse.usedCapacity / warehouse.totalCapacity) * 100;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
          <p className="text-sm text-gray-500">{warehouse.location}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          usagePercentage > 90 
            ? 'bg-red-100 text-red-800'
            : usagePercentage > 70
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {usagePercentage.toFixed(1)}% Used
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Used Space</span>
          <span className="font-medium">{warehouse.usedCapacity.toLocaleString()} sqft</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Capacity</span>
          <span className="font-medium">{warehouse.totalCapacity.toLocaleString()} sqft</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Available</span>
          <span className="font-medium">{(warehouse.totalCapacity - warehouse.usedCapacity).toLocaleString()} sqft</span>
        </div>
      </div>
    </div>
  );
}
