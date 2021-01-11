export interface Product {
  name: string;
  uuid: string;
  price: number;
  grams: number;
  description?: string;
  image?: string;
  added: string;
}

export interface User {
  name: string;
  email: number;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user"
}
