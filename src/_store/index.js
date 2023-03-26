import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth.slice";
import { cardsReducer } from "./cards.slice";

export * from "./auth.slice";
export * from "./cards.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
  },
});
