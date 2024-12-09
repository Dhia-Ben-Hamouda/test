// function to compare hashed password and password received from the client
import bcrypt from "bcrypt";

export async function comparePasswords(plainTextPassword: string, hashedPassword: string) {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
}