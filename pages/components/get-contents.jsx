import {useEffect, useState} from "react";

export default function GetRepos(props) {

    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!props.repo && !props.path)
            return
        setLoading(true)
        fetch('/api/github/get-content?repo=' + props.repo + '&path=' + props.path)
            .then((res) => res.json())
            .then(({data}) => {
                setData(data.content)
                setLoading(false)
            })

    }, [props.path])

    if (isLoading) return <p>در حال دریافت فایل‌ها...</p>
    if (!data) return <p>به نظر می‌رسه فایلی اینجا نیست!</p>

    return (
        <div>
            {

                data.map((item, i) =>
                    <div key={i}
                         className="flex flex-row-reverse justify-between p-2 bg-white border border-gray-200 rounded shadow mb-5">
                        <a style={{direction: "ltr"}} className='flex flex-row'
                           href={item.type === 'dir' ? `/repos/${props.repo}/${props.path}/${item.name}` : `/editor?repo=${props.repo}&path=${props.path === '.' ? '' : props.path}/${item.name}`}>
                            {
                                item.type === 'dir' &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4 ">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>
                                </svg>
                            }
                            {
                                item.type === 'file' &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFD580" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4 ">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                </svg>
                            }
                            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        </a>
                    </div>
                )
            }
        </div>
    )
}
