import prisma from "../prisma/cliente"
import { handleError } from "../utils/error"

// Obtener todos los Realm Roles
export const getAllRealmRols = async () => {
  try {
    const realms = await prisma.rolRealm.findMany()
    return realms
  } catch (error) {
    handleError(error, 'Error al obtener los Realms')
  }
}