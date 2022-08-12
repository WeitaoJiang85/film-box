import './Homepage.css'
import '@fontsource/roboto/700.css'
import Button from '@mui/material/Button'

function Homepage() {
  return (
    <div className="container">
      <img
        className="img"
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
        alt="TMDB logo"
      />
      <Button
        variant="outlined"
        size="large"
        href="/films"
        sx={{
          border: '3px solid',
          fontWeight: 'bold',
          fontSize: '1em',
          color: 'white',
        }}
      >
        EXPLORE THE TOP MOVIE OF THE YEAR
      </Button>
    </div>
  )
}
export default Homepage
