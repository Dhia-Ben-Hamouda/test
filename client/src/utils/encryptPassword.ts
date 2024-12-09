// function to encrypt password before sending it to the server
import crypto from "crypto-js";

const passwordEncryptionSecret = import.meta.env.VITE_PASSWORD_ENCRYPTION_SECRET;

export function encryptPassword(plainTextPassword: string) {
    return crypto.AES.encrypt(plainTextPassword, passwordEncryptionSecret).toString();
}