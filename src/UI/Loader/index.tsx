import style from './index.module.css'

type LoaderProps = {
   className?: string
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
   return(
      <img className={`${style.loader} ${className}`} src="/loading.png" alt="" />
   )
}

export default Loader