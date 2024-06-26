import prisma from '../prisma/cliente'
import { handleError } from '../utils/error'
import { IRealm } from '../interface/realmInterface'

// Crear un nuevo Realm
export const createRealm = async (data: IRealm) => {
  try {
    const { nombre, logo, template = 'default', colorPrimario, colorSecundario, authType = 'LOCAL', ldapUrl = null, usuarioCreacionId } = data
    const newRealm = await prisma.realm.create({
      data : {
        nombre,
        logo,
        template,
        colorPrimario,
        colorSecundario,
        authType,
        activo: true,
        ldapUrl,
        usuarioCreacionId,
        usuarioModificacionId: usuarioCreacionId
      }
    })
    return newRealm
  } catch (error) {
    handleError(error, 'Error al crear el Realm')
  }
}

// Obtener un Realm por ID
export const getRealmById = async (id: string) => {
  try {
    const realm = await prisma.realm.findUnique({
      where: { id }
    })
    if (!realm) {
      throw new Error('Realm no encontrado')
    }
    return realm
  } catch (error) {
    handleError(error, 'Error al obtener el Realm')
  }
}

// Obtener todos los Realms
export const getAllRealms = async () => {
  try {
    const realms = await prisma.realm.findMany()
    return realms
  } catch (error) {
    handleError(error, 'Error al obtener los Realms')
  }
}

// Actualizar un Realm por ID
export const updateRealm = async (id: string, data: IRealm) => {
  try {
    const { nombre, logo, template, colorPrimario, colorSecundario, authType, ldapUrl, usuarioModificacionId } = data
    const updatedRealm = await prisma.realm.update({
      where: { id },
      data: {
        nombre,
        logo,
        template,
        colorPrimario,
        colorSecundario,
        authType,
        ldapUrl,
        usuarioModificacionId
      }
    })
    return updatedRealm
  } catch (error) {
    handleError(error, 'Error al actualizar el Realm')
  }
}

// Eliminar un Realm por ID
export const deleteRealm = async (id: string) => {
  try {
    await prisma.realm.delete({
      where: { id }
    })
  } catch (error) {
    handleError(error, 'Error al eliminar el Realm')
  }
}
