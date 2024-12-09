// function to hash password
import bcrypt from "bcrypt";

export async function hashPassword(plainTextPassword: string) {
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(plainTextPassword , salt);

    return hashedPassword;
}