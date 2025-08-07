export const CATEGORY_TYPES = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'books', name: 'Books' },
  { id: 'sports', name: 'Sports & Outdoors' }
];

export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_OPTIONS = [
  { value: ORDER_STATUSES.PENDING, label: 'Pending' },
  { value: ORDER_STATUSES.PROCESSING, label: 'Processing' },
  { value: ORDER_STATUSES.COMPLETED, label: 'Completed' },
  { value: ORDER_STATUSES.CANCELLED, label: 'Cancelled' }
];

export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  MANAGER: 'manager'
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const MAX_IMAGE_UPLOADS = 5;
export const MAX_IMAGE_SIZE_MB = 10;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];