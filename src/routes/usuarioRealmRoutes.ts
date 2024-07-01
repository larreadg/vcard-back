import { Router } from 'express'
import { body, param } from 'express-validator'
import { authenticateJWT } from '../middlewares/authMiddleware'
import * as usuarioRealmController from '../controllers/usuarioRealmController'

const router = Router()

router.post(
  '/',
  authenticateJWT('VC_ADMIN'),
  [
    body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    body('email').isEmail().withMessage('El email es obligatorio y debe ser válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('rolRealmId').notEmpty().withMessage('El rolRealmId es obligatorio'),
  ],
  usuarioRealmController.createUsuarioRealm
)

router.get(
    '/:id', 
    authenticateJWT('VC_ADMIN'),
    [
        param('id').isUUID().withMessage('ID inválido'),
    ], 
    usuarioRealmController.getUsuarioRealmById
)

router.get('/', usuarioRealmController.getAllUsuarioRealms)

router.get(
  '/:id/realms',
  authenticateJWT(['VC_ADMIN', 'VC_REALM_ADMIN']),
  [
    param('id').isUUID().withMessage('ID inválido'),
  ],
  usuarioRealmController.getRealmsUsuarioById
)

router.put(
  '/:id',
  authenticateJWT('VC_ADMIN'),
  [
    param('id').isUUID().withMessage('ID inválido'),
    body('usuario').optional().notEmpty().withMessage('El usuario es obligatorio'),
    body('email').optional().isEmail().withMessage('El email debe ser válido'),
    body('password').optional().notEmpty().withMessage('La contraseña es obligatoria'),
    body('rolRealmId').optional().notEmpty().withMessage('El rolRealmId es obligatorio'),
  ],
  usuarioRealmController.updateUsuarioRealm
)

router.delete(
  '/:id',
  authenticateJWT('VC_ADMIN'),
  [
    param('id').isUUID().withMessage('ID inválido'),
  ],
  usuarioRealmController.deleteUsuarioRealm
)

router.post(
  '/authenticate',
  [
    body('usuario').notEmpty().withMessage('El email o usuario es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  ],
  usuarioRealmController.authenticateUsuarioRealm
)

export default router
