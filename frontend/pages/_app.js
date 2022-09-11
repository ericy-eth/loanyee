import '../styles/globals.css'
import {UserProvider} from "../context/useContext"

import Head from "next/head";
import Script from "next/script"



function MyApp({ Component, pageProps }) {
  return(
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
