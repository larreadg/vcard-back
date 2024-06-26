import { Response } from 'express'
import { validationResult } from 'express-validator'
import { handleControllerError } from '../utils/error'
import { ResponseHandler } from '../utils/response'
import * as realmService from '../services/realmService'
import { AuthenticatedRequest } from '../interface/authenticatedRequestInterface'

// Crear un nuevo Realm
export const createRealm = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(ResponseHandler.error('Errores de validación', 400, errors.array()))
  }

  try {
    const userId = req?.user?.id
    const newRealm = await realmService.createRealm({...req.body, usuarioCreacionId: userId})
    res.status(201).json(ResponseHandler.success(newRealm, 'Realm creado exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al crear Realm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Obtener un Realm por ID
export const getRealmById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const realm = await realmService.getRealmById(req.params.id)
    res.status(200).json(ResponseHandler.success(realm, 'Realm obtenido exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al obtener el Realm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Obtener todos los Realms
export const getAllRealms = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const realms = await realmService.getAllRealms()
    res.status(200).json(ResponseHandler.success(realms, 'Realms obtenidos exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al obtener los Realms')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Actualizar un Realm por ID
export const updateRealm = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(ResponseHandler.error('Errores de validación', 400, errors.array()))
  }

  try {
    const userId = req?.user?.id
    const updatedRealm = await realmService.updateRealm(req.params.id, {...req.body, usuarioModificacionId: userId})
    res.status(200).json(ResponseHandler.success(updatedRealm, 'Realm actualizado exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al actualizar el Realm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Eliminar un Realm por ID
export const deleteRealm = async (req: AuthenticatedRequest, res: Response) => {
  try {
    await realmService.deleteRealm(req.params.id)
    res.status(200).json(ResponseHandler.success({}, 'Realm eliminado exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al eliminar el Realm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}
