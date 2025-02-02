


import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import houseReducer from './slices/houseSlice'
export const store = configureStore({
        reducer:{
            auth:authReducer,
            profile:profileReducer,
            house:houseReducer,
        }
  })