import bcrypt from 'bcrypt'
import { UserModel } from '../schema/user.model'
import { HttpError } from '../utils/httpError.util'
//Traer todos los usuarios
const getAllUsers = async () => {
    const users = await UserModel.findAll()
    return users
}

// Traer usuario por id
const getUserById = async (id: string) => {
    const user = await UserModel.findByPk(id)
    if (!user) throw new HttpError("User not found", 404);
    return user
}
// Traer usario por email
const getUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({where: {email}})

    if (!user) {
        throw new HttpError('User not found', 404)
    }
    return user
}
//Crear 1 usuario con el correo y la contraseña
const createUserWithEmailAndPassword = async (email: string, password: string) => {
    const user = await UserModel.findOne({where: {email}})
    if (user) {
        throw new HttpError('Email already exists', 400)
    }

    // Creamos el usuarios y hasheamos la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await UserModel.create({email, password: hashedPassword})

    return newUser;
}

//Update user 
const updateUser = async (id: string, email: string, password?: string) => {
  const user = await UserModel.findByPk(id);
  if (!user) {
      throw new HttpError("User not found", 404);
  }

  if (email && email !== user.email) {
      const existingUser = await UserModel.findOne({where: {email}})
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

  await user.save();
  return user;
};


const remove = async (id: string) : Promise <{ message: string }> => {
    const user = await UserModel.findByPk(id)
    if (!user) throw new HttpError("User not found", 404);
    await user.destroy();
    return { message: `User with id ${id} deleted successfully` };
}

export const userService = {
    getUserById,
    getAllUsers,
    createUserWithEmailAndPassword,
    getUserByEmail,
    updateUser,
    remove
}

