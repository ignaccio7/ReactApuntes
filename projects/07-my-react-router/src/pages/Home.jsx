
import { Link } from "../Link"

export default function HomePage(){
    return(
      <>
        <h1>Esta es la seccion de inicio</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque animi, aliquid ducimus sed culpa perferendis suscipit! Nisi aspernatur nobis quibusdam accusantium incidunt fuga architecto! Nostrum incidunt adipisci dolorem eligendi provident.</p>
        <Link to='/about'>Ir a sobre nosotros</Link>
      </>
    )
  }