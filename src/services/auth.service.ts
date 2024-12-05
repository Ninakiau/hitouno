import { userService } from './user.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginWithEmailAndPassword = async (email: string, password: string) => {
    const users = await userService.getAllUsers()
    const user = users.find(item => item.email === email)


    if (!user) {
        throw new Error('Credentials are incorrect')
    }
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new Error('Credentials are incorrect')
    }
    const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' })
    return token
}






export const authService = {
    loginWithEmailAndPassword
}