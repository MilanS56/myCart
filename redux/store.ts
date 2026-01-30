import {configureStore} from '@reduxjs/toolkit'
import {persistStore, persistReducer} from 'redux-persist'

import cartReducer from './cartSlice'
import productReducer from './productSlice'

const storage =
  typeof window !== "undefined"
    ? require("redux-persist/lib/storage").default
    : undefined;
const persistConfig = {
  key: "root",
  storage
};

const persistedCartReducer= persistReducer(persistConfig, cartReducer);

export const store=configureStore({
    reducer:{
        cart: persistedCartReducer,
        product: productReducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false}),
    
});
export const persistor=persistStore(store);
export type RootState= ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch