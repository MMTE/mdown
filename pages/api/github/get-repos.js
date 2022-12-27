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

    // let email = session.user.email

    let installationId = session.user.github_installation_id

    const github = new Github(installationId)

    let authData = await github.authenticate();

    let {data} = await github.getRepos()

    res.status(200).json({
        data: {
            repositories: data.repositories
        }
    })

}

