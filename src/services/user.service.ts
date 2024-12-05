import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model'
import { nanoid } from 'nanoid'

//Traer todos los usuarios
const getAllUsers = async () => {
    const users = await UserModel.readUsers()
    return users
}

//Crear 1 usuario con el correo y la contraseña
const createUserWithEmailAndPassword = async (email: string, password: string) => {
    // Traemos todos los usuarios
    const users = await getAllUsers()

    //Trae el usuario por el correo
    const user = users.find(item => item.email === email)


    if (user) {
        throw new Error('Email already exists')
    }
    // Creamos el usuarios y hasheamos la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = {
        id: nanoid(),
        email,
        password: hashPassword
    }

    //Agregamos el nuevo usuario
    users.push(newUser)
    await UserModel.writeUsers(users)
    return newUser
}


export const userService = {
    getAllUsers,
    createUserWithEmailAndPassword
}   

