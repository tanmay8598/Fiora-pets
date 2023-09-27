import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers, applyMiddleware } from "redux";
import {
  createStateSyncMiddleware,
  initMessageListener,
  initStateWithPrevTab,
} from "redux-state-sync";

const persistConfig = {
  key: "root",
  storage,
};

const reduxStateSyncConfig = {};

const reducers = combineReducers({
  cart: cartReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  reducers,
  applyMiddleware(createStateSyncMiddleware(reduxStateSyncConfig))
);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
initStateWithPrevTab(store);

const persistor = persistStore(store);

export { store, persistor };
