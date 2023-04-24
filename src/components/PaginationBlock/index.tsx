import { useAppDispatch } from '../../redux/store'

import { setButton } from '../../redux/slices/paginationSlice'
import style from './index.module.css'

type PaginationsProps = {
   length: number
   unitList: number
   page: number
   setPage: (arg: number) => void
   className?: string
   nextAction: () => void
   prevAction: () => void
}

const Paginations: React.FC<PaginationsProps> = ({length, unitList, page, setPage, nextAction, prevAction, className}) => {

   const dispatch = useAppDispatch()

   const numbersPage = Math.ceil(length / unitList)

   const nextButtonHandler = () => {
      if(page < numbersPage) {
         setPage(page + 1)
         dispatch(setButton('next'))
         nextAction()
      }
   }

   const prevButtonHandler = () => {
      if(page > 1) {
         setPage(page - 1)
         dispatch(setButton('prev'))
         prevAction()
      }
   }

   return(
      <div className={`${style.pagination} ${className}`}>
         <button className={style.arrowButton} disabled={page === 1} onClick={prevButtonHandler}>
            <img src='/leftArrow.png' height='20px'/>
         </button>
         <div className={style.pagination_window}>
            <div className={style.window_tape}>
               {
                  [...new Array(numbersPage)].map((_, i) => {
                     const testLeft = page - 3
                     const testRight = page + 3 
                     const indexBeforePage = i + 1 > page - 3 - (testRight > numbersPage ? testRight - numbersPage - 1 : 0)
                     const indexArterPage = i + 1 < page + 3 - (testLeft < 0 ? testLeft : 0)
                     
                     if(indexBeforePage && indexArterPage){
                        return(
                           <div 
                              className={`${style.navUnit} ${page === i + 1 && style.activeUnit}`} 
                              key={i}
                           >
                              {i + 1}
                           </div>
                        )  
                     }
                  }) 
               } 
            </div>
         </div>
         <button className={style.arrowButton} disabled={page === numbersPage} onClick={nextButtonHandler}>
            <img src='/leftArrow.png' className={style.arrowButtonRightIcon} height='20px'/>
         </button>
      </div>
   )
}

export default Paginations