import { userService } from './user.service'
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../utils/auth.util'
import { HttpError } from "../utils/httpError.util";
import logger from "../utils/logger.util";
const loginWithEmailAndPassword = async (email: string, password: string) => {
    const user = await userService.getUserByEmail(email)
    if (!user) {
        logger.error(email)
        throw new Error('Credentials are incorrect')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new HttpError('Credentials are incorrect', 500)
    }
    const token = generateAccessToken(user.email, user.id)
    return token
}

const register = async (email: string, password: string) => {
    const user = await userService.createUserWithEmailAndPassword(email, password)

    const token = generateAccessToken( user.email, user.id )
    return token

}




export const authService = {
    loginWithEmailAndPassword,
    register
}