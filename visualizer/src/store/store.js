import { configureStore } from '@reduxjs/toolkit';
import packagingReducer from './packagingSlice/packagingSlice';
import apiReducer from './apiSlice/apiSlice';
import orderApiReducer from './orderApiSlice/orderApiSlice';

export default configureStore({
    reducer: {
        packaging: packagingReducer,
        api: apiReducer,
        orderApiReducer,
    }
})