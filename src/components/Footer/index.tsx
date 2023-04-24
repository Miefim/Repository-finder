import style from './index.module.css'

type FooterProps = {
   className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
   return(
      <footer className={`${style.footer} ${className}`}>
         <div className={style.iconGroup}>
            <a target='_blanc' href="https://t.me/Efimovdev"><img className={style.icon} src="/telegramIcon.png" alt="" /></a>
            <a target='_blanc' href="https://hh.ru/resume/61fd0c6eff0ba50b2a0039ed1f506444714b46"><img className={style.icon} src="/hhIcon.png" alt="" /></a>
            <a target='_blanc' href="https://www.codewars.com/users/Miefim"><img className={style.icon} src="/codewarsIcon.png" alt="" /></a>
            <a target='_blanc' href="https://www.linkedin.com/in/mikhail-efimov-b03801258/"><img className={style.icon} src="/linkedinIcon.png" alt="" /></a>
         </div>
      </footer>
   )
}

export default Footer