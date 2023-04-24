import { useCallback } from 'react'
import { useSelector } from "react-redux"
import debounce from 'lodash.debounce'

import { setPage } from '../../redux/slices/paginationSlice'
import { getRepositories } from '../../redux/slices/repositoriesSlice' 
import { useAppDispatch } from "../../redux/store"
import { searchSelector, setSearchValue } from "../../redux/slices/searchSlice"
import Input from "../../UI/Input"

type SearchProps = {
   className?: string
} 

const Search: React.FC<SearchProps> = ({ className }) => {
   const dispatch = useAppDispatch()
   const { searchValue } = useSelector(searchSelector)

   const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPage(1))
      dispatch(setSearchValue(event.target.value))
      getDebounce({searchValue: event.target.value})
   }

   const getDebounce = useCallback(

      debounce((arg) => {
         dispatch(getRepositories(arg))
      }, 250

   ),[])

   return(
      <Input 
         className={className}
         placeholder="Search..." 
         value={searchValue} 
         onChange={onChangeHandler} 
      />
   )
}

export default Search