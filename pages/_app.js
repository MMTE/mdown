import {SessionProvider} from "next-auth/react"
import '../styles/globals.css'
import localFont from '@next/font/local'

const Vazirmatn = localFont({src: '../fonts/Vazirmatn[wght].woff2'})

// import { Vazirmatn } from '@next/font/google'

export default function App({Component, pageProps: {session, ...pageProps},}) {

    return (
        <main className={`${Vazirmatn.className}`}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </main>
    )

}

