export interface IRealm {
    id?:string
    nombre: string
    logo: string
    template?: string
    colorPrimario: string
    colorSecundario: string
    activo: boolean
    authType: 'LDAP' | 'LOCAL'
    ldapUrl?: string
    fechaCreacion?: Date
    fechaModificacion?: Date
    usuarioCreacionId: string
    usuarioModificacionId: string
}
