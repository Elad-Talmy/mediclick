import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const setupStore = () => {
   return configureStore({
      reducer: rootReducer,
      devTools: import.meta.env.DEV,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            serializableCheck: false,
         }),
   });
};

export const store = setupStore();
export type AppDispatch = typeof store.dispatch;
