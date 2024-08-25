import { configureStore } from '@reduxjs/toolkit';
import modulesReducer from './module-slice';

const store = configureStore({
    reducer: {
        modules: modulesReducer
    }
});

export default store;