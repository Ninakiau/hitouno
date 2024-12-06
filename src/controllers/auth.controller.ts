import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { authService } from '../services/auth.service';
import {authLoginSchema} from '../schemas/auth.schema';
import { HttpError } from "../utils/httpError.util";
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = authLoginSchema.validate(req.body);

        if (error) {
            throw new HttpError(error.message, 400);
        }
        const  {email, password } = value;
        const token = await authService.loginWithEmailAndPassword(email, password)
        res.json({token});
    }
    catch (error) {
        next(error);
    }
}


const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {error, value } = authLoginSchema.validate(req.body);
        if (error) {
            throw new HttpError(error.message, 400);
        }
        const { email, password } = value;
        const newUser = await userService.createUserWithEmailAndPassword(email, password)
        res.json({newUser});
    }
    catch (error) {
        next(error);
    }
}  
export const authController = {
    login,
    register  
}
