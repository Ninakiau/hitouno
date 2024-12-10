import { Request, Response } from "express";
import { userService } from "../services/user.service";

//Obtener los usuarios
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json(error);
    }
  }
};

// Obtener usuario por id
const getUserById = async (req: Request, res: Response) => {
  try {
    // Obtener id del usuario desde los parámetros de la solicitud
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json({ user });

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json(error);
    }
  }
}

// Crear un usuario con el correo y la contraseña
const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newUser = await userService.createUserWithEmailAndPassword(email, password)
    res.json({ newUser });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json(error);
    }
  }
};
// Update user


const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    // Validar datos de entrada
    if (!id || !email || !password) {
      res.status(400).json({ error: "Missing required fields: id, email, or password." });
      return;
    }

    const updatedUser = await userService.updateUser(id, email, password);
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};

//Remove User
const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.remove(id);
    res.json({ message: `User deleted successfully` });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json(error);
    }
  }
}
export const userController = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  remove
}
