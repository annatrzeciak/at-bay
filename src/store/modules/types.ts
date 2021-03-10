import { AppState } from "./app";
import { AuthState } from "./auth";
import { OrderState } from "./order";
import { ProductState } from "./product";

export enum ModuleNames {
  appModule = "app",
  authModule = "auth",
  orderModule = "order",
  productModule = "product"
}

export interface RootState {
  [ModuleNames.appModule]: AppState;
  [ModuleNames.authModule]: AuthState;
  [ModuleNames.orderModule]: OrderState;
  [ModuleNames.productModule]: ProductState;
}

export type GetterFunc<Getters, State> = {
  [key in keyof Getters]: (
    state: State,
    getters: Getters,
    rootState: RootState
  ) => Getters[key];
};

export type ActionFunc<Actions extends string | number, Context> = {
  [key in Actions]: (context: Context, payload?: any) => Promise<void>;
};

export type MutationFunc<Mutations extends string | number, State> = {
  [key in Mutations]: (state: State, payload?: any) => void;
};
