import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

type searchSliceState = {
   page: number
   button: 'next' | 'prev' | ''
}

const initialState: searchSliceState = {
   page: 1,
   button: ''
}

export const paginationSlice = createSlice({
   name: 'paginationsSlice',
   initialState,

   reducers: {
      
      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload
      },

      setButton: (state, action: PayloadAction<'next' | 'prev'>) => {
         state.button = action.payload
      }

   }
})

export default paginationSlice.reducer

export const { setPage, setButton } = paginationSlice.actions

export const paginationSelector = (state: RootState) => state.paginationSlice