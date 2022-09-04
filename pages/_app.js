import '../styles/globals.css'
import { GlobalStyles } from 'twin.macro'

function MyApp({ Component, pageProps }) {
  return (
  <div>
  <GlobalStyles />
  <Component {...pageProps} />
  </div>
  )
}

export default MyApp
