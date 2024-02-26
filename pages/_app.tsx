import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <GoogleOAuthProvider clientId="804857766809-qonhcud1b64d1ge6gur2up26ldrv2ra5.apps.googleusercontent.com">
      <Component {...pageProps} />
      <Toaster />
      </GoogleOAuthProvider>
    </div>
  )
}
