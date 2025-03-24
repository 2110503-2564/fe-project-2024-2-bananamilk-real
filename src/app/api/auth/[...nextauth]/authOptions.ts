import NextAuth from "next-auth/next";
import  { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/libs/api";

export const authOptions:AuthOptions = {
    providers: [
        // Authentication Provider, use Credentials Provider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;
            
                const user = await loginUser(credentials.email, credentials.password);
                console.log('User returned from loginUser:', user); // Debug log
            
                if (user && user.user) {
                    return {
                        id: user.user._id, // Extract `_id` from user data
                        name: user.user.name,
                        email: user.user.email,
                        token: user.token, // Extract token
                        role: user.user.role,
                    };
                } else {
                    console.error('Authorize function: user is undefined');
                    return null;
                }
            }
            
            
            
        })
    ],
    session: { strategy:"jwt" },
    callbacks: {
        async jwt({ token, user }) {
            console.log('User in JWT callback:', user); // Debugging log
        
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.accessToken = user.token;
                token.role = user.role;
            }
        
            return token;
        },
        
        async session({ session, token }) {
            session.user = {
                id: token.id as string, // Assert type to string
                name: token.name as string,
                email: token.email as string,
                token: token.accessToken as string, // Include token
                role: token.role as string | undefined, // Optional field
            };
            console.log('Session data:', session);
            return session;
        }
        
    }
}