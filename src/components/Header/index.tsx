import { useParams } from 'react-router-dom'

import Search from '../Search'
import style from './index.module.css'

const Header: React.FC = () => {
   const params = useParams()
   const isMainPage = !params.hasOwnProperty('id')
   return(
      <header className={style.header}>
         <div className={`${style.logo} ${style.header_logo}`}>
            <img className={style.logoImg} src="/githubIcon.png" alt="" />
            GitHub GraphQL API
         </div>
         {isMainPage && <Search className={style.header_input}/>}
      </header>
   )
}

export default Header