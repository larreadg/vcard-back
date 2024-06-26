import { Router } from 'express'
import { body, param } from 'express-validator'
import { authenticateJWT } from '../middlewares/authMiddleware'
import * as realmController from '../controllers/realmController'

const router = Router()

router.use(authenticateJWT('VC_ADMIN'))

router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('logo').notEmpty().withMessage('El logo es obligatorio'),
    body('colorPrimario').notEmpty().withMessage('El color primario es obligatorio'),
    body('colorSecundario').notEmpty().withMessage('El color secundario es obligatorio'),
  ],
  realmController.createRealm
)

router.get('/:id', [
  param('id').isUUID().withMessage('ID inválido'),
], realmController.getRealmById)

router.get('/', realmController.getAllRealms)

router.put(
  '/:id',
  [
    param('id').isUUID().withMessage('ID inválido'),
    body('nombre').optional().notEmpty().withMessage('El nombre es obligatorio'),
    body('direccion').optional().notEmpty().withMessage('La dirección es obligatoria'),
    body('ruc').optional().notEmpty().withMessage('El RUC es obligatorio'),
    body('colorPrimario').optional().notEmpty().withMessage('El color primario es obligatorio'),
    body('colorSecundario').optional().notEmpty().withMessage('El color secundario es obligatorio'),
  ],
  realmController.updateRealm
)

router.delete(
  '/:id',
  [
    param('id').isUUID().withMessage('ID inválido'),
  ],
  realmController.deleteRealm
)

export default router
