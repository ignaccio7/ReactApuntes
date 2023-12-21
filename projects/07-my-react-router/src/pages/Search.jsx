
export default function Search( { routeParams } ) {
    return(
        <>
          <h1>Tu estas buscando:</h1>
          {routeParams.query}
        </>
    )
}