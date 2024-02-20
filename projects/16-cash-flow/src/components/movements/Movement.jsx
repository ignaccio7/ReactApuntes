import { IconTrash } from "../../icons";

export default function Movement({ id, title, description, amount, remove }){

  const amountClass = amount <= 0 ? 'red' : 'green'

  return(
    <div className="movement">
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="action">
        <a onClick={()=>{ remove({ id }) }}>
          <IconTrash/>
        </a>
        <p className={amountClass}>
          {amount}
        </p>
      </div>
    </div>
  )
}