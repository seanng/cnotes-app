import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    id: 'abc',
    email: 'alice@prisma.io',
    firstName: 'alice',
    lastName: 'wonderland',
    password: 'blablabla',
    role: 'BRAND',
  },
  {
    id: 'abc123',
    email: 'alice123@prisma.io',
    firstName: 'alice',
    lastName: 'wonderland',
    password: 'blablabla',
    role: 'BRAND',
  },
  {
    id: 'abc1235',
    email: 'alice1235@prisma.io',
    firstName: 'alice',
    lastName: 'wonderland',
    password: 'blablabla',
    role: 'BRAND',
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
