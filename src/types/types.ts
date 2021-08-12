export interface Product {
  uuid?: string;
  name: string;
  price: number;
  sale?: number;
  description?: string;
  fullDescription?: string;
  images?: Array<string>;
  added?: string;
  category: Array<string>;
  stars: number;
  new: boolean;
  hot: boolean;
  currency: Currency;
  options: Array<{
    size: string;
    colors: Array<{ color: Color; count: number }>;
  }>;
}

export interface User {
  uuid: string;
  name: string;
  email: number;
  role: UserRole;
}
export enum Currency {
  PLN = "PLN",
  EUR = "EUR"
}
export enum Color {
  PINK = "pink",
  BLACK = "black",
  BLUE = "blue",
  GREEN = "green",
  RED = "red",
  WHITE = "white"
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
