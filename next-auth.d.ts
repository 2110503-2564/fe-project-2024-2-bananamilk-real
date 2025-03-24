import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        token: string; // Add the `token` property
        role?: string; // Optional: Add other custom fields like `role`
    }

    interface Session {
        user: User; // Extend session to include custom user properties
    }

    interface JWT {
        id: string;
        name: string;
        email: string;
        accessToken: string; // Include custom token
        role?: string; // Optional custom property
    }
}
