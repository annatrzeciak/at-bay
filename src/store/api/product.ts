import { Product } from "@/types/types";
const lastAddedProducts = require("./lastAddedProducts.json");
export function getLastAddedProducts(): Promise<Array<Product>> {
  return new Promise(resolve => resolve(lastAddedProducts));
}
