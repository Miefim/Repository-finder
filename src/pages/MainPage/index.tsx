import Header from '../../components/Header'
import List from '../../components/List.tsx'
import Footer from '../../components/Footer/index.tsx'
import style from './index.module.css'

const MainPage: React.FC = () => {
   return(
      <div className={style.wrapper}>
         <Header/>
         <List />
         <Footer className={style.mainPage_footer} />
      </div>
   )
}

export default MainPage