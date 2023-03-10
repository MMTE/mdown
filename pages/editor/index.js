import Head from 'next/head'
import {useEffect, useState} from 'react';
import MarkdownView from 'react-showdown';
import Navbar from '/components/navbar'
import {useRouter} from 'next/router'
import CommitDialog from '/components/commit-dialog'

export default function Home() {

    const router = useRouter()
    const [markdown, setMarkdown] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [isSendingCommit, setIsSendingCommit] = useState(false)
    const [data, setData] = useState(null)
    const [hidePreview, setHidePreview] = useState(false)
    const [message, setMessage] = useState('')

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!router.query.repo && !router.query.path && !router.query.owner)
            return
        setLoading(true)
        fetch('/api/github/get-content?repo=' + router.query.repo + '&path=' + router.query.path + '&owner=' + router.query.owner)
            .then((res) => res.json())
            .then(({data}) => {
                setData(data.details)
                setMarkdown(data.content)
                setLoading(false)
            })

    }, [router.query])

    async function commitFile(event, sha = data.sha) {

        setIsSendingCommit(true)

        event.preventDefault()

        const data = {
            repo: router.query.repo,
            path: router.query.path,
            file: markdown,
            message: message,
            sha: sha,
            owner: router.query.owner,
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/github/commit'

        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        const response = await fetch(endpoint, options).then(async (response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('?????????? ???? ?????????? ???? ???????? ???????? ??????! ???????? ???? ???????????????? ?????????? ????????.');
        })
            .then((responseJson) => {
                // Do something with the response
                alert('?????????? ?????????? ????.')

                setIsSendingCommit(false)

                setIsOpen(false)

            })
            .catch((error) => {
                console.log(error)

                setIsSendingCommit(false)

                setIsOpen(false)
            });

    }

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

                <div className='px-5'>
                    <div
                        className='flex flex-row items-center justify-between bg-amber-200 mt-2 py-2 px-2 rounded-xl shaodw'>

                        <CommitDialog
                            loading={isSendingCommit}
                            commit={commitFile}
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                            setMessage={setMessage}
                        >
                        </CommitDialog>

                        {
                            router.query.repo && router.query.path && router.query.owner &&
                            <button
                                type="button"
                                onClick={() => setIsOpen(prevState => !prevState)}
                                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            >??????????
                            </button>
                        }

                        {/*<button onClick={commitFile}*/}
                        {/*        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">*/}
                        {/*    ??????????*/}
                        {/*</button>*/}

                        <div onClick={() => setHidePreview(prevState => !prevState)}>
                            {
                                hidePreview ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"/>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"/>
                                    </svg>
                            }
                        </div>
                    </div>

                </div>

                <div className='h-min-screen flex flex-row mt-3 mb-2 px-2'>
                    <div className='flex flex-1 px-5'>
                        <textarea className='w-full h-screen focus:outline-0'
                                  value={markdown}
                                  onChange={(event) => (setMarkdown(event.target.value))}>
                        </textarea>
                    </div>
                    <div
                        className={`${hidePreview ? 'hidden' : 'flex flex-1 px-5 w-full h-screen navHeight_off overflow-y-scroll hidden flex-col flex-1 w-full py-4 bg-blue-100 md:flex border-r-4 border-blue-100'}`}>
                        <article className="prose lg:prose-xl w-full">
                            <MarkdownView
                                markdown={markdown}
                                options={{tables: true, emoji: true}}
                            />
                        </article>
                    </div>
                </div>
            </main>
        </>
    )
}
