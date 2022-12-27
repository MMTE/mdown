// import {PrismaClient} from '@prisma/client'
//
// export default async function handler(req, res) {
//
//     const prisma = new PrismaClient()
//
//     async function main() {
//         const user = await prisma.users.create({
//             data: {
//                 email: 'elsa@prisma.io',
//                 name: 'Elsa Prisma',
//             },
//         })
//         res.send('done')
//     }
//
//     main()
//
//         .then(async () => {
//
//             await prisma.$disconnect()
//
//         })
//
//         .catch(async (e) => {
//
//             console.error(e)
//
//             await prisma.$disconnect()
//
//             process.exit(1)
//
//         })
// }
