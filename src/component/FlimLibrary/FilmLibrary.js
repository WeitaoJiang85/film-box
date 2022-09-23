import { useState, useEffect } from "react";
import { FilmDetail, FilmDetailEmpty } from "../FilmDetail/FilmDetail";
import FilmRow from "../FlimRow/FlimRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./FilmLibrary.css";
import Stack from "@mui/material/Stack";
const API_KEY = process.env.REACT_APP_API_KEY;
function FilmLibrary() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState(new Date().getFullYear());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [faveList, setFaveList] = useState([]);
  const [displayAll, setDisplayAll] = useState(true);
  const [result, setResult] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const listURL = `
  https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&primary_release_year=${year}`;

    fetch(listURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        if (jsonData.results.length > 0) {
          const searchResult = jsonData.results.map((film) => ({
            id: film.id,
            title: film.title,
            poster_path: film.poster_path,
            backdrop_path: film.backdrop_path,
            release_date: film.release_date,
            overview: film.overview,
            fave: false,
          }));
          setResult([...result, ...searchResult]);
        }

        setTotalPages(jsonData.total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, page]);

  function handleSeleced(id) {
    setSelectedFilm(result.find((film) => film.id === id));
  }

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    } else {
      return <p>This is the last page</p>;
    }
  };
  const handleYear = () => {
    if (input !== "") setYear(input);
    setPage(1);
    setResult([]);
    setInput("");
  };

  const showAll = () => {
    setDisplayAll(true);
  };
  const showFave = () => {
    setDisplayAll(false);
  };

  const addFave = (e, id) => {
    e.stopPropagation();
    const faveFilm = result.filter((film) => film.id === id);
    if (faveFilm[0].fave === false) {
      faveFilm[0].fave = true;
    }
    setFaveList([...faveList, { ...faveFilm[0] }]);
    console.log(`Favelist`, faveList);
  };

  const delFave = (e, id) => {
    e.stopPropagation();
    const unFaveFilm = faveList.filter((film) => film.id === id);
    if (unFaveFilm[0].fave === true) {
      unFaveFilm[0].fave = false;
    }
    const resFave = faveList.filter((film) => film.id !== id);
    setFaveList(resFave);
    console.log(resFave);
    const newFilms = result.map((film) =>
      film.id === id ? { ...film, fave: false } : film
    );
    setResult(newFilms);
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">Films List</h1>

        {displayAll ? (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            padding={2}
          >
            <TextField
              id="outlined-search"
              label="Enter a Year for Search"
              size="small"
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                color: "secondary",
                padding: "1px",
              }}
            />
            <Button
              htmlFor="outlined-search"
              variant="contained"
              size="medium"
              onClick={handleYear}
              sx={{
                fontWeight: "bold",
                fontSize: "1em",
              }}
            >
              SEARCH
            </Button>
          </Stack>
        ) : null}

        <div className="film-list-filters">
          <button
            onClick={showAll}
            className={`film-list-filter ${displayAll ? "is-active" : null}`}
          >
            ALL
            <span className="section-count">{result.length}</span>
          </button>
          <button
            onClick={showFave}
            className={`film-list-filter ${displayAll ? null : "is-active"}`}
          >
            FAVES
            <span className="section-count">{faveList.length}</span>
          </button>
        </div>

        {displayAll
          ? result.map((film) => (
              <FilmRow
                key={film.id}
                id={film.id}
                fave={film.fave}
                title={film.title}
                year={new Date(film.release_date).getFullYear()}
                poster_path={`https://image.tmdb.org/t/p/w780${film.poster_path}`}
                handleSeleced={() => handleSeleced(film.id)}
                addFave={addFave}
                delFave={delFave}
              />
            ))
          : faveList.map((film) => (
              <FilmRow
                key={film.id}
                id={film.id}
                fave={film.fave}
                title={film.title}
                year={new Date(film.release_date).getFullYear()}
                poster_path={`https://image.tmdb.org/t/p/w780${film.poster_path}`}
                handleSeleced={() => handleSeleced(film.id)}
                addFave={addFave}
                delFave={delFave}
              />
            ))}
        {displayAll && result.length > 0 ? (
          <Button
            variant="contained"
            size="small"
            onClick={loadMore}
            sx={{
              fontWeight: "bold",
              fontSize: "1em",
            }}
          >
            Load More
          </Button>
        ) : null}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>

        {selectedFilm ? <FilmDetail /> : <FilmDetailEmpty />}
      </div>
    </div>
  );
}

export default FilmLibrary;
