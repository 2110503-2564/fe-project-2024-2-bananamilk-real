import { loginUser } from "./api";

export default async function userLogIn(userEmail: string, userPassword: string) {
    try {
        const response = await loginUser(userEmail, userPassword);
        return response;
    } catch (error) {
        throw new Error('Failed to log in');
    }
}
