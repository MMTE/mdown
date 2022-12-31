import {useState} from 'react';
import Link from "next/link";
import {useEffect} from 'react'
import AppLayout from "/components/layouts/app";
import {useSession} from "next-auth/react";


function GetRepos() {

    const [repos, setRepos] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/github/get-repos')
            .then((res) => res.json())
            .then(({data}) => {
                setRepos(data.repositories)
                setLoading(false)
            })
    }, [])


    if (isLoading) return <p>در حال دریافت مخازن شما...</p>
    if (!repos) return <p>به نظر می‌رسه مخزنی ندارید!</p>

    return (
        <div style={{direction: "ltr"}}>
            {
                repos.map((repo, i) =>
                    <Link href={`/repos/${repo.name}?owner=${repo.owner.login}`} key={i}
                          className="flex flex-row justify-between bg-white border border-gray-200 rounded shadow px-5 py-2 mb-5">
                        <div className='flex flex-row items-center'>
                            <svg width="25" height="25" viewBox="0 0 100 100"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                      fill="#24292f"/>
                            </svg>
                            <h3 className="ml-3 text-xl font-bold text-gray-900">{repo.name}</h3>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}

export default function Repos() {

    const [installationId, setInstallationId] = useState(null)

    const {data: session, status} = useSession()

    const [markdown, setMarkdown] = useState('');

    return (
        <AppLayout>
            <div className="pb-12">
                <section className="pb-10">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className='px-10 mt-10'>

                            {/*<pre>{JSON.stringify(session.user, null, 2)}</pre>*/}

                            {
                                status === 'loading' ?
                                    <p>Loading...</p>
                                    :
                                session && session.user.github_installation_id ?
                                    <>
                                        <h2 className='font-bold text-2xl'>مخازن گیت‌هاب</h2>
                                        <div className='mt-10'>
                                            <GetRepos></GetRepos>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='container mx-auto content-center items-center px-6 py-4'>
                                            <p className='text-xl'>برای ویرایش فایل‌ها به صورت مستقیم از گیت‌هاب ابتدا لازم است. وبسایت mdown را به گیت‌هاب خود متصل کنید</p>
                                            <Link href='https://github.com/apps/mdownBot'>
                                                <button className="w-full mt-10 group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                                                    <div
                                                        class="relative flex items-center space-x-4 justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                             className="absolute left-0 w-5 text-gray-700"
                                                             viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                                        </svg>
                                                        <span
                                                            class="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">اتصال و نصب mdown</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                    </>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
