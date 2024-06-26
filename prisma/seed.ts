import { PrismaClient, RolRealm } from '@prisma/client'
import { hashPassword } from '../src/utils/password'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {

  await prisma.rolRealm.createMany({
    data: [
      { nombre: 'VC_ADMIN' },
      { nombre: 'VC_REALM_ADMIN' },
    ],
  })

  const realAdmin: RolRealm | null = await prisma.rolRealm.findFirst({
    where: {
      nombre: 'VC_ADMIN'
    }
  })
  
  if(realAdmin) {
    const password = await hashPassword(<string> process.env.VC_ADMIN_PW)
    await prisma.usuarioRealm.createMany({
        data: [
          { usuario: 'admin', email: 'admin@vcard', password, rolRealmId: realAdmin.id, activo: true },
        ],
    })
  }

}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
