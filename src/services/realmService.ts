import prisma from '../prisma/cliente'
import { VCardError, handleError } from '../utils/error'
import { IRealm } from '../interface/realmInterface'
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'

// Crear un nuevo Realm
export const createRealm = async (data: IRealm) => {
  try {
    const { nombre, logo, template = 'default', colorPrimario, colorSecundario, authType = 'LOCAL', ldapUrl = null, usuarioCreacionId } = data
    
    let base64Data: string;
    let fileExtension: string;
    if (logo.startsWith('data:image/png;base64,')) {
      base64Data = logo.replace(/^data:image\/png;base64,/, "");
      fileExtension = 'png';
    } else if (logo.startsWith('data:image/jpeg;base64,')) {
      base64Data = logo.replace(/^data:image\/jpeg;base64,/, "");
      fileExtension = 'jpeg';
    } else if (logo.startsWith('data:image/jpg;base64,')) {
      base64Data = logo.replace(/^data:image\/jpg;base64,/, "");
      fileExtension = 'jpg';
    } else if (logo.startsWith('data:image/svg+xml;base64,')) {
      base64Data = logo.replace(/^data:image\/svg\+xml;base64,/, "");
      fileExtension = 'svg';
    } else if (logo.startsWith('data:image/webp;base64,')) {
      base64Data = logo.replace(/^data:image\/webp;base64,/, "");
      fileExtension = 'webp';
    } else {
      throw new VCardError('Formato de imagen no soportado', 400);
    }

    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(__dirname, '../../public', fileName);

    fs.writeFileSync(filePath, base64Data, 'base64')

    const logoUrl = `${process.env.BASE_URL}/api/public/${fileName}`
    
    const newRealm = await prisma.realm.create({
      data : {
        nombre,
        logo: logoUrl,
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
