export interface Warehouse {
  id: string;
  name: string;
  totalCapacity: number;
  usedCapacity: number;
  location: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  allocatedSpace: number;
  warehouseId: string;
}

export interface Order {
  id: string;
  clientId: string;
  warehouseId: string;
  status: 'pending' | 'processing' | 'completed';
  quantity: number;
  date: string;
}
