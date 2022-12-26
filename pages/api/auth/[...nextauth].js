import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    // callbacks: {
    //     async signIn({user, account, profile, email, credentials}) {
    //         if (user) {
    //
    //             // register user if is new
    //
    //
    //
    //             return true
    //         } else {
    //             // Return false to display a default error message
    //             return false
    //             // Or you can return a URL to redirect to:
    //             // return '/unauthorized'
    //         }
    //     }
    // }
}
export default NextAuth(authOptions)