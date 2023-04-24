import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

type searchSliceState = {
   searchValue: string
}

const initialState: searchSliceState = {
   searchValue: ''
}

export const searchSlice = createSlice({
   name: 'searchSlice',
   initialState,

   reducers: {
      
      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload
      }

   }
})

export default searchSlice.reducer

export const { setSearchValue } = searchSlice.actions

export const searchSelector = (state: RootState) => state.searchSlice