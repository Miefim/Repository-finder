import { useSelector } from "react-redux"

import { useAppDispatch } from "../../redux/store"
import { searchSelector, setSearchValue } from "../../redux/slices/searchSlice"
import Input from "../../UI/Input"

type SearchProps = {
   className?: string
} 

const Search: React.FC<SearchProps> = ({ className }) => {
   const dispatch = useAppDispatch()
   const { searchValue } = useSelector(searchSelector)

   return(
      <Input 
         className={className}
         placeholder="Search..." 
         value={searchValue} 
         onChange={(event) => dispatch(setSearchValue(event.target.value))} 
      />
   )
}

export default Search