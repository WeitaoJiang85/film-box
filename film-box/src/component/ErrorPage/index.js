import './ErrorPage.css'
import Button from '@mui/material/Button'
function ErrorPage() {
  return (
    <div
      style={{
        position: 'fixed',
        padding: '6px 10px',
        left: '50%',
        top: '50%',
        margin: '-150px 0 0 -200px',
      }}
    >
      <h2>404 Error</h2>
      <h1> Uh oh, that page doesn't exist.</h1>
      <Button
        variant="outlined"
        size="large"
        href="/"
        sx={{
          border: '3px solid',
          fontWeight: 'bold',
          fontSize: '1em',
          color: 'white',
        }}
      >
        Back to Homepage
      </Button>
    </div>
  )
}
export default ErrorPage
