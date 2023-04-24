import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { repositoriesSelector } from '../../redux/slices/repositoriesSlice'
import style from './index.module.css'

type DetailsBlockProps = {
   className?: string 
}

const DetailsBlock: React.FC<DetailsBlockProps> = ({ className }) => {
   const navigate = useNavigate()
   const { repositories } = useSelector(repositoriesSelector)
   
   if(repositories) {
      const params = useParams()
      const id = params.id
   
      const repository = repositories.find(repository => repository.node.id === id)

      return(
         <div className={`${style.detailsBlock} ${className}`}>
            <img className={style.avatar} src={repository?.node.owner.avatarUrl} alt="" />
            <div className={style.conteiner}>
               <div className={style.title}>{repository?.node.name}</div>
               <div className={style.languageConteiner}>
                  {
                     repository?.node.languages.edges.map((language, index) => <div className={style.language} key={index}>{language.node.name}</div>)
                  }
               </div>
               <div className={style.description}>Stars: {repository?.node.stargazerCount}</div>
               <div className={style.description}>Last commit: {repository?.node.pushedAt.split('T')[0]}</div>
               <div className={style.description}>
                  Author: 
                  <a target='_blank' className={style.link} href={repository?.node.owner.url}>{repository?.node.owner.login}</a>
               </div>
               <div className={style.description}>Description: {repository?.node.description}</div>
            </div>
         </div>
      )
   }
   else if(!repositories){
      useEffect(() => {
         navigate('/')  
      },[])
   }
   return <></>
}

export default DetailsBlock