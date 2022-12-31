import Head from 'next/head'
import Navbar from '/components/navbar'
import {signOut, useSession} from "next-auth/react"

export default function Home() {

    const {data: session} = useSession()

    return (
        <>
            <Head>
                <title>Mdown</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>

                <Navbar></Navbar>

                <div className='flex flex-row mt-2 px-5'>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </div>
            </main>
        </>
    )
}
