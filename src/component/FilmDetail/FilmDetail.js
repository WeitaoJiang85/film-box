import { useEffect, useState } from 'react'
import './FilmDetail.css'
import { useParams } from 'react-router-dom'

const API_KEY = process.env.REACT_APP_API_KEY

function FilmDetail() {
  const [details, setDetails] = useState({})
  const params = useParams()

  useEffect(() => {
    const URL = `
  https://api.themoviedb.org/3/movie/${params.filmId}?api_key=${API_KEY}&language=en-US`
    fetch(URL)
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        if (jsonData.title) {
          const filmDetail = {
            title: jsonData.title,
            poster_path: jsonData.poster_path,
            backdrop_path: jsonData.backdrop_path,
            overview: jsonData.overview,
            tagline: jsonData.tagline,
          }
          console.log('Film Detail:', filmDetail)
          setDetails(filmDetail)
        }
      })
      .catch((error) => console.log(error))
  }, [params.filmId])

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w780${details.backdrop_path}`}
          alt={details.title}
        />
        <h1 className="film-title">{details.title}</h1>
        {details.tagline ? (
          <div>
            <span className="film-detail-tagline">{details.tagline}</span>
          </div>
        ) : null}
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={`https://image.tmdb.org/t/p/w1280${details.poster_path}`}
            className="film-detail-poster"
            alt={details.title}
          />
          {details.overview}
        </p>
      </div>
    </div>
  )
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  )
}

export { FilmDetailEmpty, FilmDetail }
