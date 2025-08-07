const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890', isBlocked: false },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', isBlocked: true },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '5551234567', isBlocked: false }
];

const mockCategories = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Home & Garden' }
];

const mockProducts = [
  {
    id: '1',
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features',
    price: 699.99,
    quantity: 50,
    category: 'Electronics',
    images: ['https://m.media-amazon.com/images/I/51AHHmX-17L.jpg']
  },
  {
    id: '2',
    name: 'Laptop',
    description: 'Powerful laptop for work and gaming',
    price: 1299.99,
    quantity: 25,
    category: 'Electronics',
    images: ['https://cdn.mos.cms.futurecdn.net/Gw3Se82bvppoJsHc4rCVsQ.jpg']
  },
  {
    id: '3',
    name: 'Pent Coat',
    description: 'Powerful laptop for work and gaming',
    price: 1299.99,
    quantity: 25,
    category: 'Mans Fashion',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRCAJYP8RsfvOc_yvd6ILxjXD2-XYQpPga-g&s']
  },
  {
    id: '4',
    name: 'Shalwar Kameez',
    description: 'Powerful laptop for work and gaming',
    price: 1299.99,
    quantity: 25,
    category: 'Mans Fashion',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF-A3VkPu-9RJ7oT4VadXHtHUeP1F-BGjWbQ&s']
  }
];

const mockOrders = [
  {
    id: '1',
    user: { name: 'John Doe', email: 'john@example.com' },
    products: [
      { id: '1', name: 'Smartphone', quantity: 1, price: 699.99 },
      { id: '2', name: 'Laptop', quantity: 1, price: 1299.99 }
    ],
    total: 1999.98,
    status: 'completed',
    date: '2023-05-15'
  },
  {
    id: '2',
    user: { name: 'John Doe', email: 'john@example.com' },
    products: [
      { id: '1', name: 'Pent Coat', quantity: 1, price: 1299.99 },
      { id: '2', name: 'Chalwar Kameez', quantity: 1, price: 1299.99 }
    ],
    total: 2499.98,
    status: 'completed',
    date: '2023-05-15'
  }
];


export const getUsers = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockUsers), 500));
};

export const getProducts = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockProducts), 500));
};

export const getCategories = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockCategories), 500));
};

export const getOrders = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockOrders), 500));
};