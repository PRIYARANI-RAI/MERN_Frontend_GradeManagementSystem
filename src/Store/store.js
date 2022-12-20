import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from "../Slice/authSlice";

const reducerData =  combineReducers({
        auth:authReducer,
})

const persistConfig = {
    key: 'root',
    storage,
  }
  
  
  const persistedReducer = persistReducer(persistConfig, reducerData);

export const store = configureStore({
    reducer:persistedReducer,
    devTools:true
})
export const persistor = persistStore(store)