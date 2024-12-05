import path from "node:path";
import {readFile, writeFile} from "node:fs/promises";
import { User } from "../interfaces/user.interface";

// Traemos la ruta del archivo
const __dirname = import.meta.dirname;
const pathFile = path.resolve(__dirname,"../../data/users.json");

// Lee todos los usuarios
const readUsers = async () => {
    const userJson = await readFile(pathFile, "utf-8");
    const users = JSON.parse(userJson) as User[];
    return users;
    
}

// Creamos un usuario con el correo y la contraseña
const writeUsers = async (users:User[]) => {
    const usersJson = JSON.stringify(users, null, 2);
    return await writeFile(pathFile, usersJson);
}

export const UserModel = {
    readUsers,
    writeUsers
}