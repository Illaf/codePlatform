import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {RecoilRoot} from 'recoil';
import { ToastContainer, toast } from 'react-toastify';
export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <RecoilRoot>
    <Head>
      <title>CodePlatform</title>
      <meta content="coding platform"/>
    </Head>
      <Component {...pageProps} />
      <ToastContainer/>
      </RecoilRoot>
    </>
  ) 
  

}
