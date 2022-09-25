import '../styles/globals.css'
import {UserProvider} from "../context/useContext"
import Head from "next/head";
import Script from "next/script"
import Header from "../components/Header"

import tabIcon from "../public/favicon.ico"

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai, chain.optimismGoerli ],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

// add bootstrap css 

function MyApp({ Component, pageProps }) {
  return(
  <> 
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode  theme={lightTheme({
      accentColor: '#B786F9',
      accentColorForeground: 'white',
      fontStack: 'system',
      overlayBlur: 'small',
    })} chains={chains}>
        <Head>
          <title>Loanyee</title>
          <link rel="icon" href="../public/favicon.ico" />
        </Head>
        <Header />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </>

  )
}

export default MyApp
