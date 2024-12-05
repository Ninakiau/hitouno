import { Request, Response } from "express";
import { userService } from "../services/user.service";

//Obtener los usuarios
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
    res.status(500).json(error);
  }
};
// Crear un usuario con el correo y la contraseña
const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await userService.createUserWithEmailAndPassword(email, password)
    res.json({newUser});
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
    res.status(500).json(error);
    }
  }
};

export const userController = {
  getUsers,
  createUser,
};
