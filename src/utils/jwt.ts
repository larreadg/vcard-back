import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { VCardError } from './error'

export const generateToken = (payload: object) => {
  return jwt.sign(payload, <string> process.env.JWT_SECRET, { expiresIn: <string> process.env.JWT_EXPIRES_IN })
}

export const verifyToken = (token: string): any => {
    try {
      return jwt.verify(token, <string> process.env.JWT_SECRET)
    } catch (error) {
      throw new VCardError('Token inválido', 401)
    }
}