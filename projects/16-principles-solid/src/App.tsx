
import './App.css'
import { TitleWithButtonProps, TitleWithLinkProps } from './OpenClosedPrinciple'
// import SingleResponsibilityPrinciple from './SingleResponsibilityPrinciple'
// import OpenClosedPrinciple from './OpenClosedPrinciple/index'

function App() {

  return (
    <>
      {/* <SingleResponsibilityPrinciple/> */}
      {/* <OpenClosedPrinciple title='Principio Solid' type='withNormalButton' buttonText='Aloha' href='/'/> */}
      {/* <TitleWithLinkProps title='Principio Solid' buttonText='Aloha' href='/'/> */}
      <TitleWithButtonProps title='Principio Solid' buttonText='Aloha' onClick={()=>{}}/>
    </>
  )
}

export default App
