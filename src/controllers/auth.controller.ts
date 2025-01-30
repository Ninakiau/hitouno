import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { authLoginSchema } from '../schemas/auth.schema';
import { HttpError } from "../utils/httpError.util";
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = authLoginSchema.validate(req.body);

        if (error) {
            throw new HttpError(error.message, 400);
        }
        const { email, password } = value;
        const token = await authService.loginWithEmailAndPassword(email, password)
        res.json({ token });
    }
    catch (error) {
        next(error);
    }
}


const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = authLoginSchema.validate(req.body);
        if (error) {
            throw new HttpError(error.message, 400);
        }
        const { email, password } = value;
        const token = await authService.register(
            email,
            password
        );
        if (!token) {
            throw new HttpError('Error en el registro, no se pudo generar el token', 500);
        }
        res.status(201).json({ token });
    }
    catch (error) {
        next(error);
    }
}
export const authController = {
    login,
    register
}
