import {Github} from './github'
import {unstable_getServerSession} from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"

export default async function handler(req, res) {

    let repo = req.query.repo
    let path = req.query.path
    let owner = req.query.owner

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({
            message: 'you are not signed in. login first.'
        })
    }

    // let email = session.user.email

    let installationId = session.user.github_installation_id

    const github = new Github(installationId)

    let authData = await github.authenticate();

    // let owner = authData.data.owner.login

    let {data} = await github.getContent(owner, repo, path)

    if (data.type === 'file') {

        let content = Buffer.from(data.content, 'base64').toString()

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

