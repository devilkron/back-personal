const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function run () {
    await prisma.$executeRawUnsafe('DROP Database personal')
    await prisma.$executeRawUnsafe('CREATE Database personal')

}
console.log('Reset')
run()