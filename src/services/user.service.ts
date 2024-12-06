import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model'
import {HttpError} from '../utils/httpError.util'
//Traer todos los usuarios
const getAllUsers = async () => {
    const users = await UserModel.findAll()
    return users
}

// Traer usuario por id
const getUserById = async (id: string) => {
    const user = await UserModel.findById(id)
    if (!user) throw new HttpError("User not found", 404);
    return user
}
// Traer usario por email
const getUserByEmail = async (email: string) => {
    const user = await UserModel.findByEmail(email)

    if (!user) {
        throw new HttpError('User not found', 404)
    }
    return user
}
//Crear 1 usuario con el correo y la contraseña
const createUserWithEmailAndPassword = async (email: string, password: string) => {
    const user = await UserModel.findByEmail(email)
    if (user) {
        throw new HttpError('Email already exists', 400)
    }

    // Creamos el usuarios y hasheamos la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await UserModel.create(email, hashedPassword)

    return newUser;
}


export const userService = {
    getAllUsers,
    createUserWithEmailAndPassword,
    getUserByEmail
}   

