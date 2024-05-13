import { NavLink } from '../../../14-react-router/src/NavLink'

export default function PokemonCard ({ name, image }) {
  return (
    <NavLink to={`/${name}`}>
      <article className="card">
        <figure>
          <img src={image} alt={`Image of ${name}`} />
          <figcaption>{name}</figcaption>
        </figure>
      </article>
    </NavLink>
  )
}
