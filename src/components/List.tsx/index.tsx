import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../redux/store'
import { getRepositories, repositoriesSelector } from '../../redux/slices/repositoriesSlice' 
import { searchSelector } from '../../redux/slices/searchSlice'
import { paginationSelector, setPage } from '../../redux/slices/paginationSlice'
import Paginations from '../PaginationBlock'
import Loader from '../../UI/Loader'
import style from './index.module.css'

type ListProps = {
   className?: string
}

const List: React.FC<ListProps> = ({ className }) => {
   const { repositories, isLoading, error, repositoryCount, endCursor, startCursor, isFirstQuery} = useSelector(repositoriesSelector)
   const { searchValue } = useSelector(searchSelector)
   const { page } = useSelector(paginationSelector)

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   useEffect(() => {

      if(isFirstQuery){
         dispatch(getRepositories({}))
      }
      
   },[])
   
   const paginationNextButton = () => {
      const pagination = `after: "${endCursor}"` 
      dispatch(getRepositories({pagination, button: 'next', searchValue}))
   }

   const paginationPrevButton = () => {
      const pagination = `before: "${startCursor}"` 
      dispatch(getRepositories({pagination, button: 'prev', searchValue}))
   }

   if(isLoading){
      return <Loader className={style.loader} />
   }

   else if(error) {
      return <div className={style.messageBlock}>{error}</div>
   }
   
   else if(!repositoryCount){
      return <div className={style.messageBlock}>Nothing found(</div>
   }

   else if(repositories && repositoryCount){
      return(
         <div className={`${style.list} ${className}`}>
            <div className={style.count}>Found {repositoryCount} repositories</div> 
            {
               repositories.map(repository => 
                  <div className={style.card} key={repository.node.id}>
                     <div className={style.cardTitle} onClick={() => {navigate(`/${repository.node.id}`)}}>{repository.node.name}</div>
                     <div className={`${style.cardDescription} ${style.cardStars}`}>Stars: {repository.node.stargazerCount > 1000 ? `${Math.trunc(repository.node.stargazerCount / 1000)}K` : repository.node.stargazerCount}</div>
                     <div className={style.cardDescription}>Last commit: {repository.node.pushedAt?.split('T')[0]}</div>
                     <a target='_blank' className={style.cardLink} href={repository.node.url}>Link to GitHub</a>
                  </div> 
               ) 
            }
            <div className={style.paginationConteiner}>
               <Paginations 
                  length={repositoryCount} 
                  unitList={10} 
                  page={page} 
                  setPage={(page) => dispatch(setPage(page))} 
                  className={style.pagination} 
                  nextAction={paginationNextButton}
                  prevAction={paginationPrevButton}
               />
            </div>
         </div>
      )
   }

   return <></>
}

export default List