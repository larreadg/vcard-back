import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ResponseHandler } from '../utils/response'
import { handleControllerError } from '../utils/error'
import * as usuarioRealmService from '../services/usuarioRealmService'

// Crear un nuevo UsuarioRealm
export const createUsuarioRealm = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(ResponseHandler.error('Errores de validación', 400, errors.array()))
  }

  try {
    const newUsuarioRealm = await usuarioRealmService.createUsuarioRealm(req.body)
    res.status(201).json(ResponseHandler.success(newUsuarioRealm, 'UsuarioRealm creado exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al crear el UsuarioRealm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Obtener un UsuarioRealm por ID
export const getUsuarioRealmById = async (req: Request, res: Response) => {
  try {
    const usuarioRealm = await usuarioRealmService.getUsuarioRealmById(req.params.id)
    res.status(200).json(ResponseHandler.success(usuarioRealm, 'UsuarioRealm obtenido exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al obtener el UsuarioRealm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Obtener todos los UsuarioRealm
export const getAllUsuarioRealms = async (_req: Request, res: Response) => {
  try {
    const usuarioRealms = await usuarioRealmService.getAllUsuarioRealms()
    res.status(200).json(ResponseHandler.success(usuarioRealms, 'UsuarioRealms obtenidos exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al obtener los UsuarioRealms')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Obtener los Realms de un UsuarioRealm por ID
export const getRealmsUsuarioById = async (req: Request, res: Response) => {
  try {
    const realms = await usuarioRealmService.getRealmsUsuarioById(req.params.id)
    res.status(200).json(ResponseHandler.success(realms, 'Realms obtenidos exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al obtener los Realms del UsuarioRealm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Actualizar un UsuarioRealm por ID
export const updateUsuarioRealm = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(ResponseHandler.error('Errores de validación', 400, errors.array()))
  }

  try {
    const updatedUsuarioRealm = await usuarioRealmService.updateUsuarioRealm(req.params.id, req.body)
    res.status(200).json(ResponseHandler.success(updatedUsuarioRealm, 'UsuarioRealm actualizado exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al actualizar el UsuarioRealm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Eliminar un UsuarioRealm por ID
export const deleteUsuarioRealm = async (req: Request, res: Response) => {
  try {
    await usuarioRealmService.deleteUsuarioRealm(req.params.id)
    res.status(200).json(ResponseHandler.success({}, 'UsuarioRealm eliminado exitosamente'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al eliminar el UsuarioRealm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}

// Autenticar UsuarioRealm
export const authenticateUsuarioRealm = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(ResponseHandler.error('Errores de validación', 400, errors.array()))
  }

  try {
    const { usuario, password } = req.body
    const token = await usuarioRealmService.authenticateUsuarioRealm(usuario, password)
    res.status(200).json(ResponseHandler.success({ token }, 'Autenticación exitosa'))
  } catch (error) {
    const { message, code } = handleControllerError(error, 'Error al autenticar el UsuarioRealm')
    res.status(code).json(ResponseHandler.error(message, code))
  }
}
