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

    // user is logged in

    // get user's email

    let email = session.user.email

    // find installation id of user (DB)

    // check if installation is not revoked
    // if installation is revoked respond respectively


    // use installation id to get users repositories

    const github = new Github('32515512')

    let authData = await github.authenticate();

    let {data} = await github.getRepos()

    res.status(200).json({
        data: {
            repositories: data.repositories
        }
    })

}

