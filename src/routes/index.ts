import { Router } from 'express'
import realmRoutes from './realmRoutes'
import usuarioRealmRoutes from './usuarioRealmRoutes'

const router = Router()

router.use('/realm', realmRoutes)
router.use('/usuario-realm', usuarioRealmRoutes)

export default router