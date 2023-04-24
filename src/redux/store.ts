import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import repositoriesSlice from "./slices/repositoriesSlice"
import searchSlice from "./slices/searchSlice"
import paginationSlice from "./slices/paginationSlice"

export const store = configureStore({

   reducer: {

      repositoriesSlice,
      searchSlice,
      paginationSlice
      
   }
   
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()