import './FilmRow.css'
import { Link } from 'react-router-dom'
const FilmRow = ({
  title,
  id,
  fave,
  poster_path,
  year,
  handleSeleced,
  addFave,
  delFave,
}) => {
  return (
    <div className="FilmRow">
      <img src={poster_path} alt={`${title} film poster`} />
      <div className="film-summary">
        <h3>{title}</h3>
        <p>Year:{year}</p>
      </div>
      <Link
        to={`/films/${id}`}
        className="read_more"
        onClick={() => handleSeleced(id)}
      >
        <span className="material-icons">read_more</span>
      </Link>
      <button
        className="fave"
        onClick={fave ? (e) => delFave(e, id) : (e) => addFave(e, id)}
      >
        <span className="material-icons">
          {fave ? 'remove_from_queue' : 'add_to_queue'}
        </span>
      </button>
    </div>
  )
}

export default FilmRow
