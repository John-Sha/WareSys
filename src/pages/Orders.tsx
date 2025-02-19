import { useState, useEffect } from 'react';
import { AlignVerticalJustifyCenter, FileText, Package, Squircle, TrendingDown, TrendingUp } from 'lucide-react';

interface Order {
  id: string;
  clientId: string;
  clientName: string;
  orderNumber: string;
  date: string;
  amount: number;
  paymentMode: 'COD' | 'Credit' | 'UPI' | 'Refund';
  invoiceId: string;
  status: 'Accepted' | 'Ongoing' | 'Delivered' | 'Rejected' | 'Cancelled';
  warehouseId: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
  try {
    // Load orders from localStorage or use mock data if none exists
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
        setOrders(parsedOrders);
        return; // Successfully loaded from localStorage
      }
    }
    
    // If we got here, either localStorage failed or data was invalid/empty
    // Generate mock orders with consistent data
    const mockOrders: Order[] = [
      {
        id: '1',
        clientId: '1',
        clientName: 'Acme Corporation',
        orderNumber: '#100001',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 35000,
        paymentMode: 'Credit',
        invoiceId: 'C10000001',
        status: 'Delivered',
        warehouseId: '1'
      },
      {
        id: '2',
        clientId: '2',
        clientName: 'TechStart Industries',
        orderNumber: '#100002',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 42000,
        paymentMode: 'UPI',
        invoiceId: 'C10000002',
        status: 'Ongoing',
        warehouseId: '2'
      },
      {
        id: '3',
        clientId: '3',
        clientName: 'Global Logistics Co',
        orderNumber: '#100003',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 28500,
        paymentMode: 'COD',
        invoiceId: 'C10000003',
        status: 'Accepted',
        warehouseId: '1'
      },
      {
        id: '4',
        clientId: '1',
        clientName: 'Acme Corporation',
        orderNumber: '#100004',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 52300,
        paymentMode: 'Credit',
        invoiceId: 'C10000004',
        status: 'Delivered',
        warehouseId: '3'
      },
      {
        id: '5',
        clientId: '4',
        clientName: 'Summit Enterprises',
        orderNumber: '#100005',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 18750,
        paymentMode: 'UPI',
        invoiceId: 'C10000005',
        status: 'Rejected',
        warehouseId: '2'
      }
    ];
    setOrders(mockOrders);
    
    // Try to save to localStorage, but don't fail if it doesn't work
    try {
      localStorage.setItem('orders', JSON.stringify(mockOrders));
    } catch (saveError) {
      console.warn('Could not save mock orders to localStorage:', saveError);
    }
  } catch (error) {
    console.error('Error loading orders:', error);
    
    // Fallback to mock data even if localStorage access fails entirely
    const mockOrders: Order[] = [
      {
        id: '1',
        clientId: '1',
        clientName: 'Acme Corporation',
        orderNumber: '#100001',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 35000,
        paymentMode: 'Credit',
        invoiceId: 'C10000001',
        status: 'Delivered',
        warehouseId: '1'
      },
      {
        id: '2',
        clientId: '2',
        clientName: 'TechStart Industries',
        orderNumber: '#100002',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 42000,
        paymentMode: 'UPI',
        invoiceId: 'C10000002',
        status: 'Ongoing',
        warehouseId: '2'
      },
      {
        id: '3',
        clientId: '3',
        clientName: 'Global Logistics Co',
        orderNumber: '#100003',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 28500,
        paymentMode: 'COD',
        invoiceId: 'C10000003',
        status: 'Accepted',
        warehouseId: '1'
      },
      {
        id: '4',
        clientId: '1',
        clientName: 'Acme Corporation',
        orderNumber: '#100004',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 52300,
        paymentMode: 'Credit',
        invoiceId: 'C10000004',
        status: 'Delivered',
        warehouseId: '3'
      },
      {
        id: '5',
        clientId: '4',
        clientName: 'Summit Enterprises',
        orderNumber: '#100005',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 18750,
        paymentMode: 'UPI',
        invoiceId: 'C10000005',
        status: 'Rejected',
        warehouseId: '2'
      }
    ];
    setOrders(mockOrders);
  }
}, []);

  const handleEditStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setActiveDropdown(null);
  };

  const stats = {
    total: orders.length,
    dispatched: orders.filter(o => o.status === 'Ongoing').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    returns: orders.filter(o => o.status === 'Rejected').length
  };

  const calculateGrowth = (value: number): string => {
  if (stats.total === 0) return '0.00%';
  const growth = ((value / stats.total) * 100).toFixed(2);
  return `${growth}%`;
};

  const tabs = ['All Orders', 'Ongoing', 'Dispatched', 'Delivered', 'Return', 'Cancelled'];
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'All Orders') return true;
    return order.status === activeTab;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.order-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  return (
    <div className="space-y-6 max-w-[100vw] overflow-hidden">
      {/* Stats Grid - Responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl sm:text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {calculateGrowth(stats.total)}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Dispatched</p>
              <p className="text-xl sm:text-2xl font-semibold mt-1">{stats.dispatched}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-full">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {calculateGrowth(stats.dispatched)}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-xl sm:text-2xl font-semibold mt-1">{stats.delivered}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-red-600">
            <TrendingDown className="w-4 h-4 mr-1" />
            {calculateGrowth(stats.delivered)}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Returns</p>
              <p className="text-xl sm:text-2xl font-semibold mt-1">{stats.returns}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-full">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {calculateGrowth(stats.returns)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Tabs and Filter Section - Scrollable on mobile */}
        <div className="p-4 border-b border-gray-200 overflow-x-auto">
          <div className="flex justify-between items-center min-w-max">
            <div className="flex space-x-2 sm:space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="ml-4 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        {/* Table Section - Horizontally scrollable */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {order.clientName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{order.clientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.paymentMode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.invoiceId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        order.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="order-dropdown relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === order.id ? null : order.id);
                          }}
                          className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                        >
                          <Squircle className="w-5 h-5" />
                        </button>
                        
                        {activeDropdown === order.id && (
                          <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                              <button
                                onClick={() => handleEditStatus(order.id, 'Accepted')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Mark as Accepted
                              </button>
                              <button
                                onClick={() => handleEditStatus(order.id, 'Ongoing')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Mark as Ongoing
                              </button>
                              <button
                                onClick={() => handleEditStatus(order.id, 'Delivered')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Mark as Delivered
                              </button>
                              <button
                                onClick={() => handleEditStatus(order.id, 'Rejected')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Mark as Rejected
                              </button>
                              <button
                                onClick={() => handleEditStatus(order.id, 'Cancelled')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Mark as Cancelled
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
