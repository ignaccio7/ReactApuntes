import Movement from "./Movement";

export default function Movements({ movements, deleteMovement }){
  console.log(movements);
  return(
    <>
      <h2 className="title">Historial</h2>
      <div className="movements-list">
        { movements.map(({ id, title, description, amount })=>{
          return(
            <Movement 
              key={id}
              id={id}
              title={title}
              description={description}
              amount={amount}
              remove={deleteMovement}
            />
          )
        }) }
      </div>
    </>
  )
}