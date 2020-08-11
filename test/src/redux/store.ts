import { createStore } from "redux";
import { shoppingCartReducer } from "./reducers";

export const store = createStore(shoppingCartReducer);
