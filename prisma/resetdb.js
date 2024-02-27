const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function run () {
    await prisma.$executeRawUnsafe('DROP Database prismaer01')
    await prisma.$executeRawUnsafe('CREATE Database prismaer01')

}
console.log('Reset')
run()