import style from './index.module.css'

type InputProps = {
   value: string
   onChange: React.ChangeEventHandler<HTMLInputElement>
   onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
   className?: string
   placeholder?: string
}

const Input: React.FC<InputProps> = ({className, placeholder, value, onChange, onKeyDown}) => {
   return(
      <input 
         type="text" 
         value={value}
         onChange={onChange}
         onKeyDown={onKeyDown}
         className={`${style.input} ${className}`} 
         placeholder={placeholder}
      />
   )
}

export default Input 