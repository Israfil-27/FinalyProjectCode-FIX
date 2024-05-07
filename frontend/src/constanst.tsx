export const BACKEND_URL = "http://localhost:5000";

export const BASE_URL = "development" ? "http://localhost:5173" : "";

export const PRODUCTS_URL = `${BACKEND_URL}/api/products`;
export const USERS_URL = `${BACKEND_URL}/api/users`;
export const ORDERS_URL = `${BACKEND_URL}/api/orders`;
export const PAYPAL_URL = `${BACKEND_URL}/api/config/paypal`;
export const UPLOAD_URL = `${BACKEND_URL}/api/uploads`
