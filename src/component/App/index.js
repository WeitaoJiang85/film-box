import FilmLibrary from '../FlimLibrary/FilmLibrary.js'
import Homepage from '../Homepage'
import ErrorPage from '../ErrorPage'
import { FilmDetail } from '../FilmDetail/FilmDetail.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/films" element={<FilmLibrary />}>
          <Route path=":filmId" element={<FilmDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
