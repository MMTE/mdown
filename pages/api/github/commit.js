import {Github} from './github'
import {unstable_getServerSession} from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.status(401).json({
            message: 'you are not signed in. login first.'
        })
    }

    if (req.method !== 'POST') {
        res.status(405).send({message: 'Only POST requests allowed'})
        return
    }

    let repo = req.body.repo
    let path = req.body.path
    let file = req.body.file
    let sha = req.body.sha
    let owner = req.body.owner
    let message = req.body.message

    let name = session.user.name
    let email = session.user.email

    // remove first character (/) because commit path shouldn't start whith /
    path = path.substring(1);

    file = Buffer.from(file).toString('base64')

    let installationId = session.user.github_installation_id

    const github = new Github(installationId)

    let authData = await github.authenticate();

    let {data} = await github.commit(owner, repo, path, file, sha, message, name, email)

    res.status(200).json({
        data: {
            content: data
        }
    })

}

