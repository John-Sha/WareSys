interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: { name: string; email: string; allocatedSpace: number; warehouseId: string }) => void;
}

export default function AddClientModal({ isOpen, onClose, onAdd }: AddClientModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onAdd({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      allocatedSpace: parseInt(formData.get('allocatedSpace') as string),
      warehouseId: formData.get('warehouseId') as string,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Client</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="allocatedSpace" className="block text-sm font-medium text-gray-700">
              Allocated Space (sqft)
            </label>
            <input
              type="number"
              id="allocatedSpace"
              name="allocatedSpace"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="warehouseId" className="block text-sm font-medium text-gray-700">
              Warehouse
            </label>
            <select
              id="warehouseId"
              name="warehouseId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1">North Seattle Warehouse</option>
              <option value="2">Portland Distribution Center</option>
              <option value="3">Bay Area Facility</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
