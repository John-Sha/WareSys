interface IMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IMSModal({ isOpen, onClose }: IMSModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Connect to IMS</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Integration Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Obtain API credentials from your IMS provider</li>
              <li>Configure API endpoints in your system</li>
              <li>Set up webhook notifications for real-time updates</li>
              <li>Test the connection with sample data</li>
            </ol>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your API key"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">API Endpoint</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://api.your-ims.com"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
