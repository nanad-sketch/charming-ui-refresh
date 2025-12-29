export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  supplier: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  orderDate: string;
  expectedDelivery: string;
  status: 'received' | 'pending' | 'in-transit' | 'cancelled';
}

export interface StockAlert {
  id: string;
  itemName: string;
  currentStock: number;
  minStock: number;
  severity: 'critical' | 'warning' | 'info';
  createdAt: string;
}

export const inventoryItems: InventoryItem[] = [
  { id: '1', name: 'Wireless Mouse', category: 'Electronics', quantity: 150, minStock: 50, price: 29.99, status: 'in-stock', lastUpdated: '2024-01-15' },
  { id: '2', name: 'USB-C Cable', category: 'Electronics', quantity: 25, minStock: 100, price: 12.99, status: 'low-stock', lastUpdated: '2024-01-14' },
  { id: '3', name: 'Office Chair', category: 'Furniture', quantity: 0, minStock: 10, price: 199.99, status: 'out-of-stock', lastUpdated: '2024-01-13' },
  { id: '4', name: 'Desk Lamp', category: 'Furniture', quantity: 75, minStock: 20, price: 45.99, status: 'in-stock', lastUpdated: '2024-01-15' },
  { id: '5', name: 'Notebook Pack', category: 'Stationery', quantity: 500, minStock: 100, price: 8.99, status: 'in-stock', lastUpdated: '2024-01-15' },
  { id: '6', name: 'Ballpoint Pens', category: 'Stationery', quantity: 15, minStock: 50, price: 3.99, status: 'low-stock', lastUpdated: '2024-01-12' },
  { id: '7', name: 'Monitor Stand', category: 'Furniture', quantity: 45, minStock: 15, price: 79.99, status: 'in-stock', lastUpdated: '2024-01-14' },
  { id: '8', name: 'Keyboard', category: 'Electronics', quantity: 8, minStock: 30, price: 69.99, status: 'low-stock', lastUpdated: '2024-01-11' },
  { id: '9', name: 'Webcam HD', category: 'Electronics', quantity: 0, minStock: 20, price: 89.99, status: 'out-of-stock', lastUpdated: '2024-01-10' },
  { id: '10', name: 'Sticky Notes', category: 'Stationery', quantity: 200, minStock: 50, price: 4.99, status: 'in-stock', lastUpdated: '2024-01-15' },
];

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    supplier: 'Tech Supplies Inc.',
    items: [
      { name: 'Wireless Mouse', quantity: 100, price: 24.99 },
      { name: 'USB-C Cable', quantity: 200, price: 9.99 },
    ],
    totalAmount: 4497.00,
    orderDate: '2024-01-10',
    expectedDelivery: '2024-01-20',
    status: 'received',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    supplier: 'Office Furniture Co.',
    items: [
      { name: 'Office Chair', quantity: 20, price: 159.99 },
      { name: 'Desk Lamp', quantity: 30, price: 39.99 },
    ],
    totalAmount: 4399.50,
    orderDate: '2024-01-12',
    expectedDelivery: '2024-01-25',
    status: 'in-transit',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    supplier: 'Stationery World',
    items: [
      { name: 'Notebook Pack', quantity: 500, price: 6.99 },
      { name: 'Ballpoint Pens', quantity: 300, price: 2.99 },
    ],
    totalAmount: 4392.00,
    orderDate: '2024-01-14',
    expectedDelivery: '2024-01-22',
    status: 'pending',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    supplier: 'Tech Supplies Inc.',
    items: [
      { name: 'Keyboard', quantity: 50, price: 59.99 },
      { name: 'Webcam HD', quantity: 40, price: 79.99 },
    ],
    totalAmount: 6199.10,
    orderDate: '2024-01-08',
    expectedDelivery: '2024-01-18',
    status: 'received',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    supplier: 'Office Furniture Co.',
    items: [
      { name: 'Monitor Stand', quantity: 25, price: 69.99 },
    ],
    totalAmount: 1749.75,
    orderDate: '2024-01-15',
    expectedDelivery: '2024-01-28',
    status: 'pending',
  },
];

export const stockAlerts: StockAlert[] = [
  { id: '1', itemName: 'Office Chair', currentStock: 0, minStock: 10, severity: 'critical', createdAt: '2024-01-15T08:30:00' },
  { id: '2', itemName: 'Webcam HD', currentStock: 0, minStock: 20, severity: 'critical', createdAt: '2024-01-15T09:15:00' },
  { id: '3', itemName: 'USB-C Cable', currentStock: 25, minStock: 100, severity: 'warning', createdAt: '2024-01-14T14:20:00' },
  { id: '4', itemName: 'Ballpoint Pens', currentStock: 15, minStock: 50, severity: 'warning', createdAt: '2024-01-14T16:45:00' },
  { id: '5', itemName: 'Keyboard', currentStock: 8, minStock: 30, severity: 'warning', createdAt: '2024-01-13T11:00:00' },
];

export const recentActivity = [
  { id: '1', action: 'Order Received', description: 'ORD-2024-001 from Tech Supplies Inc.', timestamp: '2024-01-15T10:30:00' },
  { id: '2', action: 'Stock Updated', description: 'Wireless Mouse quantity updated to 150', timestamp: '2024-01-15T10:35:00' },
  { id: '3', action: 'Low Stock Alert', description: 'USB-C Cable below minimum threshold', timestamp: '2024-01-14T14:20:00' },
  { id: '4', action: 'Order Placed', description: 'ORD-2024-005 to Office Furniture Co.', timestamp: '2024-01-15T09:00:00' },
  { id: '5', action: 'Out of Stock', description: 'Office Chair is now out of stock', timestamp: '2024-01-13T16:00:00' },
];
