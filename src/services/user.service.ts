import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model'
import { HttpError } from '../utils/httpError.util'
//Traer todos los usuarios
const getAllUsers = async () => {
    const users = await UserModel.findAll()
    if (users.length === 0) throw new HttpError('No users found', 404)
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

//Update user 
const updateUser = async (id: string, email: string, password?: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
      throw new HttpError("User not found", 404);
  }

  if (email && email !== user.email) {
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser && existingUser.id !== id) {
          throw new HttpError("Email is already in use", 400);
      }
      user.email = email;
  }

  if (password && password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
  }

  const updatedUser = await UserModel.update(user.id, user.email, user.password);
  return updatedUser;
};


const remove = async (id: string) => {
    const user = await UserModel.findById(id)
    if (!user) throw new HttpError("User not found", 404);
    await UserModel.remove(id)
}
export const userService = {
    getUserById,
    getAllUsers,
    createUserWithEmailAndPassword,
    getUserByEmail,
    updateUser,
    remove
}

