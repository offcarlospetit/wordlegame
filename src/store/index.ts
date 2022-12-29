import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
// import productApi from "../home/api/Home";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import logger from 'redux-logger';
import { gameSlice } from "../home";
import { UserReducer } from "../user";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const reducers = combineReducers({
    // [productApi.reducerPath]: productApi.reducer,
    [gameSlice.name]: gameSlice.reducer,
    [UserReducer.name]: UserReducer.reducer,
});

const middlewares = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
    }
});

if (__DEV__) {
    const createDebugger = require("redux-flipper").default;
    middlewares.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    // .concat(productApi.middleware, logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
setupListeners(store.dispatch);

export const persistor = persistStore(store);