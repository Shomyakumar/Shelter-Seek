// src/redux/slices/houseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  houseData: "",
  houseId:""
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    setHouseId: (state, action) => {
      state.houseId = action.payload;
    },
    setHouseData:(state,action)=>{
      state.houseDetails=action.payload;
    }
    
  },
});

export const { setHouseData, setHouseId} = houseSlice.actions;

export default houseSlice.reducer;
// redux/slices/houseSlice.js
