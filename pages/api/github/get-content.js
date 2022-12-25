import {Github} from './github'
import {unstable_getServerSession} from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"

export default async function handler(req, res) {

    let repo = req.query.repo
    let path = req.query.path

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({
            message: 'you are not signed in. login first.'
        })
    }

    let email = session.user.email

    const github = new Github('32515512')

    let authData = await github.authenticate();

    let {data} = await github.getContent('mmte', repo, path)

    if (data.type === 'file') {

        let content = Buffer.from(data.content, 'base64').toString()

        console.log(data)

        res.status(200).json({
            data: {
                details: data,
                content: content
            }
        })

    }

    res.status(200).json({
        data: {
            content: data
        }
    })

}

