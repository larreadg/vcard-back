export class VCardError extends Error {
  code: number;

  constructor (message: string, code: number = 500) {
    super(message)
    this.code = code
  }
}

export function handleError(error: unknown, context: string, code: number = 500): never {
  if (error instanceof Error) {
    throw new VCardError(error.message, code)
  } else {
    throw new VCardError(context, code)
  }
}

export function handleControllerError(error: unknown | VCardError, defaultMessage: string = 'Error al procesar la solicitud') {
  if(error instanceof VCardError){
    return {
      message: error.message,
      code: error.code
    }
  } else if(error instanceof Error){
    return {
      message: error.message,
      code: 500
    }
  }

  return {
    message: defaultMessage,
    code: 500
  }
}
