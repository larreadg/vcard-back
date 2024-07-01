import { Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { handleControllerError, VCardError } from '../utils/error'
import { AuthenticatedRequest } from '../interface/authenticatedRequestInterface'
import { ResponseHandler } from '../utils/response'

export const authenticateJWT = (requiredRol?: string | string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if(typeof requiredRol === 'string') requiredRol = [requiredRol]

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json(ResponseHandler.error('Token no proporcionado o malformado', 401))
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = verifyToken(token) as AuthenticatedRequest['user']
      req.user = decoded

      if (requiredRol && (!req.user || !requiredRol.includes(req.user?.rol))) {
        throw new VCardError('Permiso denegado', 403)
      }

      next()
    } catch (error) {
        const { message, code } = handleControllerError(error, 'Error al verificar el token')
        return res.status(code).json(ResponseHandler.error(message, code))
    }
  }
}
