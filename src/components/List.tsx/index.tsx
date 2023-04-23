import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import debounce from 'lodash.debounce'

import { useAppDispatch } from '../../redux/store'
import { getRepositories, repositoriesSelector } from '../../redux/slices/repositoriesSlice' 
import { searchSelector } from '../../redux/slices/searchSlice'
import Loader from '../../UI/Loader'
import style from './index.module.css'

type ListProps = {
   className?: string
}

const List: React.FC<ListProps> = ({ className }) => {
   const { repositories, isLoading, error, repositoryCount } = useSelector(repositoriesSelector)
   const { searchValue } = useSelector(searchSelector)

   const dispatch = useAppDispatch()

   useEffect(() => {

      getDebounce({ searchValue })

   },[searchValue])
   
   const getDebounce = useCallback(
      debounce((arg) => {
         dispatch(getRepositories(arg))
      }, 250),
      [],      
   )
   
   if(isLoading){
      return <div className={style.messageBlock}><Loader /></div>
   }

   else if(error) {
      return <div className={style.messageBlock}>{error}</div>
   }

   else if(repositories){
      return(
         <div className={`${style.list} ${className}`}>
            <div className={style.count}>Found {repositoryCount} repositories</div> 
            {
               repositories.map(repository => 
                  <div className={style.card} key={repository.node.id}>
                     <div className={style.cardTitle}>{repository.node.name}</div>
                     <div className={`${style.cardDescription} ${style.cardStars}`}>Stars: {repository.node.stargazerCount > 1000 ? `${Math.trunc(repository.node.stargazerCount / 1000)}K` : repository.node.stargazerCount}</div>
                     <div className={style.cardDescription}>Last commit: {repository.node.pushedAt?.split('T')[0]}</div>
                     <a target='_blank' className={style.cardLink} href={repository.node.url}>Link to GitHub</a>
                  </div> 
               ) 
            }
         </div>
      )
   }

   return <></>
}

export default List