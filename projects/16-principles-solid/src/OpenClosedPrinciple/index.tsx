import { FC, ReactElement } from "react"
// OPEN CLOSED PRINCIPLE
type TitleProps = {
  title: string,
  children: ReactElement
}

const Title: FC<TitleProps> = ({ title, children }) => {
  return(
    <div style={{ display:'flex', marginLeft:'1rem' }}>
      <h1>{ title }</h1>
      { children }
    </div>
  )
}

type TitleWithLinkProps = {
  title: string,
  href: string,
  buttonText: string
}

export const TitleWithLinkProps:FC<TitleWithLinkProps> = ({ title, href, buttonText }) => {
  return(
    <Title title={title}>
      <div>
        <a href={href}>{buttonText}</a>
      </div>
    </Title>
  )
}

type TitleWithButtonProps = {
  title: string,
  buttonText: string,
  onClick: ()=>void
}

export const TitleWithButtonProps:FC<TitleWithButtonProps> = ({ title, buttonText, onClick }) => {
    return(
      <Title title={title}>
        <button onClick={onClick} > {buttonText} </button>
      </Title>
    )
}

// si necesitaramos otro mas entoces
// export const TitleWithSpecialButton...


