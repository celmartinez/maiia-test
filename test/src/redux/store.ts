import { createStore } from "redux";
import { shoppingCartReducer } from "./shoppingCartReducer";

export const store = createStore(shoppingCartReducer);
