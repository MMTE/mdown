import {unstable_getServerSession} from "next-auth/next"
import {authOptions} from "../auth/[...nextauth]"
import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
        res.send({error: "You must be signed in to view the protected content on this page.",})
    }

    let id = session.user.id

    let installation_id = req.query.installation_id

    let setup_action = req.query.setup_action

    if (setup_action === 'install') {

        updateUser(id, installation_id)
            .then(async () => {
                await prisma.$disconnect()
            })
            .catch(async (e) => {
                console.error(e)
                await prisma.$disconnect()
                process.exit(1)
            })

    }

    res.send('installed succesfully')

}


async function updateUser(id, installation_id) {
    const updatedUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            github_installation_id: installation_id,
        },
    })
}
