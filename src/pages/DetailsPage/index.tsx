import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { repositoriesSelector } from '../../redux/slices/repositoriesSlice'
import Header from '../../components/Header'
import DetailsBlock from '../../components/DetailsBlock'
import Footer from '../../components/Footer'
import style from './index.module.css'

const DetailsPage: React.FC = () => {
   const params = useParams()
   const navigate = useNavigate()
   const { repositories } = useSelector(repositoriesSelector)

   const actualRepository = repositories?.find(repository => repository.node.id === params.id)

   return(
      <div className={style.wrapper}>
         <Header />
         <div className={style.breadСrumbs}>
            <div className={style.crumbs} onClick={() => navigate('/')}>List</div>
            /
            <div className={`${style.crumbs} ${style.noActiveCrumb}`}>{actualRepository?.node.name}</div>
         </div>
         <DetailsBlock />
         <Footer className={style.detailsPage_footer}/>
      </div>
   )
}

export default DetailsPage