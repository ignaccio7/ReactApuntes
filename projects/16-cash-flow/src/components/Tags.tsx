import './index.css'
import { IconLogo } from '../icons/index'

export function Title(){
  return(
    <h1> <span>Cash</span> Flow </h1>
  )
}

export function Header(){

  const handleClick = () => {
    window.location.reload()
  }
  
  return(
    <div className='header'>
      <div className="layer" onClick={handleClick}>
        <IconLogo />
      </div>
      <div className="title">
        <Title/>
      </div>
      <span></span>
    </div>
  )
}

export function Button({ action, children }){
  return(
    <button className='btn' onClick={action}>
      { children }
    </button>
  )
}