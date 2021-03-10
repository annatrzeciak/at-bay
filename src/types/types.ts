export interface Product {
  uuid?: string;
  name: string;
  price: number;
  grams: number;
  description?: string;
  image?: string;
  added: string;
}

export interface User {
  uuid: string;
  name: string;
  email: number;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user"
}

export interface Order {
  uuid?: string;
  remarks: string;
  cart: Array<CartItem>;
  date?: string;
  status: OrderStatus;
}
export interface CartItem {
  product: Product;
  count: number;
}

export enum OrderStatus {
  NEW = "new",
  DURING = "during",
  READY_TO_PICKUP = "ready_to_pickup",
  RECEIVED = "received",
  CANCELED = "canceled"
}
