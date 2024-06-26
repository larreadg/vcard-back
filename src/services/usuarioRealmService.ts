import prisma from '../prisma/cliente'
import { Prisma } from '@prisma/client'
import { hashPassword, comparePassword } from '../utils/password'
import { handleError } from '../utils/error'
import { generateToken } from '../utils/jwt'

// Crear un nuevo UsuarioRealm
export const createUsuarioRealm = async (data: Prisma.UsuarioRealmCreateInput) => {
  try {
    const hashedPassword = await hashPassword(data.password)
    const newUsuarioRealm = await prisma.usuarioRealm.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })
    return newUsuarioRealm
  } catch (error) {
    handleError(error, 'Error al crear el UsuarioRealm')
  }
}

// Obtener un UsuarioRealm por ID
export const getUsuarioRealmById = async (id: string) => {
  try {
    const usuarioRealm = await prisma.usuarioRealm.findUnique({
      where: { id },
    })
    if (!usuarioRealm) {
      throw new Error('UsuarioRealm no encontrado')
    }
    return usuarioRealm
  } catch (error) {
    handleError(error, 'Error al obtener el UsuarioRealm', 404)
  }
}

// Obtener todos los UsuarioRealm
export const getAllUsuarioRealms = async () => {
  try {
    const usuarioRealms = await prisma.usuarioRealm.findMany()
    return usuarioRealms
  } catch (error) {
    handleError(error, 'Error al obtener los UsuarioRealms')
  }
}

// Obtener los realms de un usuario
export const getRealmsUsuarioById = async (id: string) => {
  try {
    const usuarioRealm = await prisma.usuarioRealm.findUnique({
      where: { id },
      include: {
        realmCreado: true
      }
    })

    if(!usuarioRealm){
      throw new Error('UsuarioRealm no encontrado')
    }
    return usuarioRealm.realmCreado
  } catch (error) {
    handleError(error, 'Error al obtener el UsuarioRealm', 404)
  }
}

// Actualizar un UsuarioRealm por ID
export const updateUsuarioRealm = async (id: string, data: Prisma.UsuarioRealmUpdateInput) => {
  try {
    if (data.password) {
      data.password = await hashPassword(<string> data.password)
    }
    const updatedUsuarioRealm = await prisma.usuarioRealm.update({
      where: { id },
      data,
    })
    return updatedUsuarioRealm
  } catch (error) {
    handleError(error, 'Error al actualizar el UsuarioRealm')
  }
}

// Eliminar un UsuarioRealm por ID
export const deleteUsuarioRealm = async (id: string) => {
  try {
    await prisma.usuarioRealm.delete({
      where: { id },
    })
    return { message: 'UsuarioRealm eliminado correctamente' }
  } catch (error) {
    handleError(error, 'Error al eliminar el UsuarioRealm')
  }
}

// Autenticar UsuarioRealm
export const authenticateUsuarioRealm = async (emailOrUsername: string, password: string) => {
  try {
    const usuarioRealm = await prisma.usuarioRealm.findFirst({
        where: {
          OR: [
            { email: emailOrUsername },
            { usuario: emailOrUsername }
          ]
        },
        include: {
          rolRealm: true
        }
    })
    if (!usuarioRealm) {
      throw new Error('Error al autenticar el UsuarioRealm')
    }
    const isMatch = await comparePassword(password, usuarioRealm.password)
    if (!isMatch) {
      throw new Error('Error al autenticar el UsuarioRealm')
    }

    const tokenPayload = {
      id: usuarioRealm.id,
      email: usuarioRealm.email,
      usuario: usuarioRealm.usuario,
      rol: usuarioRealm.rolRealm.nombre,
    };

    const token = generateToken(tokenPayload);

    return token
    
  } catch (error) {
    handleError(error, 'Error al autenticar el UsuarioRealm', 401)
  }
}
