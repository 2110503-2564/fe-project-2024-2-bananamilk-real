'use client'
import { SessionProvider } from "next-auth/react"
import NextAuth from 'next-auth/next';

export default function NextAuthProvider({children, session}:{children:React.ReactNode, session:any}): React.ReactNode {
    return (
        <SessionProvider session={session}>
            { children }
        </SessionProvider>
    )
}